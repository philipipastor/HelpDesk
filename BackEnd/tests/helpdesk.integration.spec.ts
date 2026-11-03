import request from "supertest"
import { compare, hash } from "bcryptjs"
import { Prisma, PrismaClient, Role } from "@prisma/client"
import { app } from "../src/app"
import { isPastSlot } from "../src/utils/schedule"

const prisma = new PrismaClient()

async function resetDatabase() {
  await prisma.ticket.deleteMany()
  await prisma.service.deleteMany()
  await prisma.user.deleteMany()
}

async function createUser(role: Role, email: string, availability: string[] = []) {
  return prisma.user.create({
    data: { name: role, email, password: await hash("123456", 4), role, availability },
  })
}

async function login(email: string, password = "123456") {
  const response = await request(app).post("/sessions").send({ email, password })
  return response.body.token as string
}

const bearer = (token: string) => ["Authorization", `Bearer ${token}`] as const

// Datas fixas bem distantes de hoje, para o resultado não mudar com o passar do tempo.
const monday = "2099-01-05"
const saturday = "2099-01-03"
const pastMonday = "2020-01-06"

async function scenario() {
  const admin = await createUser(Role.ADMIN, "admin@test.com")
  const client = await createUser(Role.CLIENT, "client@test.com")
  const technician = await createUser(Role.TECHNICIAN, "tech@test.com", ["08:00"])
  const service = await prisma.service.create({ data: { name: "VPN", price: new Prisma.Decimal(100) } })
  return {
    admin, client, technician, service,
    adminToken: await login(admin.email),
    clientToken: await login(client.email),
    techToken: await login(technician.email),
  }
}

async function createTicket(data: Awaited<ReturnType<typeof scenario>>) {
  const response = await request(app).post("/tickets").set(...bearer(data.clientToken)).send({
    title: "Rede lenta", description: "Cai toda hora", serviceId: data.service.id, technicianId: data.technician.id,
    scheduledDate: monday, scheduledHour: "08:00",
  })
  expect(response.status).toBe(201)
  return response.body
}

beforeEach(resetDatabase)

afterAll(async () => {
  await resetDatabase()
  await prisma.$disconnect()
})

describe("Autenticação e cadastro", () => {
  it("faz login válido e rejeita login inválido", async () => {
    await createUser(Role.ADMIN, "admin@test.com")

    const ok = await request(app).post("/sessions").send({ email: "admin@test.com", password: "123456" })
    expect(ok.status).toBe(200)
    expect(ok.body.token).toEqual(expect.any(String))
    expect(ok.body.user.role).toBe("admin")

    const invalid = await request(app).post("/sessions").send({ email: "admin@test.com", password: "errada" })
    expect(invalid.status).toBe(401)
  })

  it("bloqueia rota administrativa sem token", async () => {
    expect((await request(app).get("/clients")).status).toBe(401)
  })

  it("cadastro público cria sempre um cliente e rejeita e-mail repetido", async () => {
    const body = { name: "Ana", email: "ana@test.com", password: "123456" }
    const created = await request(app).post("/users").send(body)
    expect(created.status).toBe(201)
    expect(created.body.role).toBe("client")
    expect(created.body).not.toHaveProperty("password")

    expect((await request(app).post("/users").send(body)).status).toBe(409)
    expect((await request(app).post("/users").send({ ...body, email: "b@test.com", role: "ADMIN" })).status).toBe(400)
  })
})

describe("Perfil", () => {
  it("edita o próprio perfil e troca a senha conferindo a atual", async () => {
    const { technician, techToken } = await scenario()

    const updated = await request(app).patch("/users/me").set(...bearer(techToken)).send({ name: "Novo nome" })
    expect(updated.body.name).toBe("Novo nome")
    expect((await request(app).get("/users/me").set(...bearer(techToken))).body.availability).toEqual(["08:00"])

    const wrong = await request(app).patch("/users/me/password").set(...bearer(techToken))
      .send({ currentPassword: "errada", newPassword: "nova-senha" })
    expect(wrong.status).toBe(400)

    const changed = await request(app).patch("/users/me/password").set(...bearer(techToken))
      .send({ currentPassword: "123456", newPassword: "nova-senha" })
    expect(changed.status).toBe(204)
    expect(await login(technician.email, "nova-senha")).toEqual(expect.any(String))
  })

  it("somente o cliente exclui a própria conta, e os chamados vão junto", async () => {
    const data = await scenario()
    await createTicket(data)

    expect((await request(app).delete("/users/me").set(...bearer(data.techToken))).status).toBe(403)
    expect((await request(app).delete("/users/me").set(...bearer(data.clientToken))).status).toBe(204)
    expect(await prisma.ticket.count()).toBe(0)
  })
})

describe("Técnicos", () => {
  it("admin cria com a senha definida e o horário comercial como padrão", async () => {
    const { adminToken } = await scenario()

    const created = await request(app).post("/technicians").set(...bearer(adminToken))
      .send({ name: "Novo", email: "novo@test.com", password: "provisoria" })
    expect(created.status).toBe(201)
    expect(created.body.availability).toEqual(["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"])

    const saved = await prisma.user.findUniqueOrThrow({ where: { email: "novo@test.com" } })
    expect(saved.role).toBe(Role.TECHNICIAN)
    expect(await compare("provisoria", saved.password)).toBe(true)
  })

  it("admin edita horários; técnico e cliente não", async () => {
    const { adminToken, clientToken, techToken, technician } = await scenario()
    const path = `/technicians/${technician.id}`

    const updated = await request(app).put(path).set(...bearer(adminToken)).send({ availability: ["19:00", "08:00"] })
    expect(updated.body.availability).toEqual(["08:00", "19:00"])
    for (const hour of ["25:00", "07:00", "20:00"]) {
      expect((await request(app).put(path).set(...bearer(adminToken)).send({ availability: [hour] })).status).toBe(400)
    }

    expect((await request(app).put(path).set(...bearer(techToken)).send({ name: "X" })).status).toBe(403)
    expect((await request(app).put(path).set(...bearer(clientToken)).send({ name: "X" })).status).toBe(403)
    expect((await request(app).get("/technicians").set(...bearer(clientToken))).body).toHaveLength(1)
    expect((await request(app).get("/technicians")).status).toBe(401)
  })
})

describe("Agendamento", () => {
  async function schedulingScenario() {
    const data = await scenario()
    await prisma.user.update({ where: { id: data.technician.id }, data: { availability: ["08:00", "09:00"] } })
    const body = {
      title: "T", description: "D", serviceId: data.service.id, technicianId: data.technician.id,
      scheduledDate: monday, scheduledHour: "08:00",
    }
    return { ...data, body, auth: bearer(data.clientToken), slotsPath: `/technicians/${data.technician.id}/slots` }
  }

  it("mostra ocupado e libera o horário quando o chamado é encerrado", async () => {
    const { auth, body, slotsPath, techToken } = await schedulingScenario()

    const ticket = await request(app).post("/tickets").set(...auth).send(body)
    expect((await request(app).get(slotsPath).query({ date: monday }).set(...auth)).body).toEqual([
      { hour: "08:00", available: false },
      { hour: "09:00", available: true },
    ])

    await request(app).patch(`/tickets/${ticket.body.id}/status`).set(...bearer(techToken)).send({ status: "in_progress" })
    expect((await request(app).post("/tickets").set(...auth).send(body)).status).toBe(409)

    await request(app).patch(`/tickets/${ticket.body.id}/status`).set(...bearer(techToken)).send({ status: "closed" })
    expect((await request(app).get(slotsPath).query({ date: monday }).set(...auth)).body[0].available).toBe(true)
    expect((await request(app).post("/tickets").set(...auth).send(body)).status).toBe(201)
  })

  it("aceita só um entre dois pedidos simultâneos do mesmo horário", async () => {
    const { auth, body } = await schedulingScenario()
    const responses = await Promise.all([
      request(app).post("/tickets").set(...auth).send(body),
      request(app).post("/tickets").set(...auth).send(body),
    ])
    expect(responses.map(response => response.status).sort()).toEqual([201, 409])
    expect(await prisma.ticket.count()).toBe(1)
  })

  it("o mesmo horário fica livre em outra data e com outro técnico", async () => {
    const { auth, body } = await schedulingScenario()
    const other = await createUser(Role.TECHNICIAN, "outrotec@test.com", ["08:00"])

    expect((await request(app).post("/tickets").set(...auth).send(body)).status).toBe(201)
    expect((await request(app).post("/tickets").set(...auth).send({ ...body, scheduledDate: "2099-01-06" })).status).toBe(201)
    expect((await request(app).post("/tickets").set(...auth).send({ ...body, technicianId: other.id })).status).toBe(201)
  })

  it("rejeita data inválida, passado, fim de semana e hora fora da agenda do técnico", async () => {
    const { auth, body, slotsPath } = await schedulingScenario()

    for (const change of [
      { scheduledDate: "2099-02-31" },
      { scheduledDate: "05/01/2099" },
      { scheduledDate: pastMonday },
      { scheduledDate: saturday },
      { scheduledHour: "10:00" },
      { scheduledHour: "08:30" },
    ]) {
      expect((await request(app).post("/tickets").set(...auth).send({ ...body, ...change })).status).toBe(400)
    }

    expect((await request(app).get(slotsPath).query({ date: saturday }).set(...auth)).body).toEqual([])
    expect((await request(app).get(slotsPath).query({ date: pastMonday }).set(...auth)).body).toEqual([])
    expect((await request(app).get(slotsPath).query({ date: "ontem" }).set(...auth)).status).toBe(400)
    expect((await request(app).get(slotsPath).query({ date: monday })).status).toBe(401)
  })

  it("considera passado no horário de Brasília, mesmo com o servidor em UTC", () => {
    // 23:30 UTC do dia 4 são 20:30 do dia 4 em Brasília.
    const now = new Date("2026-11-04T23:30:00Z")
    expect(isPastSlot("2026-11-04", "19:00", now)).toBe(true)
    expect(isPastSlot("2026-11-05", "08:00", now)).toBe(false)
    // 02:30 UTC do dia 5 ainda são 23:30 do dia 4 em Brasília.
    expect(isPastSlot("2026-11-05", "08:00", new Date("2026-11-05T02:30:00Z"))).toBe(false)
    // 16:30 UTC são 13:30 em Brasília: as 14:00 ainda não começaram. Às 14:00 em ponto, o horário já passou.
    expect(isPastSlot("2026-11-04", "14:00", new Date("2026-11-04T16:30:00Z"))).toBe(false)
    expect(isPastSlot("2026-11-04", "14:00", new Date("2026-11-04T17:00:00Z"))).toBe(true)
  })
})

describe("Clientes", () => {
  it("admin lista, edita e exclui; técnico não", async () => {
    const data = await scenario()
    const path = `/clients/${data.client.id}`
    await createTicket(data)

    expect((await request(app).get("/clients").set(...bearer(data.techToken))).status).toBe(403)
    expect((await request(app).get("/clients").set(...bearer(data.adminToken))).body).toHaveLength(1)

    const updated = await request(app).put(path).set(...bearer(data.adminToken)).send({ name: "Editado" })
    expect(updated.body.name).toBe("Editado")

    // O id de um técnico não é aceito na rota de clientes.
    const wrongRole = await request(app).delete(`/clients/${data.technician.id}`).set(...bearer(data.adminToken))
    expect(wrongRole.status).toBe(404)

    expect((await request(app).delete(path).set(...bearer(data.adminToken))).status).toBe(204)
    expect(await prisma.ticket.count()).toBe(0)
  })
})

describe("Serviços", () => {
  it("responde no formato do frontend e oculta desativados de quem não é admin", async () => {
    const { adminToken, clientToken } = await scenario()

    const created = await request(app).post("/services").set(...bearer(adminToken)).send({ title: "Backup", amount: 49.9 })
    expect(created.status).toBe(201)
    expect(created.body).toEqual({ id: expect.any(String), title: "Backup", amount: 49.9, status: true })

    expect((await request(app).post("/services").set(...bearer(clientToken)).send({ title: "X", amount: 1 })).status).toBe(403)
    expect((await request(app).post("/services").set(...bearer(adminToken)).send({ title: "X", amount: 0 })).status).toBe(400)

    const disabled = await request(app).put(`/services/${created.body.id}`).set(...bearer(adminToken)).send({ status: false })
    expect(disabled.body.status).toBe(false)

    expect((await request(app).get("/services")).body).toHaveLength(1)
    expect((await request(app).get("/services").set(...bearer(clientToken))).body).toHaveLength(1)
    expect((await request(app).get("/services").set(...bearer(adminToken))).body).toHaveLength(2)
  })
})

describe("Chamados", () => {
  it("cliente cria escolhendo serviço e técnico; técnico e admin não criam", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)

    expect(ticket).toMatchObject({
      code: expect.stringMatching(/^\d{5}$/),
      title: "Rede lenta",
      status: "open",
      service: { title: "VPN", amount: 100 },
      client: { name: Role.CLIENT },
      technician: { name: Role.TECHNICIAN, email: "tech@test.com" },
      scheduledDate: monday,
      scheduledHour: "08:00",
      additionalServices: [],
      total: 100,
    })

    const body = {
      title: "T", description: "D", serviceId: data.service.id, technicianId: data.technician.id,
      scheduledDate: monday, scheduledHour: "08:00",
    }
    expect((await request(app).post("/tickets").set(...bearer(data.techToken)).send(body)).status).toBe(403)
    expect((await request(app).post("/tickets").set(...bearer(data.adminToken)).send(body)).status).toBe(403)
  })

  it("exige técnico e serviço válidos", async () => {
    const data = await scenario()
    const auth = bearer(data.clientToken)
    const body = {
      title: "T", description: "D", serviceId: data.service.id, technicianId: data.technician.id,
      scheduledDate: monday, scheduledHour: "08:00",
    }

    const { technicianId: _technicianId, ...withoutTechnician } = body
    expect((await request(app).post("/tickets").set(...auth).send(withoutTechnician)).status).toBe(400)
    expect((await request(app).post("/tickets").set(...auth).send({ ...body, technicianId: data.client.id })).status).toBe(400)

    const noHours = await createUser(Role.TECHNICIAN, "sem@test.com")
    expect((await request(app).post("/tickets").set(...auth).send({ ...body, technicianId: noHours.id })).status).toBe(400)

    await prisma.service.update({ where: { id: data.service.id }, data: { isActive: false } })
    expect((await request(app).post("/tickets").set(...auth).send(body)).status).toBe(400)
  })

  it("cada papel vê só os chamados que lhe cabem", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)
    const otherClient = await createUser(Role.CLIENT, "outro@test.com")
    const otherTech = await createUser(Role.TECHNICIAN, "outrotec@test.com", ["09:00"])
    const otherClientToken = await login(otherClient.email)
    const otherTechToken = await login(otherTech.email)

    for (const token of [data.adminToken, data.clientToken, data.techToken]) {
      expect((await request(app).get("/tickets").set(...bearer(token))).body).toHaveLength(1)
      expect((await request(app).get(`/tickets/${ticket.id}`).set(...bearer(token))).status).toBe(200)
    }
    for (const token of [otherClientToken, otherTechToken]) {
      expect((await request(app).get("/tickets").set(...bearer(token))).body).toHaveLength(0)
      expect((await request(app).get(`/tickets/${ticket.id}`).set(...bearer(token))).status).toBe(404)
    }
  })

  it("status só avança, e somente o técnico responsável ou o admin pode mudar", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)
    const path = `/tickets/${ticket.id}/status`
    const otherTech = await createUser(Role.TECHNICIAN, "outrotec@test.com", ["09:00"])

    expect((await request(app).patch(path).set(...bearer(data.clientToken)).send({ status: "in_progress" })).status).toBe(403)
    expect((await request(app).patch(path).set(...bearer(await login(otherTech.email))).send({ status: "in_progress" })).status).toBe(403)
    expect((await request(app).patch(path).set(...bearer(data.techToken)).send({ status: "open" })).status).toBe(400)

    const started = await request(app).patch(path).set(...bearer(data.techToken)).send({ status: "in_progress" })
    expect(started.body.status).toBe("in_progress")
    expect((await request(app).patch(path).set(...bearer(data.techToken)).send({ status: "in_progress" })).status).toBe(409)

    const closed = await request(app).patch(path).set(...bearer(data.adminToken)).send({ status: "closed" })
    expect(closed.body.status).toBe("closed")
  })

  it("chamado aberto pode ser encerrado direto", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)
    const closed = await request(app).patch(`/tickets/${ticket.id}/status`).set(...bearer(data.techToken)).send({ status: "closed" })
    expect(closed.body.status).toBe("closed")
  })

  it("técnico responsável adiciona e remove adicionais, com total recalculado", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)
    const path = `/tickets/${ticket.id}/additional-services`

    expect((await request(app).post(path).set(...bearer(data.clientToken)).send({ title: "X", amount: 1 })).status).toBe(403)

    const added = await request(app).post(path).set(...bearer(data.techToken)).send({ title: "Assinatura", amount: 120.1 })
    expect(added.status).toBe(201)
    expect(added.body.total).toBe(220.1)
    await request(app).post(path).set(...bearer(data.techToken)).send({ title: "Formatação", amount: 0.2 })

    const serviceId = added.body.additionalServices[0].id
    const removed = await request(app).delete(`${path}/${serviceId}`).set(...bearer(data.techToken))
    expect(removed.status).toBe(200)
    expect(removed.body.additionalServices).toEqual([{ id: expect.any(String), title: "Formatação", amount: 0.2 }])
    expect(removed.body.total).toBe(100.2)
    expect((await request(app).delete(`${path}/${serviceId}`).set(...bearer(data.techToken))).status).toBe(404)

    await request(app).patch(`/tickets/${ticket.id}/status`).set(...bearer(data.techToken)).send({ status: "closed" })
    expect((await request(app).post(path).set(...bearer(data.techToken)).send({ title: "X", amount: 1 })).status).toBe(409)
  })

  it("preço do chamado e serviço desativado continuam nos chamados já criados", async () => {
    const data = await scenario()
    const ticket = await createTicket(data)

    await request(app).put(`/services/${data.service.id}`).set(...bearer(data.adminToken)).send({ amount: 999, status: false })

    const saved = await request(app).get(`/tickets/${ticket.id}`).set(...bearer(data.clientToken))
    expect(saved.body.service).toEqual({ title: "VPN", amount: 100 })
    expect(saved.body.total).toBe(100)
  })
})

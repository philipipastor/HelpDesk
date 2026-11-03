import request from "supertest"
import { sign } from "jsonwebtoken"
import { compare } from "bcryptjs"
import { Prisma, Role } from "@prisma/client"
import { app } from "../src/app"
import { prisma } from "../src/prisma"
import { authConfig } from "../src/configs/auth"

jest.mock("../src/prisma", () => ({ prisma: {
  user: { findUnique: jest.fn(), findFirst: jest.fn(), findMany: jest.fn(),
    create: jest.fn(), update: jest.fn(), delete: jest.fn(), count: jest.fn() },
  ticket: { count: jest.fn() }, $transaction: jest.fn(),
} }))

const db = prisma as unknown as {
  user: Record<string, jest.Mock>; ticket: { count: jest.Mock }; $transaction: jest.Mock;
}
const actor = "00000000-0000-4000-8000-000000000001"
const target = "00000000-0000-4000-8000-000000000002"
const safe = { id: target, name: "Admin", email: "admin@test.com", role: Role.ADMIN }
let role: Role = Role.ADMIN
const token = () => sign({ role }, authConfig.secret, { subject: actor })
const endpoints = [
  ["post", "/admins"], ["get", "/admins"], ["get", `/admins/${target}`],
  ["patch", `/admins/${target}`], ["delete", `/admins/${target}`],
] as const

beforeEach(() => {
  jest.resetAllMocks()
  role = Role.ADMIN
  db.user.findUnique.mockImplementation(async ({ where }) => where.id === actor ? { id: actor, role } : null)
  db.user.findFirst.mockResolvedValue(safe)
  db.user.count.mockResolvedValue(2)
  db.ticket.count.mockResolvedValue(0)
  db.user.create.mockResolvedValue(safe)
  db.user.update.mockResolvedValue(safe)
  db.user.findMany.mockResolvedValue([safe])
  db.$transaction.mockImplementation(async callback => callback(db))
})

describe.each(endpoints)("Proteção %s %s", (method, path) => {
  it("exige autenticação", async () => {
    expect((await request(app)[method](path)).status).toBe(401)
  })
  it.each([Role.CLIENT, Role.TECHNICIAN])("rejeita %s", async deniedRole => {
    role = deniedRole
    expect((await request(app)[method](path).set("Authorization", `Bearer ${token()}`)).status).toBe(403)
    expect(db.user.create).not.toHaveBeenCalled()
    expect(db.user.delete).not.toHaveBeenCalled()
  })
})

it("cria com hash, role fixa e seleção sem senha", async () => {
  const result = await request(app).post("/admins").set("Authorization", `Bearer ${token()}`)
    .send({ name: "Admin", email: safe.email, password: "123456" })
  expect(result.status).toBe(201)
  expect(result.body).not.toHaveProperty("password")
  const args = db.user.create.mock.calls[0][0]
  expect(args.data.role).toBe(Role.ADMIN)
  expect(await compare("123456", args.data.password)).toBe(true)
  expect(args.select).not.toHaveProperty("password")
})

it("lista apenas administradores e busca por id com filtro de role", async () => {
  for (const path of ["/admins", `/admins/${target}`]) {
    const result = await request(app).get(path).set("Authorization", `Bearer ${token()}`)
    expect(result.status).toBe(200)
    expect(JSON.stringify(result.body)).not.toContain("password")
  }
  expect(db.user.findMany.mock.calls[0][0].where).toEqual({ role: Role.ADMIN })
  expect(db.user.findFirst.mock.calls[0][0].where).toEqual({ id: target, role: Role.ADMIN })
})

it.each(["get", "patch", "delete"] as const)("%s retorna 404 para id inexistente ou outra role", async method => {
  db.user.findFirst.mockResolvedValue(null)
  const result = await request(app)[method](`/admins/${target}`)
    .set("Authorization", `Bearer ${token()}`).send({ name: "Novo" })
  expect(result.status).toBe(404)
})

it.each([{ role: Role.CLIENT }, { password: "nova-senha" }, {}, { email: "invalido" }, { name: " " }])(
  "rejeita atualização inválida: %j", async body => {
    const result = await request(app).patch(`/admins/${target}`).set("Authorization", `Bearer ${token()}`).send(body)
    expect(result.status).toBe(400)
    expect(db.user.update).not.toHaveBeenCalled()
  },
)

it("rejeita role enviada no cadastro", async () => {
  const result = await request(app).post("/admins").set("Authorization", `Bearer ${token()}`)
    .send({ name: "Admin", email: safe.email, password: "123456", role: Role.CLIENT })
  expect(result.status).toBe(400)
})

it("atualiza nome e email sem senha", async () => {
  db.user.findFirst.mockResolvedValueOnce(safe).mockResolvedValueOnce(null)
  const result = await request(app).patch(`/admins/${target}`).set("Authorization", `Bearer ${token()}`)
    .send({ name: "Novo", email: "novo@test.com" })
  expect(result.status).toBe(200)
  expect(db.user.update.mock.calls[0][0].data).toEqual({ name: "Novo", email: "novo@test.com" })
  expect(result.body).not.toHaveProperty("password")
})

it("rejeita email duplicado no cadastro e atualização", async () => {
  db.user.findUnique.mockImplementation(async ({ where }) => where.id ? { id: actor, role } : safe)
  expect((await request(app).post("/admins").set("Authorization", `Bearer ${token()}`)
    .send({ name: "Admin", email: safe.email, password: "123456" })).status).toBe(409)
  expect((await request(app).patch(`/admins/${target}`).set("Authorization", `Bearer ${token()}`)
    .send({ email: safe.email })).status).toBe(409)
})

it("trata conflito de email concorrente", async () => {
  db.user.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("unique", { code: "P2002", clientVersion: "6.19.0" }))
  expect((await request(app).post("/admins").set("Authorization", `Bearer ${token()}`)
    .send({ name: "Admin", email: safe.email, password: "123456" })).status).toBe(409)
})

it("exclui com 204 em transação serializável", async () => {
  const result = await request(app).delete(`/admins/${target}`).set("Authorization", `Bearer ${token()}`)
  expect(result.status).toBe(204)
  expect(result.text).toBe("")
  expect(db.user.delete).toHaveBeenCalledWith({ where: { id: target, role: Role.ADMIN } })
  expect(db.$transaction.mock.calls[0][1]).toEqual({ isolationLevel: "Serializable" })
})

it.each(["self", "last", "related"])("impede exclusão: %s", async scenario => {
  if (scenario === "last") db.user.count.mockResolvedValue(1)
  if (scenario === "related") db.ticket.count.mockResolvedValue(1)
  const result = await request(app).delete(`/admins/${scenario === "self" ? actor : target}`)
    .set("Authorization", `Bearer ${token()}`)
  expect(result.status).toBe(scenario === "self" ? 403 : 409)
  expect(db.user.delete).not.toHaveBeenCalled()
})

import request from "supertest"
import { hash } from "bcryptjs"
import { verify } from "jsonwebtoken"
import { Role } from "@prisma/client"
import { app } from "../src/app"
import { prisma } from "../src/prisma"
import { authConfig } from "../src/configs/auth"

jest.mock("../src/prisma", () => ({ prisma: { user: { findUnique: jest.fn() } } }))

const db = prisma as unknown as { user: { findUnique: jest.Mock } }
const id = "00000000-0000-4000-8000-000000000001"
const email = "admin@test.com"

beforeEach(async () => {
  jest.resetAllMocks()
  db.user.findUnique.mockImplementation(async ({ where }) => where.email === email
    ? { id, name: "Admin", email, role: Role.ADMIN, availability: [], password: await hash("123456", 4) }
    : null)
})

it("faz login e retorna token válido, sem a senha e com a role em minúsculas", async () => {
  const result = await request(app).post("/sessions").send({ email, password: "123456" })
  expect(result.status).toBe(200)
  expect(result.body.user).toMatchObject({ id, email, role: "admin" })
  expect(result.body.user).not.toHaveProperty("password")
  const payload = verify(result.body.token, authConfig.secret)
  expect(payload).toMatchObject({ sub: id, role: Role.ADMIN })
})

it("token do login dá acesso a rota protegida", async () => {
  const { body } = await request(app).post("/sessions").send({ email, password: "123456" })
  db.user.findUnique.mockResolvedValue({ id, role: Role.ADMIN })
  // 400 vem da validação do id, que só roda depois de autenticar e autorizar.
  const result = await request(app).get("/admins/not-a-uuid").set("Authorization", `Bearer ${body.token}`)
  expect(result.status).toBe(400)
})

it("responde igual para senha errada e e-mail inexistente", async () => {
  const wrong = await request(app).post("/sessions").send({ email, password: "errada" })
  const unknown = await request(app).post("/sessions").send({ email: "nada@test.com", password: "123456" })
  expect(wrong.status).toBe(401)
  expect(unknown.status).toBe(401)
  expect(wrong.body).toEqual(unknown.body)
  expect(wrong.body).not.toHaveProperty("token")
})

it.each([{}, { email }, { password: "123456" }, { email: "invalido", password: "123456" }, { email, password: "" }])(
  "rejeita corpo inválido: %j", async body => {
    const result = await request(app).post("/sessions").send(body)
    expect(result.status).toBe(400)
    expect(db.user.findUnique).not.toHaveBeenCalled()
  },
)

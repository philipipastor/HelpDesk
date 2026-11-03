import "dotenv/config"
import { hash } from "bcryptjs"
import { PrismaClient, Role } from "@prisma/client"

const prisma = new PrismaClient()

const users = [
  { name: "Administrador", email: "admin@helpdesk.com", role: Role.ADMIN, availability: [] },
  {
    name: "Técnico 1",
    email: "tecnico1@helpdesk.com",
    role: Role.TECHNICIAN,
    availability: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  },
  {
    name: "Técnico 2",
    email: "tecnico2@helpdesk.com",
    role: Role.TECHNICIAN,
    availability: ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"],
  },
  {
    name: "Técnico 3",
    email: "tecnico3@helpdesk.com",
    role: Role.TECHNICIAN,
    availability: ["12:00", "13:00", "14:00", "15:00", "18:00", "19:00", "20:00", "21:00"],
  },
]

const services = [
  { name: "Instalação e atualização de softwares", price: 100 },
  { name: "Instalação e atualização de hardwares", price: 150 },
  { name: "Diagnóstico e remoção de vírus", price: 120 },
  { name: "Suporte a impressoras", price: 80 },
  { name: "Backup e recuperação de dados", price: 200 },
]

async function main() {
  const password = await hash("123456", 10)

  // O container roda o seed a cada inicialização: upsert não duplica nem sobrescreve usuários existentes.
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password },
    })
  }

  // O nome do serviço não é único, então o catálogo só é criado em um banco ainda sem serviços.
  if (await prisma.service.count() === 0) {
    await prisma.service.createMany({ data: services })
  }

  console.log(`Seed concluído: ${users.length} usuários e ${await prisma.service.count()} serviços`)
}

main()
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())

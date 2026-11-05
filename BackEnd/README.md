# HelpDesk API

API RESTful de gerenciamento de chamados usando Node.js, TypeScript, Express, PostgreSQL, Prisma, Zod, JWT, bcryptjs, Jest e Supertest.

**Deploy:** https://helpdesk-api-gcw6.onrender.com ([verificação de saúde](https://helpdesk-api-gcw6.onrender.com/health)) · Interface: https://help-desk-six-kappa.vercel.app

## Requisitos

- Node.js 22+
- Docker + Docker Compose (forma mais simples), ou PostgreSQL local

## Rodando com Docker

```bash
docker compose up --build
```

A API ficará em `http://localhost:3333` e o PostgreSQL em `localhost:5432`.

O container executa as migrations, roda o seed e inicia a API.

## Rodando localmente

1. Copie `.env.example` para `.env`.
2. Inicie um PostgreSQL e confirme `DATABASE_URL`.
3. Instale e prepare o banco:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

## Seed

O seed pode rodar mais de uma vez: não duplica usuários nem sobrescreve os existentes, e só cria os serviços em um banco sem serviços. A senha de todas as contas vem de `SEED_PASSWORD`. Sem essa variável, o seed usa `123456` no desenvolvimento e falha em produção (`NODE_ENV=production`).

| Conta | E-mail | Horários |
|---|---|---|
| Admin | `admin@helpdesk.com` | — |
| Técnico 1 | `tecnico1@helpdesk.com` | 08h às 12h e 14h às 18h |
| Técnico 2 | `tecnico2@helpdesk.com` | 10h às 14h e 16h às 20h |
| Técnico 3 | `tecnico3@helpdesk.com` | 12h às 16h e 18h às 20h |

Também são criados 5 serviços.

## Autenticação

`POST /sessions` recebe:

```json
{
  "email": "admin@helpdesk.com",
  "password": "123456"
}
```

A resposta contém `token` e `user`. Nas rotas protegidas envie:

```text
Authorization: Bearer SEU_TOKEN
```

## Rotas

### Sessão e perfil
- `POST /sessions` — público
- `POST /users` — público; cria uma conta de cliente
- `GET /users/me` — autenticado
- `PATCH /users/me` — autenticado; altera nome e e-mail
- `PATCH /users/me/password` — autenticado; recebe `currentPassword` e `newPassword`
- `DELETE /users/me` — CLIENT; remove também os chamados

### Admins
- `POST /admins`, `GET /admins`, `GET /admins/:id`, `PATCH /admins/:id`, `DELETE /admins/:id` — ADMIN

### Técnicos
- `POST /technicians` — ADMIN; recebe a senha provisória. Sem `availability`, usa o horário comercial
- `GET /technicians` — ADMIN ou CLIENT
- `GET /technicians/:id` — ADMIN
- `GET /technicians/:id/slots?date=AAAA-MM-DD` — ADMIN ou CLIENT; lista as próximas horas do técnico nessa data e indica em `available` se cada uma está livre
- `PUT /technicians/:id` — ADMIN; altera nome, e-mail e horários

### Clientes
- `GET /clients` — ADMIN
- `PUT /clients/:id` — ADMIN
- `DELETE /clients/:id` — ADMIN; remove também os chamados

### Serviços
- `GET /services` — público; somente o ADMIN autenticado recebe os desativados
- `POST /services` — ADMIN; recebe `title`, `amount` e `status` (opcional)
- `PUT /services/:id` — ADMIN; `status: false` desativa o serviço (soft delete)

### Chamados
- `POST /tickets` — CLIENT; recebe `title`, `description`, `serviceId`, `technicianId`, `scheduledDate` (`AAAA-MM-DD`) e `scheduledHour` (`HH:00`)
- `GET /tickets`, `GET /tickets/:id` — ADMIN vê todos, CLIENT os próprios, TECHNICIAN os atribuídos
- `PATCH /tickets/:id/status` — TECHNICIAN responsável ou ADMIN; recebe `in_progress` ou `closed`
- `POST /tickets/:id/additional-services` — TECHNICIAN responsável; recebe `title` e `amount`
- `DELETE /tickets/:id/additional-services/:serviceId` — TECHNICIAN responsável

O status só avança: `open` pode ir para `in_progress` ou `closed`, e `in_progress` para `closed`. Chamado encerrado não aceita alteração nos adicionais.

## Formato das respostas

O banco usa nomes próprios (`ADMIN`, `ABERTO`, `name`, `price`, `isActive`). As respostas são convertidas em `src/utils/presenters.ts` para o formato do frontend (`admin`, `open`, `title`, `amount`, `status`).

## Preço do chamado

O chamado guarda em `servicePrice` o preço do serviço no momento da criação. Assim, alterar o catálogo depois não muda chamados antigos. Os serviços adicionais têm descrição e valor próprios, e o `total` é a soma calculada a cada resposta.

## Disponibilidade

O funcionamento é de segunda a sexta, das 08:00 às 20:00. Cada horário é o início de um atendimento de uma hora, então o último começa às 19:00.

O cliente escolhe o técnico, a data e o horário ao criar o chamado. O horário fica ocupado até o chamado ser encerrado. Se dois clientes pedirem o mesmo horário ao mesmo tempo, um índice único no banco aceita apenas o primeiro, e o segundo recebe o status 409. Datas e horas passadas são avaliadas no horário de Brasília.

## Deploy

A API roda no Render, pelo Blueprint `render.yaml` da raiz do repositório, e o banco fica no Neon. As duas contas usam o plano gratuito.

| Variável | Valor |
|---|---|
| `DATABASE_URL` | Endereço do Neon, com o connection pooling desligado |
| `JWT_SECRET` | Gerado pelo Render |
| `SEED_PASSWORD` | Senha inicial do admin e dos técnicos |
| `CORS_ORIGIN` | `https://help-desk-six-kappa.vercel.app` |
| `NODE_ENV` | `production` |

A cada inicialização, o container aplica as migrations e roda o seed. Um push que altera `BackEnd/` publica uma nova versão.

## Testes

Os testes são de integração e apagam os dados do banco configurado para teste. Use um banco separado.

```bash
createdb helpdesk_test
DATABASE_URL="postgresql://helpdesk:helpdesk@localhost:5432/helpdesk_test?schema=public" npx prisma migrate deploy
TEST_DATABASE_URL="postgresql://helpdesk:helpdesk@localhost:5432/helpdesk_test?schema=public" npm test
```

No Windows/PowerShell, defina `TEST_DATABASE_URL` antes de rodar os comandos.

Os testes de `tests/helpdesk.integration.spec.ts` cobrem sessão, perfil, técnicos, clientes, serviços e chamados, incluindo as permissões de cada papel.

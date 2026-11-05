# HelpDesk

Sistema de gerenciamento de chamados de suporte, com API em Node.js e interface web em React, ambas escritas em TypeScript.

A aplicação possui experiências distintas para **administradores, técnicos e clientes**, com rotas e funcionalidades organizadas de acordo com o perfil do usuário.

## Deploy

- **Aplicação:** https://help-desk-six-kappa.vercel.app (Vercel)
- **API:** https://helpdesk-api-gcw6.onrender.com (Render, com banco PostgreSQL no Neon)

A API usa o plano gratuito do Render e dorme após 15 minutos sem uso. O primeiro acesso depois disso pode levar cerca de um minuto.

## Funcionalidades

- Autenticação com JWT e persistência da sessão do usuário
- Controle de acesso baseado em três perfis: `admin`, `technician` e `client`
- Cadastro de clientes, edição do próprio perfil e troca de senha
- Gerenciamento de técnicos e de seus horários de atendimento
- Gerenciamento de clientes, com exclusão dos chamados junto com a conta
- Catálogo de serviços, com desativação sem perder o histórico dos chamados
- Criação de chamados pelo cliente, escolhendo o serviço, o técnico responsável, a data e o horário
- Agendamento de segunda a sexta, das 08:00 às 20:00, com os horários ocupados bloqueados
- Serviços adicionais incluídos pelo técnico, com o valor total de cada chamado
- Status do chamado: `Aberto`, `Em atendimento` e `Encerrado`
- Layout responsivo, com menu e listagens adaptados para o celular

## Tecnologias

**Back-end:** Node.js, TypeScript, Express, PostgreSQL, Prisma, Zod, JWT, bcryptjs, Docker, Jest e Supertest

**Front-end:** React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod e Axios

## Perfis da aplicação

### Administrador
Gerencia chamados, técnicos, clientes e serviços.

### Técnico
Acompanha os chamados atribuídos, altera o status e inclui serviços adicionais.

### Cliente
Cria novos chamados, acompanha o próprio histórico e gerencia a própria conta.

## Estrutura

```text
HelpDesk/
├── BackEnd/
│   ├── prisma/       # esquema, migrations e seed do banco
│   ├── src/          # rotas, controllers, validações e middlewares
│   └── tests/        # testes automatizados da API
└── FrontEnd/
    └── src/
        ├── components/
        ├── context/
        ├── pages/    # Admin, CLient e Technician
        ├── routes/
        ├── services/
        ├── types/
        └── utils/
```

## Como executar

É necessário ter o Node.js 22 ou superior e o Docker.

Em um terminal, inicie a API e o banco de dados:

```bash
cd BackEnd
docker compose up --build
```

A API ficará disponível em `http://localhost:3333`. Na inicialização, o container aplica as migrations e cria os dados iniciais.

Em outro terminal, inicie a interface:

```bash
cd FrontEnd
npm install
npm run dev
```

A interface ficará disponível em `http://localhost:5173`.

### Contas iniciais

No ambiente local, a senha de todas as contas é `123456`. No deploy, ela vem da variável `SEED_PASSWORD` e não é publicada.

| Perfil | E-mail |
|---|---|
| Administrador | `admin@helpdesk.com` |
| Técnico 1 | `tecnico1@helpdesk.com` |
| Técnico 2 | `tecnico2@helpdesk.com` |
| Técnico 3 | `tecnico3@helpdesk.com` |

Contas de cliente são criadas pela própria tela de cadastro.

## Documentação da API

As rotas, as regras de negócio, a execução sem Docker e os testes estão descritos no [README do back-end](BackEnd/README.md). A configuração da interface está no [README do front-end](FrontEnd/README.md).

## Aprendizados

O projeto trabalha conceitos importantes de aplicações modernas, incluindo componentização, autenticação, autorização baseada em perfil, formulários, validação, roteamento, modelagem de banco de dados, testes automatizados e integração entre Front-end e API REST.

## Autor

Desenvolvido por **Philipi Pastor**.

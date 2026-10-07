# HelpDesk

Interface web de um sistema de gerenciamento de chamados de suporte, desenvolvida com React e TypeScript.

A aplicação possui experiências distintas para **administradores, técnicos e clientes**, com rotas e funcionalidades organizadas de acordo com o perfil do usuário.

> **Status:** projeto em desenvolvimento. A interface está estruturada para integração com a API.

## Funcionalidades

- Autenticação e persistência da sessão do usuário
- Controle de acesso baseado em três perfis: `admin`, `technician` e `client`
- Rotas específicas de acordo com o perfil autenticado
- Área administrativa para chamados, técnicos, clientes e serviços
- Área do técnico para acompanhamento de chamados
- Área do cliente para criação e acompanhamento de chamados
- Visualização de detalhes dos chamados
- Gerenciamento de status
- Formulários com validação
- Componentes reutilizáveis para tabelas, modais, inputs, botões e sidebar
- Preparação para consumo de API REST com Axios

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- Axios

## Perfis da aplicação

### Administrador
Gerencia chamados, técnicos, clientes e serviços.

### Técnico
Acompanha os chamados atribuídos e seus respectivos status.

### Cliente
Cria novos chamados e acompanha os chamados existentes.

## Estrutura

A aplicação está organizada em componentes reutilizáveis, páginas separadas por perfil, contexto de autenticação, rotas específicas, serviços, tipos e utilitários.

```text
src/
├── components/
├── context/
├── pages/
│   ├── Admin/
│   ├── CLient/
│   └── Technician/
├── routes/
├── services/
├── types/
└── utils/
```

## Como executar

```bash
npm install
npm run dev
```

## Aprendizados

O projeto trabalha conceitos importantes de aplicações Front-end modernas, incluindo componentização, autenticação, autorização baseada em perfil, formulários, validação, roteamento e preparação para integração com uma API REST.

## Autor

Desenvolvido por **Philipi Pastor**.

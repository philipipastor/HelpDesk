# HelpDesk — Interface

Interface web do HelpDesk, feita com React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod e Axios.

**Deploy:** https://help-desk-six-kappa.vercel.app · API: https://helpdesk-api-gcw6.onrender.com

## Rodando localmente

Com a API rodando em `http://localhost:3333`:

```bash
npm install
npm run dev
```

A interface ficará em `http://localhost:5173`.

## Endereço da API

O endereço vem da variável `VITE_API_URL`. Sem ela, a interface usa `http://localhost:3333`. Para apontar para outra API, crie um arquivo `.env.local`:

```bash
VITE_API_URL=https://helpdesk-api-gcw6.onrender.com
```

## Deploy

O projeto está na Vercel, no plano gratuito, com a pasta `FrontEnd` como raiz e a variável `VITE_API_URL` apontando para a API no Render. O `vercel.json` envia todas as rotas para o `index.html`, para que recarregar uma tela não dê erro 404.

Um push na branch `main` publica uma nova versão.

## Perfis

- **Cliente:** cria chamados escolhendo serviço, técnico, data e horário, e acompanha o histórico.
- **Técnico:** atende os chamados atribuídos, muda o status e inclui serviços adicionais.
- **Administrador:** gerencia chamados, técnicos, clientes e serviços.

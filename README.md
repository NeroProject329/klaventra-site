# Consultoria Azul — Next.js + React + Tailwind CSS v4

Site convertido da versão PHP/HTML/CSS para Next.js com App Router, React e Tailwind CSS v4.

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois acesse:

```bash
http://localhost:3000
```

## Configurar WhatsApp

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá, gostaria de verificar meus descontos!
```

O número precisa estar com DDI e DDD, somente números.

## Páginas disponíveis

- `/` — Landing page principal
- `/politica-privacidade` — Política de Privacidade
- `/termos-uso` — Termos de Uso

## Observação sobre o painel PHP

O ZIP original tinha um painel PHP para trocar número de WhatsApp via banco. Nesta versão Next.js, o número foi simplificado para variável de ambiente. Caso você queira manter painel administrativo, o ideal é criar uma API/backend separado ou integrar com banco via Route Handlers do Next.

# Nuxt Minimal Starter
Repositorio hecho con Nuxt, Vue, Mysql
https://nuxt.com/docs/getting-started/introduction

## Setup

Instalar dependencias:

```bash
# npm
npm install
npx prisma generate
```

## Entorno de desarrollo
Crear un env con estas dos variables:
DATABASE_URL="mysql://root@localhost:3306/web"
NUXT_SESSION_PASSWORD=

## Development Server

Ejecutar servidor de desarrollo en `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

```
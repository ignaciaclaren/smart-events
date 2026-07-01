import pkg from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const { PrismaClient } = pkg

const globalForPrisma = globalThis as unknown as {
  __prisma?: InstanceType<typeof PrismaClient>
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en el archivo .env')
  }

  const url = new URL(process.env.DATABASE_URL)
  
  const adapter = new PrismaMariaDb({
    host: url.hostname || 'localhost',
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username || 'root'),
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.slice(1),
    connectionLimit: 5,
  })

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })
}

export const prisma = globalForPrisma.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}
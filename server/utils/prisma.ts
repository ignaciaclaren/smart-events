import pkg from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// Extraemos PrismaClient de forma segura para evitar el error de módulos en Nuxt
const { PrismaClient } = pkg

// Usamos __prisma para evitar que choque con el auto-import de Nuxt
const globalForPrisma = globalThis as unknown as {
  __prisma?: InstanceType<typeof PrismaClient>
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en el archivo .env')
  }

  const url = new URL(process.env.DATABASE_URL)
  
  // Configuramos el adaptador que exige el motor "client"
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

// Exportamos la constante que tus endpoints ya están usando
export const prisma = globalForPrisma.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}
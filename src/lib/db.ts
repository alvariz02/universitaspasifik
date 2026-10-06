import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaShutdownHandlersRegistered?: boolean
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Hot reload must not keep adding process listeners.
if (!globalForPrisma.prismaShutdownHandlersRegistered) {
  globalForPrisma.prismaShutdownHandlersRegistered = true
  process.on('beforeExit', async () => {
    await db.$disconnect()
  })
  process.on('SIGINT', async () => {
    await db.$disconnect()
    process.exit(0)
  })
  process.on('SIGTERM', async () => {
    await db.$disconnect()
    process.exit(0)
  })
}

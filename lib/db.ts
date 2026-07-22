import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrisma = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL!,
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma || createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;





import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const getPrismaInstance = () => {
  // 1. Damos prioridad a DATABASE_URL (Transaction Pooler en puerto 6543)
  let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;

  // 2. Garantizamos que el parámetro sslmode=no-verify esté presente si no viene en la URL
  if (connectionString && !connectionString.includes('sslmode=')) {
    const separator = connectionString.includes('?') ? '&' : '?';
    connectionString += `${separator}sslmode=no-verify`;
  }

  // 3. Instanciamos el Pool optimizado para Supavisor Transaction Pooler en Serverless
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    // Limitar conexiones concurrentes por contenedor serverless para proteger la cuota de Supabase
    max: process.env.NODE_ENV === 'production' ? 2 : 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Patrón Global Singleton estricto: evita fuga de conexiones TCP en Vercel Serverless
export const prisma = globalForPrisma.prisma ?? getPrismaInstance();

globalForPrisma.prisma = prisma;
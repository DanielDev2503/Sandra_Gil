import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { INITIAL_FAQS } from '../lib/faqs-data';
import * as fs from 'fs';
import * as path from 'path';

// Cargar .env manualmente si no está presente en process.env
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch (e) {
    // Si no existe, continuar
  }
}

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString: connectionString.includes('sslmode=')
    ? connectionString
    : `${connectionString}${connectionString.includes('?') ? '&' : '?'}sslmode=no-verify`,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedFaqs() {
  console.log('Iniciando sincronización de Preguntas Frecuentes (FAQs)...');

  for (const faq of INITIAL_FAQS) {
    const existing = await prisma.fAQ.findFirst({
      where: { pregunta: faq.pregunta },
    });

    if (!existing) {
      await prisma.fAQ.create({
        data: {
          pregunta: faq.pregunta,
          respuesta: faq.respuesta,
          categoria: faq.categoria,
          orden: faq.orden,
          activo: faq.activo,
        },
      });
      console.log(`+ Creada FAQ: "${faq.pregunta.slice(0, 45)}..."`);
    } else {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: {
          respuesta: faq.respuesta,
          categoria: faq.categoria,
          orden: faq.orden,
          activo: faq.activo,
        },
      });
      console.log(`~ Actualizada FAQ: "${faq.pregunta.slice(0, 45)}..."`);
    }
  }

  const total = await prisma.fAQ.count();
  console.log(`Sincronización completada. Total de FAQs activas: ${total}`);
}

seedFaqs()
  .catch((e) => {
    console.error('Error al poblar FAQs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

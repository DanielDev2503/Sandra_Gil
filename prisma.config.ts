// Prisma 7: las URLs de conexión van aquí, no en schema.prisma
// Ver: https://pris.ly/d/config-datasource
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["POSTGRES_URL_NON_POOLING"] || process.env["DATABASE_URL"]!,
  },
});

# Auditoría de Dependencias y Notas de Migración (Context7 Live Audit)

**Proyecto:** Sandra Gil Velas Artesanales  
**Herramienta de Consulta:** Context7 MCP  
**Fecha:** Agosto 2026  
**Objetivo:** Contrastar el estado real del código base contra la documentación oficial, APIs recomendadas y mejores prácticas vigentes de cada framework y librería instalada.

---

## 1. Matriz de Dependencias y Estado de Versiones

| Dependencia | Versión Instalada | Versión / Estado Context7 | Estado en Código | Nivel de Riesgo |
| :--- | :--- | :--- | :--- | :--- |
| **`next`** | `^16.2.11` | `v16.2.9+` (App Router) | ✅ Alineado (Async params & metadata) | Ninguno |
| **`react` / `react-dom`** | `19.2.4` | `19.x` (React 19 Server Components) | ✅ Alineado | Ninguno |
| **`@prisma/client` / `prisma`** | `^7.8.0` | `v7.x` (Config & Driver Adapters) | ✅ Alineado (`prisma.config.ts`) | Bajo (Uniformar seed/test) |
| **`@prisma/adapter-pg`** | `^7.9.0` | `v7.x` (`@prisma/adapter-pg`) | ✅ Alineado con `pg.Pool` | Ninguno |
| **`tailwindcss`** | `^4` | `v4.x` (CSS-first engine) | ✅ Alineado (`@theme inline`) | Ninguno |
| **`motion`** | `^13.1.0` | `v13.x` (`motion/react`) | ⚠️ Por implementar en componentes | Medio (Import path) |
| **`animejs`** | `^4.5.0` | `v4.x` (ESM Named Exports) | ⚠️ Por implementar en animaciones | Medio (Sintaxis v4) |
| **`@vercel/analytics`** | `^2.0.1` | `v2.x` (`@vercel/analytics/next`) | ✅ Alineado en `layout.tsx` | Ninguno |
| **`lucide-react`** | `^1.18.0` | `v1.x` | ✅ Alineado | Ninguno |
| **`pg`** | `^8.22.0` | `v8.x` | ✅ Alineado | Ninguno |

---

## 2. Auditoría Detallada por Tecnología (Vía Context7)

### 2.1. Next.js 16 + React 19

#### Hallazgos y Validación de Context7 (`/vercel/next.js`):
- **Breaking Change en Parámetros Dinámicos:** En Next.js 15/16, `params` y `searchParams` en componentes de página (`page.tsx`) y en la función `generateMetadata` ya no son objetos síncronos; son instancias de `Promise`.
- **Estado en el Código:**
  - `app/productos/[id]/page.tsx` implementa correctamente:
    ```tsx
    interface ProductDetailPageProps {
      params: Promise<{ id: string }>;
    }
    export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
      const resolvedParams = await params;
      // ...
    }
    ```
  - `app/checkout/confirmation/page.tsx` implementa correctamente:
    ```tsx
    interface ConfirmationPageProps {
      searchParams: Promise<{ orderId?: string }>;
    }
    export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
      const resolvedSearchParams = await searchParams;
      // ...
    }
    ```
- **Recomendación:** Mantener la convención de `await params` y `await searchParams` en cualquier nueva ruta dinámica que se cree.

---

### 2.2. Prisma ORM 7 + PostgreSQL Driver Adapters

#### Hallazgos y Validación de Context7 (`/prisma/skills`, `/prisma/web`):
- **Desacoplamiento de Datasource URLs:** En Prisma v7, las directivas `url`, `directUrl` y `shadowDatabaseUrl` dentro del bloque `datasource db` de `schema.prisma` están formalmente deprecadas. Deben definirse en `prisma.config.ts`.
- **Driver Adapters:** Prisma 7 exige el uso de adaptadores nativos (`@prisma/adapter-pg`) para conexiones directas y pooled a PostgreSQL.
- **Estado en el Código:**
  - `schema.prisma` está limpio y solo define el `provider = "postgresql"`:
    ```prisma
    datasource db {
      provider = "postgresql"
    }
    ```
  - `prisma.config.ts` maneja centralizadamente la URL de migraciones y seed:
    ```typescript
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
    ```
  - `lib/db.ts` inicializa correctamente el adaptador con `pg.Pool` y `PrismaPg`.
- **Observación / Punto de Mejora:**
  - `prisma/seed.ts` y `test-webhook.ts` instancian `new PrismaClient({ adapter: new PrismaPg({ connectionString: ... }) })` directamente en lugar de reutilizar el singleton exportado desde `@/lib/db`. Se recomienda unificar para que todos los scripts compartan el mismo pool configurado.

---

### 2.3. Motion v13 (Sustitución de Framer Motion)

#### Hallazgos y Validación de Context7 (`/websites/motion_dev`):
- **Paquete Unificado:** La librería `framer-motion` fue renombrada y consolidada en el paquete npm `motion`.
- **Sintaxis de Importación en React:**
  - ❌ **Deprecado / No recomendado:**
    ```typescript
    import { motion } from 'framer-motion';
    import { motion } from 'motion'; // (para vanilla JS)
    ```
  - ✅ **Estándar Oficial v13:**
    ```typescript
    import { motion, AnimatePresence } from 'motion/react';
    ```
- **Paso de Migración Recomendado:** Cuando se agreguen micro-interacciones (ej. apertura fluida de `CartDrawer`, hover states o transiciones de página), importar exclusivamente desde `'motion/react'`.

---

### 2.4. Anime.js v4

#### Hallazgos y Validación de Context7 (`/websites/animejs`):
- **Reescritura de API (v3 a v4):** Anime.js v4 cambió drásticamente su arquitectura. Ya no se utiliza la función por defecto `anime({...})`.
- **Sintaxis ESM v4 Oficial:**
  - ❌ **Sintaxis antigua (v3):**
    ```javascript
    import anime from 'animejs';
    anime({ targets: '.box', translateX: 250 });
    ```
  - ✅ **Sintaxis moderna (v4):**
    ```javascript
    import { animate, createTimeline, createTimer } from 'animejs';

    animate('.box', {
      x: '250px',
      duration: 800,
      ease: 'outQuad',
    });
    ```
- **Paso de Migración Recomendado:** Al integrar animaciones SVG o timelines complejos para la llama de las velas o efectos de partículas, emplear los named exports de v4.

---

### 2.5. Tailwind CSS v4

#### Hallazgos y Validación de Context7 (`/websites/tailwindcss`):
- **Motor CSS-First:** Tailwind CSS v4 prescinde de `tailwind.config.js` y `postcss` complejo tradicional.
- **Estado en el Código:**
  - `app/globals.css` está 100% adaptado a v4 con `@import "tailwindcss";` y `@theme inline { ... }` para registrar los tokens de la marca (`--color-brand-gold`, `--color-brand-brown`, etc.).

---

## 3. Hallazgos Específicos del Código Base

1. **Inconsistencia en Número de Soporte WhatsApp:**
   - **Ubicación:** `app/checkout/confirmation/page.tsx` (Línea 37):
     ```typescript
     const whatsappNumber = '573000000000'; // Placeholder
     ```
   - **Corrección recomendada:** Reemplazar por el número oficial utilizado en el resto de la aplicación (`573175752029`).

2. **Tipado `any` en `ProductDetailPage`:**
   - **Ubicación:** `app/productos/[id]/page.tsx` (Líneas 70, 134, 148).
   - **Corrección recomendada:** Reemplazar por tipos inferidos de Prisma (`Prisma.ProductoGetPayload<{ include: { resenas: true, variaciones: true } }>`).

3. **Vulnerabilidades de dependencias (`npm audit`):**
   - El reporte de npm detectó 13 vulnerabilidades en paquetes de desarrollo/transitivos.
   - **Acción recomendada:** Ejecutar `npm audit` y actualizar selectivamente sin forzar paquetes mayores para evitar roturas en dependencias de compilación.

---

## 4. Plan de Acción Recomendado para el Equipo Técnico

1. **Fase 1 (Inmediata - Sin impacto en código):**
   - Documentación actualizada y sincronizada en `README.md`, `docs/ARCH.md` y `docs/MIGRATION.md`.
2. **Fase 2 (Próximo Sprint - Ajustes Menores):**
   - Corregir el placeholder del teléfono en `confirmation/page.tsx`.
   - Reutilizar `@/lib/db` en `seed.ts` y `test-webhook.ts`.
3. **Fase 3 (Nuevas Funcionalidades):**
   - Implementar transiciones visuales con `motion/react` y `animejs` v4 respetando las convenciones documentadas.

# Sandra Gil · Velas Artesanales & Aromáticas 🕯️

> Plataforma de comercio electrónico de alta fidelidad para **Sandra Gil Velas Artesanales**, especializada en velas decorativas y aromáticas vertidas a mano con cera de soya 100% natural, flores botánicas preservadas y cosmética artesanal en Bogotá, Colombia.

---

## 🏛️ Resumen de Arquitectura y Stack Tecnológico

El proyecto está construido sobre una arquitectura moderna full-stack de alto rendimiento:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router con Server Components y React 19).
- **Lenguaje**: TypeScript 5 (Strict Mode).
- **Base de Datos & ORM**: PostgreSQL (Supabase) con [Prisma ORM 7](https://www.prisma.io/) utilizando Driver Adapters (`@prisma/adapter-pg` y `pg.Pool`).
- **Estilos & Diseño**: [Tailwind CSS v4](https://tailwindcss.com/) (motor CSS-first `@theme inline`) y tipografía artesanal (`Playfair Display` + `Inter`).
- **Animaciones & Interactividad**: [Motion v13](https://motion.dev/) y [Anime.js v4](https://animejs.com/).
- **Pasarela de Pagos**: [Wompi Colombia](https://wompi.co/) (Bancolombia) mediante Hosted Checkout con firma criptográfica de integridad SHA-256 y Webhooks con reducción automática de inventario.
- **Automatizaciones**: Webhooks salientes a [Make.com](https://www.make.com/) / Zapier para alertas y gestión de pedidos.
- **Analítica & Rendimiento**: `@vercel/analytics` y optimización SEO integral (OpenGraph, Twitter Cards, Schema.org JSON-LD).

---

## 📂 Estructura del Proyecto

```
.
├── app/                              # Rutas de Next.js App Router
│   ├── api/                          # Endpoints REST del Backend
│   │   ├── checkout/route.ts         # Creación de orden y firma Wompi SHA-256
│   │   ├── resenas/route.ts          # Creación y consulta de valoraciones
│   │   └── webhooks/wompi/route.ts   # Webhook de Wompi con reducción de stock y disparo a Make
│   ├── catalogo/                     # Catálogo completo con filtrado dinámico
│   ├── checkout/                     # Proceso de compra y checkout hosted
│   │   └── confirmation/             # Página de verificación y estado del pedido
│   ├── envio-express/                # Landing y formulario de envíos el mismo día
│   ├── legal/                        # Políticas de privacidad, envíos, cookies y términos
│   ├── nosotros/                     # Historia de marca y proceso artesanal
│   ├── personalizadas/               # Cotización de velas corporativas y eventos
│   ├── productos/[id]/               # Ficha de producto con variaciones y reseñas
│   ├── globals.css                   # Tailwind CSS v4 y variables de diseño
│   ├── layout.tsx                    # Root layout, fuentes, SEO y proveedores
│   ├── page.tsx                      # Landing page principal
│   ├── robots.ts                     # Generador dinámico de robots.txt
│   └── sitemap.ts                    # Generador dinámico de sitemap.xml
├── components/                       # Componentes React reutilizables (Header, Footer, CartDrawer, etc.)
├── context/                          # Context API de React (CartContext con localStorage)
├── docs/                             # Documentación técnica extendida
│   ├── ARCH.md                       # Arquitectura detallada, esquemas y flujos
│   └── MIGRATION.md                  # Auditoría de dependencias y guías Context7
├── lib/                              # Utilidades de servidor y base de datos
│   ├── colombia-cities.ts            # Matriz de ciudades de Colombia y tarifas de envío
│   └── db.ts                         # Singleton de Prisma Client 7 con adaptador Postgres
├── prisma/                           # Esquema y migraciones de base de datos
│   ├── schema.prisma                 # Modelos de datos (Producto, Pedido, Resena, etc.)
│   └── seed.ts                       # Script para poblar la base de datos inicial
├── prisma.config.ts                  # Configuración de datasource de Prisma 7
├── public/                           # Recursos estáticos (imágenes, logos, iconos)
└── test-webhook.ts                   # Script de prueba e integración para webhooks Wompi
```

---

## ⚙️ Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# ── Conexión a Base de Datos (Supabase PostgreSQL / Prisma 7)
DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-1-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
POSTGRES_PRISMA_URL="postgresql://postgres.[REF]:[PASS]@aws-1-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://postgres.[REF]:[PASS]@aws-1-[REGION].pooler.supabase.com:5432/postgres"

# ── Pasarela de Pagos (Wompi Bancolombia)
NEXT_PUBLIC_WOMPI_PUBLIC_KEY="pub_prod_..."           # o pub_test_... para sandbox
WOMPI_INTEGRITY_SECRET="prod_integrity_..."           # Secreto para firma SHA-256 de checkout
WOMPI_EVENTS_SECRET="prod_events_..."                 # Secreto para validar firma en Webhooks
WOMPI_CHECKOUT_URL="https://checkout.wompi.co/p/"     # Endpoint de redirección de Wompi

# ── Dominio Base
NEXT_PUBLIC_BASE_URL="https://sgvelas.com"             # http://localhost:3000 en desarrollo

# ── Automatizaciones (Opcional)
MAKE_WEBHOOK_URL="https://hook.us1.make.com/..."       # Webhook para notificar a WhatsApp/Email/CRM
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Prerrequisitos
- **Node.js**: `v20.x` o superior (Recomendado Node 22 LTS).
- **npm**: `v10.x` o superior.
- **Base de Datos**: Instancia activa de PostgreSQL (ej. Supabase).

### 2. Instalación de dependencias
```bash
npm install
```

### 3. Generación del cliente de Prisma
```bash
npx prisma generate
```

### 4. Ejecutar migraciones / Seed de base de datos
```bash
# Aplicar migraciones existentes
npx prisma migrate deploy

# Poblar catálogo de prueba (opcional)
npx tsx prisma/seed.ts
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 6. Compilación de producción
```bash
npm run build
npm run start
```

---

## 🧪 Pruebas de Integración (Webhooks Wompi)

Para verificar el ciclo de vida completo de un pago y la deducción atómica de inventario:

```bash
# Asegúrate de que el servidor de desarrollo esté corriendo en localhost:3000
npx tsx test-webhook.ts
```

---

## 📚 Documentación Técnica Adicional

Para más detalles sobre la arquitectura interna, modelos de datos y auditoría de versiones:
- 📖 [Documento de Arquitectura Técnica (`docs/ARCH.md`)](./docs/ARCH.md)
- 🔄 [Auditoría de Dependencias y Guía de Migración (`docs/MIGRATION.md`)](./docs/MIGRATION.md)

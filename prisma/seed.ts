import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });


async function main() {
  // Clear existing products
  await prisma.producto.deleteMany({});
  
  const productos = [
    {
      nombre: "Vela Celestial de Lavanda y Flores Preservadas",
      descripcion: "Vela artesanal de cera de soya natural, decorada con flores de lavanda y amatista. Aroma relajante y suave, ideal para meditación.",
      aroma: "Lavanda & Manzanilla",
      dimensiones: "8 x 8 cm",
      precio: 45000,
      stock: 20,
      url_imagen: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela de Rosas Silvestres y Peonías",
      descripcion: "Sinfonía romántica de pétalos de rosa y peonías frescas. Decorada con flores secas de peonía y destellos dorados.",
      aroma: "Rosas & Peonías",
      dimensiones: "10 x 8 cm",
      precio: 48000,
      stock: 15,
      url_imagen: "https://images.unsplash.com/photo-1602872030219-cbf652936e5a?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela Citrus Blossom & Caléndula",
      descripcion: "Notas vibrantes de mandarina, bergamota y caléndula. Decorada con pétalos de caléndula secados al sol.",
      aroma: "Cítricos & Caléndula",
      dimensiones: "8 x 8 cm",
      precio: 42000,
      stock: 25,
      url_imagen: "https://images.unsplash.com/photo-1596435707261-05608be50720?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela Jazmín Imperial y Cuarzo Blanco",
      descripcion: "Aroma dulce y cautivador a jazmín silvestre con un cuarzo cristalino para purificar la energía del espacio.",
      aroma: "Jazmín & Vainilla",
      dimensiones: "9 x 9 cm",
      precio: 52000,
      stock: 12,
      url_imagen: "https://images.unsplash.com/photo-1572726729207-a78d6fe36f72?auto=format&fit=crop&q=80&w=600",
      activo: true
    }
  ];

  for (const prod of productos) {
    await prisma.producto.create({ data: prod });
  }

  console.log("Base de datos poblada exitosamente con productos de muestra.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

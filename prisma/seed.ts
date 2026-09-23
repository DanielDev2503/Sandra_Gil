import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL! }) });


async function main() {
  // Clear existing products
  await prisma.producto.deleteMany({});
  
  const productos = [
    {
      nombre: "Vela Aromática Lavanda & Manzanilla",
      descripcion: "Vela artesanal elaborada con 100% cera de soya natural, vertida a mano en Bogotá. Decorada con flores botánicas naturales de lavanda y amatista. Aroma relajante y suave formulado para aromaterapia y descanso profundo.",
      aroma: "Lavanda & Manzanilla",
      material: "100% Cera de Soya Natural y Flores Botánicas",
      dimensiones: "8 x 8 cm",
      precio: 45000,
      stock: 20,
      url_imagen: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela de Rosas Silvestres y Peonías",
      descripcion: "Sinfonía romántica de pétalos de rosa y peonías frescas en cera de soya botánica. Decorada con flores botánicas naturales de peonía secadas al sol y destellos minerales.",
      aroma: "Rosas & Peonías",
      material: "100% Cera de Soya Natural y Flores Botánicas",
      dimensiones: "10 x 8 cm",
      precio: 48000,
      stock: 15,
      url_imagen: "https://images.unsplash.com/photo-1602872030219-cbf652936e5a?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela Botánica Cítricos & Caléndula",
      descripcion: "Cera de soya ecológica con flores botánicas naturales de caléndula, energía y vitalidad. Notas vibrantes de mandarina, bergamota y pétalos dorados cosechados artesanalmente.",
      aroma: "Cítricos & Caléndula",
      material: "100% Cera de Soya Natural y Flores Botánicas",
      dimensiones: "8 x 8 cm",
      precio: 42000,
      stock: 25,
      url_imagen: "https://images.unsplash.com/photo-1596435707261-05608be50720?auto=format&fit=crop&q=80&w=600",
      activo: true
    },
    {
      nombre: "Vela Decorativa Jazmín Imperial",
      descripcion: "Cera de soya pura en recipiente artesanal, elegancia y calidez. Aroma cautivador a jazmín silvestre con cuarzo blanco cristalino para purificar y armonizar el ambiente.",
      aroma: "Jazmín & Vainilla",
      material: "100% Cera de Soya Natural y Flores Botánicas",
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

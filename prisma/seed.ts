import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL! }) });


async function main() {
  // Clear existing products
  await prisma.producto.deleteMany({});
  
  const productos = [
    {
      nombre: "Vela Botánica Lavanda & Manzanilla",
      descripcion: "Calma profunda, relajación y descanso reparador. Vertida a mano en Bogotá con cera de soya 100% vegetal, flores botánicas naturales y pabilo de algodón orgánico sin plomo. Ideal para rituales nocturnos y aromaterapia de serenidad.",
      aroma: "Lavanda & Manzanilla",
      material: "100% Cera de Soya Natural",
      dimensiones: "8.5 cm x 8 cm",
      precio: 48000,
      stock: 25,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317497498-6edeo9.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317497498-6edeo9.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317499400-8c9v7h.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317500395-f7y71s.png"
      ],
      activo: true
    },
    {
      nombre: "Vela Botánica Cítricos & Caléndula",
      descripcion: "Energía, frescura botánica y claridad mental para espacios de trabajo y estudio. Elaborada a mano en Bogotá con esencias cítricas vivas de mandarina y bergamota, acompañada de pétalos botánicos naturales de caléndula sobre cera vegetal pura.",
      aroma: "Cítricos & Caléndula",
      material: "100% Cera de Soya Natural",
      dimensiones: "8.5 cm x 8 cm",
      precio: 46000,
      stock: 20,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380592944-3ncvj7.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380592944-3ncvj7.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380595212-7xp44n.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380597094-6lw55a.png"
      ],
      activo: true
    },
    {
      nombre: "Vela Aromática Jazmín Imperial",
      descripcion: "Elegancia floral, sofisticación y calidez en envase artesanal reutilizable. Notas envolventes de jazmín blanco y flor de azahar sobre cera pura de soya para iluminar momentos de calma e introspección.",
      aroma: "Jazmín & Vainilla",
      material: "100% Cera de Soya Natural",
      dimensiones: "9 cm x 8.5 cm",
      precio: 52000,
      stock: 18,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831911997-3t4f4l.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831911997-3t4f4l.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831912904-0f8hzs.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831913869-c7zstb.png"
      ],
      activo: true
    },
    {
      nombre: "Vela Aromática Rosas Silvestres",
      descripcion: "Esencia romántica clásica con pétalos botánicos naturales. Una atmósfera sutil y delicada para renovar la energía de tu hogar con combustión limpia, pabilo de algodón sin plomo y cera 100% vegetal.",
      aroma: "Rosas & Peonías",
      material: "100% Cera de Soya Natural",
      dimensiones: "8.5 cm x 8 cm",
      precio: 48000,
      stock: 22,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381022186-d0iiz0.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381022186-d0iiz0.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381024462-zw8lr0.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381026466-fbupf5.png"
      ],
      activo: true
    },
    {
      nombre: "Vela Aromática Vainilla Dulce",
      descripcion: "Notas cálidas y sensación acogedora para el hogar. Crema de vainilla bourbon y azúcar moreno sobre cera de soya biodegradable que reconforta los sentidos y propicia un ambiente cálido y familiar.",
      aroma: "Vainilla Francesa",
      material: "100% Cera de Soya Natural",
      dimensiones: "8 cm x 7.5 cm",
      precio: 44000,
      stock: 30,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786258670363-eiru07.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786258670363-eiru07.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1787215460242-lo9xh9.jpg"
      ],
      activo: true
    },
    {
      nombre: "Vela Especiada Canela & Manzana",
      descripcion: "Clima cálido, especiado y reconfortante. Fusión aromática de canela en rama y frutos otoñales para crear ambientes de celebración e inspiración con combustión prolongada y libre de toxinas.",
      aroma: "Canela & Especias",
      material: "100% Cera de Soya Natural",
      dimensiones: "8.5 cm x 8 cm",
      precio: 45000,
      stock: 15,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652508987-srp0ip.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652508987-srp0ip.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652509903-9i751o.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652510766-hd58s8.png"
      ],
      activo: true
    },
    {
      nombre: "Vela Herbal Eucalipto & Menta",
      descripcion: "Claridad mental, apertura de vías respiratorias y frescura aromática. Diseñada para purificar el ambiente con aceites botánicos, cera de soya natural y combustión libre de hollín ni humos negros.",
      aroma: "Menta & Eucalipto",
      material: "100% Cera de Soya Natural",
      dimensiones: "8.5 cm x 8 cm",
      precio: 46000,
      stock: 20,
      url_imagen: "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494857707-mq2r0j.png",
      imagenes: [
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494857707-mq2r0j.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494858791-weemiz.png",
        "https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494859791-eo9t87.png"
      ],
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

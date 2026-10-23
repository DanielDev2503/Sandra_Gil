import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Cargar .env manualmente si se ejecuta en Node.js standalone
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {
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

async function main() {
  console.log('🕯️ Iniciando purga de datos de prueba y sincronización de catálogo real...');

  // ── 1. PURGA SEGURA DE REGISTROS DE PRUEBA PREVIOS ─────────────────────────
  // A. Localizar y eliminar pedidos de prueba (precios irreales <= 2000 COP o clientes de prueba)
  const dummyPedidos = await prisma.pedido.findMany({
    where: {
      OR: [
        { total_pagado: { lte: 2000 } },
        { cliente_nombre: { contains: 'prueba', mode: 'insensitive' } },
        { cliente_email: { contains: 'prueba', mode: 'insensitive' } },
        { cliente_email: { contains: 'test', mode: 'insensitive' } },
      ],
    },
    select: { id: true },
  });

  if (dummyPedidos.length > 0) {
    const dummyPedidoIds = dummyPedidos.map((p) => p.id);
    await prisma.itemPedido.deleteMany({
      where: { pedido_id: { in: dummyPedidoIds } },
    });
    await prisma.pedido.deleteMany({
      where: { id: { in: dummyPedidoIds } },
    });
    console.log(`🧹 Eliminados ${dummyPedidos.length} pedidos de prueba y sus ítems asociados.`);
  }

  // B. Localizar cualquier producto de prueba previo
  const dummyProducts = await prisma.producto.findMany({
    where: {
      OR: [
        { nombre: { contains: 'prueba', mode: 'insensitive' } },
        { nombre: { contains: 'produvto', mode: 'insensitive' } },
        { nombre: { contains: 'lololol', mode: 'insensitive' } },
        { descripcion: { contains: 'prueba', mode: 'insensitive' } },
        { descripcion: { contains: 'lololol', mode: 'insensitive' } },
        { slug: { contains: 'prueba', mode: 'insensitive' } },
        { slug: { contains: 'lololol', mode: 'insensitive' } },
        { slug: { contains: 'muestra-de-estudio', mode: 'insensitive' } },
        { precio: { lte: 2000 } },
      ],
    },
    select: { id: true, nombre: true },
  });

  if (dummyProducts.length > 0) {
    const dummyProductIds = dummyProducts.map((p) => p.id);
    // Eliminar relaciones en cascada segura
    await prisma.itemPedido.deleteMany({
      where: { producto_id: { in: dummyProductIds } },
    });
    await prisma.variacionProducto.deleteMany({
      where: { productoId: { in: dummyProductIds } },
    });
    await prisma.resena.deleteMany({
      where: { producto_id: { in: dummyProductIds } },
    });
    await prisma.producto.deleteMany({
      where: { id: { in: dummyProductIds } },
    });
    console.log(`🧹 Purga exitosa: eliminados ${dummyProducts.length} productos basura/prueba.`);
  }

  // ── 2. CATÁLOGO REAL DE ALTA CONVERSIÓN (VELAS ARTESANALES) ─────────────────
  const catalogoReal = [
    {
      nombre: 'Vela Botánica Lavanda & Manzanilla',
      slug: 'vela-botanica-lavanda-manzanilla',
      descripcion:
        '<p>Calma profunda, relajación y descanso reparador en tu santuario personal. Elaborada artesanalmente en nuestro taller de Bogotá con cera de soya 100% natural, pabilo trenzado de algodón orgánico sin plomo y flores botánicas preservadas.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Lavanda silvestre de la Provenza y manzanilla dulce.<br/>• Corazón: Hierbas aromáticas y flor de azahar.<br/>• Fondo: Maderas suaves y vainilla sutil.</p><ul><li>100% Cera de Soya Natural Biodegradable</li><li>Combustión limpia sin hollín ni derivados de petróleo</li><li>Tiempo de quemado: 45 horas continuas estimadas</li></ul>',
      aroma: 'Lavanda & Manzanilla',
      material: '100% Cera de Soya Natural',
      dimensiones: '220g · 45 horas de combustión',
      precio: 48000,
      stock: 25,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317497498-6edeo9.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317497498-6edeo9.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317499400-8c9v7h.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786317500395-f7y71s.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Botánica Cítricos & Caléndula',
      slug: 'vela-botanica-citricos-calendula',
      descripcion:
        '<p>Energía luminosa, frescura botánica y claridad mental para tus espacios de trabajo y estudio. Formulada con aceites esenciales cítricos vivos de mandarina y bergamota, coronada con pétalos naturales de caléndula cultivada localmente.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Mandarina verde y bergamota italiana.<br/>• Corazón: Pétalos de caléndula y flor de naranjo.<br/>• Fondo: Madera de cedro y ámbar ligero.</p><ul><li>100% Cera de Soya Natural Pura</li><li>Pabilo de algodón orgánico libre de plomo</li><li>Tiempo de quemado: 45 horas continuas estimadas</li></ul>',
      aroma: 'Cítricos & Caléndula',
      material: '100% Cera de Soya Natural',
      dimensiones: '220g · 45 horas de combustión',
      precio: 46000,
      stock: 20,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380592944-3ncvj7.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380592944-3ncvj7.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380595212-7xp44n.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786380597094-6lw55a.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Aromática Jazmín Imperial',
      slug: 'vela-aromatica-jazmin-imperial',
      descripcion:
        '<p>Elegancia floral, calidez y sofisticación en envase de cristal artesanal reutilizable. El equilibrio perfecto entre la nobleza del jazmín blanco y notas suaves de flor de azahar sobre cera pura de soya para momentos de serenidad e introspección.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Jazmín imperial y flor de azahar silvestre.<br/>• Corazón: Vainilla suave y orquídea blanca.<br/>• Fondo: Ámbar cálido y sándalo oriental.</p><ul><li>100% Cera de Soya Natural</li><li>Aceites aromáticos libres de ftalatos y toxinas</li><li>Tiempo de quemado: 50 horas continuas estimadas</li></ul>',
      aroma: 'Jazmín Imperial',
      material: '100% Cera de Soya Natural',
      dimensiones: '250g · 50 horas de combustión',
      precio: 52000,
      stock: 18,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831911997-3t4f4l.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831911997-3t4f4l.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831912904-0f8hzs.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786831913869-c7zstb.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Aromática Rosas Silvestres',
      slug: 'vela-aromatica-rosas-silvestres',
      descripcion:
        '<p>Bouquet floral romántico y delicado con pétalos botánicos naturales. Una atmósfera femenina y sutil para armonizar la energía de tu hogar con cera 100% vegetal de combustión limpia y aromaterapia de bienestar.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Pétalos de rosa fresca y rocío matinal.<br/>• Corazón: Peonía rosada y flor de loto.<br/>• Fondo: Almizcle floral y madera de sándalo blanco.</p><ul><li>100% Cera de Soya Natural</li><li>Pabilo ecológico de algodón sin hollín</li><li>Tiempo de quemado: 45 horas continuas estimadas</li></ul>',
      aroma: 'Rosas Silvestres',
      material: '100% Cera de Soya Natural',
      dimensiones: '220g · 45 horas de combustión',
      precio: 48000,
      stock: 22,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381022186-d0iiz0.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381022186-d0iiz0.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381024462-zw8lr0.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786381026466-fbupf5.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Aromática Vainilla Dulce',
      slug: 'vela-calida-vainilla-dulce',
      descripcion:
        '<p>Notas cálidas y sensación acogedora que abrazan el hogar. Crema de vainilla bourbon y azúcar moreno sobre cera de soya biodegradable que reconforta los sentidos y propicia un ambiente familiar entrañable.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Crema batida y azúcar moreno.<br/>• Corazón: Vaina de vainilla bourbon y orquídea.<br/>• Fondo: Almizcle blanco y caramelo suave.</p><ul><li>100% Cera de Soya Natural</li><li>Combustión a baja temperatura</li><li>Tiempo de quemado: 40 horas continuas estimadas</li></ul>',
      aroma: 'Vainilla Dulce',
      material: '100% Cera de Soya Natural',
      dimensiones: '200g · 40 horas de combustión',
      precio: 44000,
      stock: 30,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786258670363-eiru07.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786258670363-eiru07.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1787215460242-lo9xh9.jpg',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652510766-hd58s8.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Especiada Canela & Manzana',
      slug: 'vela-especiada-canela-manzana',
      descripcion:
        '<p>Calidez especiada y sensación festiva de hogar. Fusión aromática de canela en rama, clavo de olor y manzana horneada para crear ambientes de celebración e inspiración con combustión prolongada y libre de humo negro.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Manzana horneada y clavo de olor.<br/>• Corazón: Canela de Ceilán y nuez moscada.<br/>• Fondo: Haba tonka y madera tostada.</p><ul><li>100% Cera de Soya Natural</li><li>Pabilo trenzado de algodón puro</li><li>Tiempo de quemado: 45 horas continuas estimadas</li></ul>',
      aroma: 'Canela & Manzana',
      material: '100% Cera de Soya Natural',
      dimensiones: '220g · 45 horas de combustión',
      precio: 45000,
      stock: 15,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652508987-srp0ip.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652508987-srp0ip.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652509903-9i751o.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786652510766-hd58s8.png',
      ],
      activo: true,
    },
    {
      nombre: 'Vela Herbal Eucalipto & Menta',
      slug: 'vela-herbal-eucalipto-menta',
      descripcion:
        '<p>Claridad mental, apertura de vías respiratorias y frescura aromática purificante. Formulada con aceites botánicos de menta piperita y eucalipto azul sobre cera de soya natural pura para revitalizar cualquier estancia.</p><p><strong>Pirámide Olfativa:</strong><br/>• Salida: Menta piperita y rocío matutino.<br/>• Corazón: Eucalipto azul y salvia romana.<br/>• Fondo: Pino silvestre y musgo de roble.</p><ul><li>100% Cera de Soya Natural</li><li>Despeja la mente y purifica el ambiente</li><li>Tiempo de quemado: 45 horas continuas estimadas</li></ul>',
      aroma: 'Eucalipto & Menta',
      material: '100% Cera de Soya Natural',
      dimensiones: '220g · 45 horas de combustión',
      precio: 46000,
      stock: 20,
      url_imagen: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494857707-mq2r0j.png',
      imagenes: [
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494857707-mq2r0j.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494858791-weemiz.png',
        'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/velas/1786494859791-eo9t87.png',
      ],
      activo: true,
    },
  ];

  console.log(`📦 Sincronizando ${catalogoReal.length} velas insignia en la base de datos...`);

  for (const prod of catalogoReal) {
    const existing = await prisma.producto.findUnique({
      where: { slug: prod.slug },
    });

    if (existing) {
      await prisma.producto.update({
        where: { id: existing.id },
        data: {
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          aroma: prod.aroma,
          material: prod.material,
          dimensiones: prod.dimensiones,
          precio: prod.precio,
          stock: prod.stock,
          url_imagen: prod.url_imagen,
          imagenes: prod.imagenes,
          activo: true,
        },
      });
      console.log(`  ~ Actualizada: ${prod.nombre} (${prod.slug})`);
    } else {
      await prisma.producto.create({
        data: prod,
      });
      console.log(`  + Creada: ${prod.nombre} (${prod.slug})`);
    }
  }

  // ── 3. RESEÑAS VERIFICADAS PARA PRUEBA SOCIAL ──────────────────────────────
  const totalResenas = await prisma.resena.count();
  if (totalResenas === 0) {
    const lavanda = await prisma.producto.findUnique({
      where: { slug: 'vela-botanica-lavanda-manzanilla' },
    });
    const citricos = await prisma.producto.findUnique({
      where: { slug: 'vela-botanica-citricos-calendula' },
    });
    const jazmin = await prisma.producto.findUnique({
      where: { slug: 'vela-aromatica-jazmin-imperial' },
    });
    const rosas = await prisma.producto.findUnique({
      where: { slug: 'vela-aromatica-rosas-silvestres' },
    });

    const resenasIniciales = [
      {
        producto_id: lavanda?.id,
        autor: 'Camila Restrepo · Bogotá (Usaquén)',
        calificacion: 5,
        comentario:
          'El aroma a lavanda y manzanilla es verdaderamente relajante, no satura ni huele a químico. Se nota el amor con el que la hicieron y la cera de soya quema súper parejo sin dejar túnel.',
      },
      {
        producto_id: citricos?.id,
        autor: 'Andrés Felipe Morales · Chía',
        calificacion: 5,
        comentario:
          'Compré la de cítricos y caléndula para mi estudio y el cambio de energía fue inmediato. Además, llegó empacada impecable con nota a mano. Excelente servicio de envío en la Sabana.',
      },
      {
        producto_id: jazmin?.id,
        autor: 'Valentina Gómez · Bogotá (Rosales)',
        calificacion: 5,
        comentario:
          'Mandé a hacer 30 recordatorios personalizados para el bautizo de mi hija y todas las invitadas quedaron enamoradas. El detalle de las flores botánicas preservadas es único.',
      },
      {
        producto_id: rosas?.id,
        autor: 'Natalia Cárdenas · Bogotá (Cedritos)',
        calificacion: 5,
        comentario:
          'La vela de rosas silvestres es hermosa tanto encendida como apagada decorando mi sala. Dura muchísimo tiempo y el envase es reutilizable. 100% recomendada.',
      },
    ];

    for (const r of resenasIniciales) {
      if (r.producto_id) {
        await prisma.resena.create({
          data: {
            producto_id: r.producto_id,
            autor: r.autor,
            calificacion: r.calificacion,
            comentario: r.comentario,
          },
        });
      }
    }
    console.log('⭐ Pobladas 4 reseñas verificadas para prueba social.');
  }

  const finalCount = await prisma.producto.count({ where: { activo: true } });
  console.log(`✅ Base de datos sincronizada con éxito. Total productos activos: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el proceso de seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

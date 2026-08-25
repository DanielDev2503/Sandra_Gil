export interface FAQItem {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: string;
  orden: number;
  activo: boolean;
}

export const FAQ_CATEGORIES = [
  'Todas',
  'Envíos y Entregas',
  'Cuidados de la Vela',
  'Pedidos y Pagos',
  'Aromas y Colecciones',
  'Personalizadas y Eventos',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];

export const INITIAL_FAQS: FAQItem[] = [
  // ── 1. ENVÍOS Y ENTREGAS ─────────────────────────────────────────
  {
    id: 'faq-envios-1',
    pregunta: '¿Hacen envíos en Bogotá y municipios aledaños?',
    respuesta:
      '¡Sí! Realizamos envíos a todas las localidades de Bogotá urbana y a municipios de la sabana como Chía, Cajicá, Cota, Sopó, La Calera, Zipaquirá y Soacha. Cada paquete se envía cuidadosamente embalado y protegido para garantizar que llegue en perfectas condiciones.',
    categoria: 'Envíos y Entregas',
    orden: 1,
    activo: true,
  },
  {
    id: 'faq-envios-2',
    pregunta: '¿Cuánto tiempo tarda en llegar mi pedido?',
    respuesta:
      'Los pedidos estándar se procesan y entregan en un lapso de 1 a 3 días hábiles en Bogotá. Si requieres tu pedido con urgencia para hoy mismo o un horario específico, disponemos de la opción de **Envío Express** sujeta a disponibilidad horaria.',
    categoria: 'Envíos y Entregas',
    orden: 2,
    activo: true,
  },
  {
    id: 'faq-envios-3',
    pregunta: '¿Cómo protegen las velas y flores botánicas durante el transporte?',
    respuesta:
      'Utilizamos un sistema de embalaje multicapa eco-amigable con papel kraft corrugado, burbuja amortiguadora y cajas rígidas reforzadas. Nuestras flores botánicas preservadas van selladas e inmovilizadas para evitar desprendimientos por movimiento.',
    categoria: 'Envíos y Entregas',
    orden: 3,
    activo: true,
  },
  {
    id: 'faq-envios-4',
    pregunta: '¿Puedo recoger mi pedido personalmente en el taller?',
    respuesta:
      'Sí, contamos con punto de entrega coordinado en nuestro taller artesanal en Bogotá. Al realizar tu compra o escribirnos por WhatsApp, indícanos que deseas recogida presencial para agendar tu horario conveniente.',
    categoria: 'Envíos y Entregas',
    orden: 4,
    activo: true,
  },

  // ── 2. CUIDADOS DE LA VELA ───────────────────────────────────────
  {
    id: 'faq-cuidados-1',
    pregunta: '¿Cómo debo encender mi vela la primera vez para evitar el efecto túnel?',
    respuesta:
      'En el primer encendido, deja que la vela permanezca encendida entre 2 y 3 horas continuas, hasta que toda la capa superior de cera de soya se derrita de extremo a extremo del recipiente (piscina completa). Esto crea la "memoria de quemado" y evitará que se forme un túnel en el centro.',
    categoria: 'Cuidados de la Vela',
    orden: 5,
    activo: true,
  },
  {
    id: 'faq-cuidados-2',
    pregunta: '¿Por qué debo recortar el pabilo antes de cada uso?',
    respuesta:
      'Recomendamos recortar el pabilo de algodón a unos 5 mm (medio centímetro) antes de volver a encender la vela. Esto garantiza una llama limpia, pareja y estable, previene el exceso de humo y prolonga notablemente la vida útil de la cera.',
    categoria: 'Cuidados de la Vela',
    orden: 6,
    activo: true,
  },
  {
    id: 'faq-cuidados-3',
    pregunta: '¿Qué precauciones debo tener con las flores preservadas e incrustaciones?',
    respuesta:
      'Nuestras flores y cristales están dispuestos cuidadosamente en la superficie. A medida que la cera se consume, si alguna flor flotante se acerca demasiado a la llama, te sugerimos retirarla suavemente con unas pinzas o empujarla hacia el borde del envase para mantener la llama impecable.',
    categoria: 'Cuidados de la Vela',
    orden: 7,
    activo: true,
  },
  {
    id: 'faq-cuidados-4',
    pregunta: '¿Por qué la cera de soya queda con textura rugosa después de apagarse?',
    respuesta:
      'La textura cristalizada o ligeramente irregular después de enfriarse es el sello inconfundible de pureza de la cera de soya 100% vegetal sin mezclas de parafina ni aditivos químicos. Es una característica completamente natural que no afecta en nada su aroma ni desempeño.',
    categoria: 'Cuidados de la Vela',
    orden: 8,
    activo: true,
  },
  {
    id: 'faq-cuidados-5',
    pregunta: '¿Cómo puedo limpiar y reutilizar el envase cuando se termine la vela?',
    respuesta:
      'Nuestros envases de vidrio y cerámica están diseñados para una segunda vida. Cuando quede aproximadamente 1 cm de cera, retira los residuos con agua tibia y jabón suave. Puedes reutilizar el recipiente como joyero, maceta para suculentas, portalápices o elemento decorativo.',
    categoria: 'Cuidados de la Vela',
    orden: 9,
    activo: true,
  },

  // ── 3. PEDIDOS Y PAGOS ───────────────────────────────────────────
  {
    id: 'faq-pagos-1',
    pregunta: '¿Qué métodos de pago aceptan en la tienda?',
    respuesta:
      'Contamos con pasarela de pagos segura **Wompi** que procesa tarjetas de crédito (Visa, Mastercard, American Express), tarjetas débito, transferencias bancarias vía PSE, Nequi, Daviplata y corresponsales Bancolombia.',
    categoria: 'Pedidos y Pagos',
    orden: 10,
    activo: true,
  },
  {
    id: 'faq-pagos-2',
    pregunta: '¿Puedo enviar una vela como regalo con una tarjeta dedicatoria personalizada?',
    respuesta:
      '¡Claro que sí! Nos encanta ser cómplices de momentos especiales. En las notas de tu pedido o escribiéndonos directamente por WhatsApp, déjanos tu mensaje y lo escribiremos a mano en una delicada tarjeta de regalo botánica sin costo adicional.',
    categoria: 'Pedidos y Pagos',
    orden: 11,
    activo: true,
  },
  {
    id: 'faq-pagos-3',
    pregunta: '¿Cómo sé si mi pedido fue confirmado con éxito?',
    respuesta:
      'Tan pronto se aprueba tu pago, recibirás un correo electrónico de confirmación con el resumen de tu compra, número de pedido y detalles de entrega. Además, nuestro equipo te mantendrá informado vía WhatsApp sobre el estado del despacho.',
    categoria: 'Pedidos y Pagos',
    orden: 12,
    activo: true,
  },

  // ── 4. AROMAS Y COLECCIONES ──────────────────────────────────────
  {
    id: 'faq-aromas-1',
    pregunta: '¿Qué hace diferente a una vela de soya frente a una vela convencional?',
    respuesta:
      'La cera de soya es de origen 100% vegetal, renovable y no tóxica. Quema a menor temperatura (lo que hace que la vela dure hasta un 50% más tiempo) y difunde los aceites esenciales de forma gradual y pura, sin emitir hollín de hidrocarburos ni sustancias nocivas.',
    categoria: 'Aromas y Colecciones',
    orden: 13,
    activo: true,
  },
  {
    id: 'faq-aromas-2',
    pregunta: '¿Qué tipo de fragancias y esencias utilizan en Sandra Gil?',
    respuesta:
      'Utilizamos formulaciones exclusivas que combinan aceites esenciales puros y esencias aromáticas botánicas de grado cosmético libres de ftalatos y parabenos. Cada fragancia está diseñada con pirámide olfativa estructurada (notas de salida, corazón y fondo).',
    categoria: 'Aromas y Colecciones',
    orden: 14,
    activo: true,
  },
  {
    id: 'faq-aromas-3',
    pregunta: '¿Ofrecen talleres o workshops presenciales de creación de velas?',
    respuesta:
      'Sí, periódicamente realizamos el **Taller Didáctico de Creación de Velas y Aromaterapia** en Bogotá. Es una experiencia sensorial guiada donde aprenderás formulación botánica, vertido artesanal y crearás tu propia vela personalizada. Escríbenos por WhatsApp para consultar las próximas fechas.',
    categoria: 'Aromas y Colecciones',
    orden: 15,
    activo: true,
  },

  // ── 5. PERSONALIZADAS Y EVENTOS ─────────────────────────────────
  {
    id: 'faq-personalizadas-1',
    pregunta: '¿Elaboran recordatorios y detalles para bodas, bautizos y eventos corporativos?',
    respuesta:
      'Sí, diseñamos recuerdos personalizados para todo tipo de celebraciones y regalos corporativos: personalización de etiquetas con tu nombre o logo, selección de flores preservadas temáticas, aromas a elección y empaques de lujo con precios especiales por volumen.',
    categoria: 'Personalizadas y Eventos',
    orden: 16,
    activo: true,
  },
  {
    id: 'faq-personalizadas-2',
    pregunta: '¿Con cuánto tiempo de antelación debo solicitar un pedido personalizado o por volumen?',
    respuesta:
      'Para pedidos personalizados individuales recomendamos solicitar con 3 a 5 días de anticipación. Para eventos corporativos o recordatorios de más de 20 unidades, recomendamos contactarnos con 2 a 3 semanas de anticipación para garantizar disponibilidad de insumos y flores.',
    categoria: 'Personalizadas y Eventos',
    orden: 17,
    activo: true,
  },
];

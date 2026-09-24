export interface AromaProfile {
  name: string;
  mood: string;
  tag: string;
  top: string;
  heart: string;
  base: string;
  description: string;
  beneficios?: string;
  slug?: string;
}

/**
 * Catálogo oficial unificado de los 28 aromas activos en la base de datos de Sandra Gil Velas Artesanales.
 * Fuente única de verdad sincronizada con la tabla "Aroma" de PostgreSQL / Supabase.
 */
export const OFFICIAL_AROMAS = [
  'algodón',
  'arándano',
  'árbol de la montaña',
  'bebé',
  'brisa del océano',
  'Canela & Manzana',
  'cereza',
  'Cítricos & Caléndula',
  'coco',
  'Eucalipto & Menta',
  'flores de acaí',
  'Jamaica',
  'jazmín',
  'Jazmín Imperial',
  'lavanda',
  'Lavanda & Manzanilla',
  'limón',
  'mandarina',
  'mango biche',
  'maracumango',
  'miel',
  'naranja bergamota',
  'pino canadiense',
  'Rosas Silvestres',
  'tulipán',
  'uvas y flores',
  'Vainilla Dulce',
  'vainilla francesa',
] as const;

export type OfficialAroma = (typeof OFFICIAL_AROMAS)[number];

export const AROMAS = OFFICIAL_AROMAS;

export const DEFAULT_BOTANICAL_AROMAS: string[] = [...OFFICIAL_AROMAS];

export const KNOWN_AROMAS: Record<string, Omit<AromaProfile, 'name'>> = {
  // ── 1. ALGODÓN ──
  'algodón': {
    mood: 'Puro, fresco y reconfortante',
    tag: 'Fresco / Limpio',
    top: 'Flor de algodón, flor de lino',
    heart: 'Lirios blancos, jazmín suave',
    base: 'Almizcle blanco, sándalo suave',
    description: 'Sensación de sábanas limpias y calma pura que envuelve cualquier estancia con suavidad y serenidad.',
    beneficios: 'Favorece un ambiente despejado, limpio y relajante para el descanso.',
    slug: 'algodon',
  },

  // ── 2. ARÁNDANO ──
  'arándano': {
    mood: 'Dulce, jugoso y energizante',
    tag: 'Frutal',
    top: 'Arándano silvestre, frutos rojos',
    heart: 'Zarzamora, flor de grosellero',
    base: 'Vainilla suave, azúcar moreno',
    description: 'Aroma silvestre y vivaz con notas intensas de bayas maduras que llenan el espacio de dulzura natural.',
    beneficios: 'Estimula la creatividad y renueva la vitalidad en tus espacios.',
    slug: 'arandano',
  },

  // ── 3. ÁRBOL DE LA MONTAÑA ──
  'árbol de la montaña': {
    mood: 'Balsámico, amaderado y purificante',
    tag: 'Amaderado',
    top: 'Agujas de pino, brisa de montaña',
    heart: 'Ciprés andino, resina de abeto',
    base: 'Madera de cedro, musgo de bosque',
    description: 'Un viaje sensorial a los bosques andinos que aporta serenidad, conexión con la naturaleza y aire puro.',
    beneficios: 'Purifica el ambiente, descongestiona y facilita la conexión interior.',
    slug: 'arbol-de-la-montana',
  },

  // ── 4. BEBÉ ──
  'bebé': {
    mood: 'Tierno, suave y delicado',
    tag: 'Polvoso / Suave',
    top: 'Flor de azahar, talco suave',
    heart: 'Lavanda tierna, manzanilla',
    base: 'Vainilla sutil, almizcle blanco',
    description: 'Fragancia entrañable de ternura infantil, suavidad acogedora y paz reconfortante para el hogar.',
    beneficios: 'Induce estados de paz, calma la inquietud y favorece el sueño tranquilo.',
    slug: 'bebe',
  },

  // ── 5. BRISA DEL OCÉANO ──
  'brisa del océano': {
    mood: 'Fresco, marino y revitalizante',
    tag: 'Acuático',
    top: 'Sal marina, ozono fresco',
    heart: 'Algas marinas, jazmín acuático',
    base: 'Madera flotante, ámbar gris',
    description: 'Notas marinas que evocan la brisa matutina frente al mar, despejando la mente con energía revitalizante.',
    beneficios: 'Despeja la fatiga mental, aporta frescor y renueva el aire ambiental.',
    slug: 'brisa-del-oceano',
  },

  // ── 6. CANELA & MANZANA ──
  'Canela & Manzana': {
    mood: 'Acogedor, festivo y estimulante',
    tag: 'Especiado',
    top: 'Manzana horneada, clavo de olor',
    heart: 'Canela de ceilán, nuez moscada',
    base: 'Haba tonka, madera tostada',
    description: 'Notas cálidas y especiadas que evocan momentos entrañables alrededor del calor de hogar y festividades.',
    beneficios: 'Aumenta la sensación de calidez, confort hogareño y hospitalidad.',
    slug: 'canela-y-manzana',
  },

  // ── 7. CEREZA ──
  'cereza': {
    mood: 'Dulce, sensual y vibrante',
    tag: 'Frutal Goloso',
    top: 'Cereza negra, licor de ciruela',
    heart: 'Flor de cerezo, almendra dulce',
    base: 'Haba tonka, vainilla caramelizada',
    description: 'Fragancia vibrante y golosa que seduce los sentidos con la intensidad cautivadora de cerezas maduras.',
    beneficios: 'Aporta optimismo, vitalidad y un toque festivo y alegre a cualquier rincón.',
    slug: 'cereza',
  },

  // ── 8. CÍTRICOS & CALÉNDULA ──
  'Cítricos & Caléndula': {
    mood: 'Revitalizante, fresco y alegre',
    tag: 'Cítrico',
    top: 'Mandarina verde, bergamota italiana',
    heart: 'Pétalos de caléndula, flor de naranjo',
    base: 'Madera de cedro, ámbar ligero',
    description: 'Notas cítricas brillantes que llenan el ambiente de energía positiva, vitalidad y frescura botánica.',
    beneficios: 'Eleva el ánimo, combate el desgano y refresca espacios de trabajo.',
    slug: 'citricos-y-calendula',
  },

  // ── 9. COCO ──
  'coco': {
    mood: 'Exótico, cálido y envolvente',
    tag: 'Tropical',
    top: 'Agua de coco, ralladura fresca',
    heart: 'Crema de coco, flor de tiaré',
    base: 'Vainilla dulce, azúcar de caña',
    description: 'Evoca costas paradisíacas con su cremosidad tropical, calidez caribeña y descanso absoluto.',
    beneficios: 'Genera ambientes de relajación veraniega, bienestar y desconexión.',
    slug: 'coco',
  },

  // ── 10. EUCALIPTO & MENTA ──
  'Eucalipto & Menta': {
    mood: 'Despejado, balsámico y renovador',
    tag: 'Fresco / Balsámico',
    top: 'Menta piperita, rocío matutino',
    heart: 'Eucalipto azul, salvia romana',
    base: 'Pino silvestre, musgo de roble',
    description: 'Sensación revitalizante y refrescante que abre las vías respiratorias y despeja los pensamientos.',
    beneficios: 'Facilita la respiración libre, alivia el cansancio y aumenta la concentración.',
    slug: 'eucalipto-y-menta',
  },

  // ── 11. FLORES DE ACAÍ ──
  'flores de acaí': {
    mood: 'Floral exótico, frutal y radiante',
    tag: 'Floral Frutal',
    top: 'Baya de acaí, maracuyá silvestre',
    heart: 'Orquídea amazónica, jazmín silvestre',
    base: 'Madera de bambú, almizcle blanco',
    description: 'Armonía botánica vibrante inspirada en la biodiversidad tropical, transmitiendo optimismo y luz.',
    beneficios: 'Armoniza la energía del espacio y despierta la creatividad.',
    slug: 'flores-de-acai',
  },

  // ── 12. JAMAICA ──
  'Jamaica': {
    mood: 'Refrescante, floral ácido y alegre',
    tag: 'Floral Frutal',
    top: 'Flor de jamaica fresca, frambuesa',
    heart: 'Pétalos de hibisco, rosa mosqueta',
    base: 'Semilla de cilantro, caña de azúcar',
    description: 'Inspirada en el hibisco andino, con un balance cítrico y floral que despierta la vitalidad de tus espacios.',
    beneficios: 'Estimula la conversación, despierta los sentidos y purifica el ambiente.',
    slug: 'jamaica',
  },

  // ── 13. JAZMÍN ──
  'jazmín': {
    mood: 'Intenso, floral y seductor',
    tag: 'Floral',
    top: 'Jazmín de noche, azahar silvestre',
    heart: 'Gardenia blanca, flor de loto',
    base: 'Almizcle suave, sándalo',
    description: 'La elegancia atemporal del jazmín blanco en su máxima expresión de nobleza floral y tranquilidad.',
    beneficios: 'Equilibra las emociones, disipa la tensión nerviosa y crea atmósferas románticas.',
    slug: 'jazmin',
  },

  // ── 14. JAZMÍN IMPERIAL ──
  'Jazmín Imperial': {
    mood: 'Cautivador, místico y armonioso',
    tag: 'Floral Cálido',
    top: 'Jazmín imperial, flor de azahar',
    heart: 'Vainilla suave, orquídea nocturna',
    base: 'Ámbar cálido, haba tonka',
    description: 'Equilibrio perfecto entre la intensidad floral del jazmín imperial y la sutileza de la flor de azahar.',
    beneficios: 'Favorece la introspección, la paz interior y un ambiente de lujo sereno.',
    slug: 'jazmin-imperial',
  },

  // ── 15. LAVANDA ──
  'lavanda': {
    mood: 'Calmante, sereno y reconfortante',
    tag: 'Aromaterapia',
    top: 'Flores de lavanda francesa',
    heart: 'Salvia sclarea, tomillo dulce',
    base: 'Cedro aromático, ámbar ligero',
    description: 'El clásico floral calmante por excelencia que invita a la serenidad, la meditación y el buen descanso.',
    beneficios: 'Reduce el estrés, aquieta la mente y promueve un sueño reparador.',
    slug: 'lavanda',
  },

  // ── 16. LAVANDA & MANZANILLA ──
  'Lavanda & Manzanilla': {
    mood: 'Relajante, calmante y reparador',
    tag: 'Aromaterapia',
    top: 'Lavanda silvestre, flor de manzanilla',
    heart: 'Hierbas dulces, azahar',
    base: 'Maderas suaves, vainilla sutil',
    description: 'Mezcla botánica relajante que calma los sentidos, disipa el estrés e invita a un descanso profundo.',
    beneficios: 'Calma el sistema nervioso y transforma el dormitorio en un santuario de descanso.',
    slug: 'lavanda-y-manzanilla',
  },

  // ── 17. LIMÓN ──
  'limón': {
    mood: 'Cítrico, purificante y chispeante',
    tag: 'Cítrico',
    top: 'Cáscara de limón eureka, lima verde',
    heart: 'Hierba luisa, flor de azahar',
    base: 'Almizcle blanco, maderas claras',
    description: 'Energía pura y limpieza cristalina que neutraliza olores y renueva el aire con vitalidad efervescente.',
    beneficios: 'Aumenta el enfoque mental, limpia el aire y revitaliza el estado de ánimo.',
    slug: 'limon',
  },

  // ── 18. MANDARINA ──
  'mandarina': {
    mood: 'Alegre, jugoso y optimista',
    tag: 'Cítrico',
    top: 'Mandarina clementina, naranja dulce',
    heart: 'Flor de limonero, nerolí',
    base: 'Ámbar sutil, cedro blanco',
    description: 'Dulce frescura cítrica que promueve la alegría, alivia la tensión cotidiana y llena de calidez el hogar.',
    beneficios: 'Disipa la pesadez mental e inspira sensaciones de alegría y cercanía.',
    slug: 'mandarina',
  },

  // ── 19. MANGO BICHE ──
  'mango biche': {
    mood: 'Chispeante, exótico y refrescante',
    tag: 'Frutal Tropical',
    top: 'Mango verde colombiano, lima ácida',
    heart: 'Pulpa de carambolo, piña silvestre',
    base: 'Toque de sal marina, bambú',
    description: 'Homenaje a la fruta tropical verde de nuestra tierra, con una explosión ácida y jugosa inconfundible.',
    beneficios: 'Despierta el entusiasmo, estimula la energía y alegra las tardes en casa.',
    slug: 'mango-biche',
  },

  // ── 20. MARACUMANGO ──
  'maracumango': {
    mood: 'Tropical, festivo y embriagador',
    tag: 'Frutal Tropical',
    top: 'Maracuyá jugoso, mango maduro',
    heart: 'Papaya dorada, flor de tiaré',
    base: 'Caña de azúcar, vainilla suave',
    description: 'Fusión deliciosa de dos de las frutas más amadas del trópico colombiano, dulce, aromática e irresistible.',
    beneficios: 'Lleva la frescura exótica del trópico a cada rincón, creando un ambiente acogedor.',
    slug: 'maracumango',
  },

  // ── 21. MIEL ──
  'miel': {
    mood: 'Dorado, nutritivo y reconfortante',
    tag: 'Gourmet / Dulce',
    top: 'Panal de miel silvestre, néctar de flores',
    heart: 'Polen botánico, cera de abejas pura',
    base: 'Vainilla cremosa, benjuí cálido',
    description: 'Dulzura balsámica y dorada que abraza el ambiente con notas melosas naturales y reconfortantes.',
    beneficios: 'Aporta una sensación de cobijo, nutrición emocional y relajación profunda.',
    slug: 'miel',
  },

  // ── 22. NARANJA BERGAMOTA ──
  'naranja bergamota': {
    mood: 'Elegante, equilibrado y revitalizante',
    tag: 'Cítrico Aromático',
    top: 'Bergamota de Calabria, naranja dulce',
    heart: 'Flor de azahar, cardamomo suave',
    base: 'Vetiver, almizcle blanco',
    description: 'Sofisticada mezcla cítrica que combina la nobleza de la bergamota con la alegría luminosa de la naranja.',
    beneficios: 'Eleva la vibración energética del hogar proporcionando serenidad y balance.',
    slug: 'naranja-bergamota',
  },

  // ── 23. PINO CANADIENSE ──
  'pino canadiense': {
    mood: 'Invernal, balsámico y solemne',
    tag: 'Bosque / Pino',
    top: 'Agujas de pino blanco, aire frío',
    heart: 'Resina de abeto balsámico, piñas de pino',
    base: 'Madera de cedro, tierra húmeda',
    description: 'Aroma fresco y campestre que evoca la majestuosidad de los bosques boreales y el encanto natural.',
    beneficios: 'Conecta con la estabilidad de la tierra, despeja la respiración y purifica.',
    slug: 'pino-canadiense',
  },

  // ── 24. ROSAS SILVESTRES ──
  'Rosas Silvestres': {
    mood: 'Romántico, elegante y seductor',
    tag: 'Floral',
    top: 'Pétalos de rosa fresca, rocío matinal',
    heart: 'Peonía rosada, flor de loto',
    base: 'Almizcle floral, sándalo blanco',
    description: 'Un bouquet floral sublime que evoca la frescura de un jardín de rosas silvestres recién florecido.',
    beneficios: 'Fomenta el amor propio, abre el centro del corazón y suaviza las tensiones.',
    slug: 'rosas-silvestres',
  },

  // ── 25. TULIPÁN ──
  'tulipán': {
    mood: 'Primaveral, fresco y aterciopelado',
    tag: 'Floral Verde',
    top: 'Hojas verdes cortadas, tallos de tulipán',
    heart: 'Pétalos de tulipán holandés, jacinto',
    base: 'Almizcle floral, madera clara',
    description: 'Elegancia floral fresca que transmite la sensación de un campo de flores recién abiertas al amanecer.',
    beneficios: 'Inspira renovación, orden mental y una placentera ligereza en el ambiente.',
    slug: 'tulipan',
  },

  // ── 26. UVAS Y FLORES ──
  'uvas y flores': {
    mood: 'Frutal aterciopelado, festivo y sofisticado',
    tag: 'Frutal Floral',
    top: 'Uva isabella madura, moras silvestres',
    heart: 'Violetas del bosque, rosas rojas',
    base: 'Mosto dulce, sándalo sutil',
    description: 'Intensas notas de uva morada combinadas con acordes florales románticos para un ambiente sofisticado.',
    beneficios: 'Ideal para cenas y momentos especiales, aportando elegancia y calidez festiva.',
    slug: 'uvas-y-flores',
  },

  // ── 27. VAINILLA DULCE ──
  'Vainilla Dulce': {
    mood: 'Cálido, reconfortante y dulce',
    tag: 'Gourmet',
    top: 'Crema batida, azúcar moreno',
    heart: 'Vaina de vainilla bourbon, orquídea',
    base: 'Almizcle blanco, caramelo suave',
    description: 'Aroma dulce y envolvente que transforma cualquier estancia en un espacio cálido y acogedor.',
    beneficios: 'Evoca sensaciones de seguridad, dulzura y tranquilidad hogareña.',
    slug: 'vainilla-dulce',
  },

  // ── 28. VAINILLA FRANCESA ──
  'vainilla francesa': {
    mood: 'Cremoso, tostado y clásico',
    tag: 'Gourmet',
    top: 'Crema pastelera, vaina de vainilla',
    heart: 'Caramelo tostado, almendra dulce',
    base: 'Haba tonka, ámbar cálido',
    description: 'La versión más cremosa y clásica de la vainilla, rica en matices dulces, tostados y reconfortantes.',
    beneficios: 'Alivia la ansiedad, genera bienestar sensorial y embelesa los sentidos.',
    slug: 'vainilla-francesa',
  },

  // ── ALIAS Y SINÓNIMOS HISTÓRICOS PARA COMPATIBILIDAD ──
  'Canela & Especias': {
    mood: 'Acogedor, festivo y estimulante',
    tag: 'Especiado',
    top: 'Manzana horneada, clavo de olor',
    heart: 'Canela de ceilán, nuez moscada',
    base: 'Haba tonka, madera tostada',
    description: 'Notas cálidas y especiadas que evocan momentos entrañables alrededor del calor de hogar.',
    beneficios: 'Aumenta la sensación de calidez, confort hogareño y hospitalidad.',
    slug: 'canela-y-manzana',
  },
  'Menta & Eucalipto': {
    mood: 'Despejado, balsámico y renovador',
    tag: 'Fresco / Balsámico',
    top: 'Menta piperita, rocío matutino',
    heart: 'Eucalipto azul, salvia romana',
    base: 'Pino silvestre, musgo de roble',
    description: 'Sensación revitalizante y refrescante que abre las vías respiratorias y despeja los pensamientos.',
    beneficios: 'Facilita la respiración libre, alivia el cansancio y aumenta la concentración.',
    slug: 'eucalipto-y-menta',
  },
  'Rosas & Peonías': {
    mood: 'Romántico, elegante y seductor',
    tag: 'Floral',
    top: 'Pétalos de rosa fresca, rocío matinal',
    heart: 'Peonía rosada, flor de loto',
    base: 'Almizcle floral, sándalo blanco',
    description: 'Un bouquet floral sublime que evoca la frescura de un jardín primaveral recién florecido.',
    beneficios: 'Fomenta el amor propio, abre el centro del corazón y suaviza las tensiones.',
    slug: 'rosas-silvestres',
  },
  'Jazmín & Vainilla': {
    mood: 'Cautivador, místico y armonioso',
    tag: 'Floral Cálido',
    top: 'Jazmín imperial, flor de azahar',
    heart: 'Vainilla suave, orquídea nocturna',
    base: 'Ámbar cálido, haba tonka',
    description: 'Equilibrio perfecto entre la intensidad floral del jazmín imperial y la sutileza de la flor de azahar.',
    beneficios: 'Favorece la introspección, la paz interior y un ambiente de lujo sereno.',
    slug: 'jazmin-imperial',
  },
  'Café Tostado & Caramelo': {
    mood: 'Envolvente, sofisticado y enérgico',
    tag: 'Gourmet',
    top: 'Granos de café arábica recién molidos',
    heart: 'Caramelo salado, cacao fino',
    base: 'Vainilla ahumada, madera de roble',
    description: 'Rico aroma a café de especialidad con notas acarameladas que deleitan el olfato por horas.',
    beneficios: 'Despierta la concentración, aporta calidez y confort.',
    slug: 'cafe-tostado-y-caramelo',
  },
};

/**
 * Normaliza y busca el perfil olfativo para cualquier nombre de aroma,
 * con coincidencia exacta, coincidencia insensible a mayúsculas y fallback inteligente.
 */
export function getAromaProfile(aromaName: string): AromaProfile {
  const trimmed = (aromaName || '').trim();
  if (!trimmed) {
    return {
      name: 'Aroma Exclusivo',
      mood: 'Natural, armónico y artesanal',
      tag: 'Botánico',
      top: 'Esencias botánicas puras',
      heart: 'Aceites esenciales naturales',
      base: '100% Cera de Soya Natural',
      description: 'Fragancia botánica cuidadosamente formulada para perfumar y armonizar tus espacios.',
      beneficios: 'Aroma limpio, duradero y libre de toxinas.',
      slug: 'aroma-exclusivo',
    };
  }

  // 1. Coincidencia exacta
  if (KNOWN_AROMAS[trimmed]) {
    return {
      name: trimmed,
      ...KNOWN_AROMAS[trimmed],
    };
  }

  // 2. Coincidencia insensible a mayúsculas / minúsculas
  const lower = trimmed.toLowerCase();
  for (const [key, profile] of Object.entries(KNOWN_AROMAS)) {
    if (key.toLowerCase() === lower) {
      return {
        name: trimmed,
        ...profile,
      };
    }
  }

  // 3. Fallback inteligente
  return {
    name: trimmed,
    mood: 'Natural, armónico y artesanal',
    tag: 'Botánico',
    top: 'Esencias botánicas puras',
    heart: 'Aceites esenciales naturales',
    base: '100% Cera de Soya Natural',
    description: `Fragancia botánica artesanal de ${trimmed} formulada para perfumar y armonizar tus espacios.`,
    beneficios: 'Combustión limpia en cera de soya, libre de parafina y toxinas.',
    slug: lower.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  };
}

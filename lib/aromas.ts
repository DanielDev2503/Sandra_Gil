export interface AromaProfile {
  name: string;
  mood: string;
  tag: string;
  top: string;
  heart: string;
  base: string;
  description: string;
}

/**
 * Catálogo oficial de aromas botánicos y exclusivos de Sandra Gil Velas Artesanales
 */
export const OFFICIAL_AROMAS = [
  'Lavanda & Manzanilla',
  'Cítricos & Caléndula',
  'Jazmín Imperial',
  'Rosas Silvestres',
  'Vainilla Dulce',
  'Canela & Manzana',
  'Eucalipto & Menta',
] as const;

export const AROMAS = OFFICIAL_AROMAS;

export const KNOWN_AROMAS: Record<string, Omit<AromaProfile, 'name'>> = {
  // ── 7 AROMAS OFICIALES ──
  'Lavanda & Manzanilla': {
    mood: 'Relajante, calmante y reparador',
    tag: 'Aromaterapia',
    top: 'Lavanda silvestre, flor de manzanilla',
    heart: 'Hierbas dulces, azahar',
    base: 'Maderas suaves, vainilla sutil',
    description: 'Mezcla botánica relajante que calma los sentidos, disipa el estrés e invita a un descanso profundo.',
  },
  'Cítricos & Caléndula': {
    mood: 'Revitalizante, fresco y alegre',
    tag: 'Cítrico',
    top: 'Mandarina verde, bergamota italiana',
    heart: 'Pétalos de caléndula, flor de naranjo',
    base: 'Madera de cedro, ámbar ligero',
    description: 'Notas cítricas brillantes que llenan el ambiente de energía positiva, vitalidad y frescura botánica.',
  },
  'Jazmín Imperial': {
    mood: 'Cautivador, místico y armonioso',
    tag: 'Floral Cálido',
    top: 'Jazmín imperial, flor de azahar',
    heart: 'Vainilla suave, orquídea nocturna',
    base: 'Ámbar cálido, haba tonka',
    description: 'Equilibrio perfecto entre la intensidad floral del jazmín imperial y la sutileza de la flor de azahar.',
  },
  'Rosas Silvestres': {
    mood: 'Romántico, elegante y seductor',
    tag: 'Floral',
    top: 'Pétalos de rosa fresca, rocío matinal',
    heart: 'Peonía rosada, flor de loto',
    base: 'Almizcle floral, sándalo blanco',
    description: 'Un bouquet floral sublime que evoca la frescura de un jardín de rosas silvestres recién florecido.',
  },
  'Vainilla Dulce': {
    mood: 'Cálido, reconfortante y dulce',
    tag: 'Gourmet',
    top: 'Crema batida, azúcar moreno',
    heart: 'Vaina de vainilla bourbon, orquídea',
    base: 'Almizcle blanco, caramelo suave',
    description: 'Aroma dulce y envolvente que transforma cualquier estancia en un espacio cálido y acogedor.',
  },
  'Canela & Manzana': {
    mood: 'Acogedor, festivo y estimulante',
    tag: 'Especiado',
    top: 'Manzana horneada, clavo de olor',
    heart: 'Canela de ceilán, nuez moscada',
    base: 'Haba tonka, madera tostada',
    description: 'Notas cálidas y especiadas que evocan momentos entrañables alrededor del calor de hogar.',
  },
  'Eucalipto & Menta': {
    mood: 'Despejado, balsámico y renovador',
    tag: 'Fresco',
    top: 'Menta piperita, rocío matutino',
    heart: 'Eucalipto azul, salvia romana',
    base: 'Pino silvestre, musgo de roble',
    description: 'Sensación revitalizante y refrescante que abre las vías respiratorias y despeja los pensamientos.',
  },

  // ── ALIAS Y SINÓNIMOS HISTÓRICOS PARA COMPATIBILIDAD CON BD ──
  'Vainilla Francesa': {
    mood: 'Cálido, reconfortante y dulce',
    tag: 'Gourmet',
    top: 'Crema batida, azúcar moreno',
    heart: 'Vaina de vainilla bourbon, orquídea',
    base: 'Almizcle blanco, caramelo suave',
    description: 'Aroma dulce y envolvente que transforma cualquier estancia en un espacio cálido y acogedor.',
  },
  'Rosas & Peonías': {
    mood: 'Romántico, elegante y seductor',
    tag: 'Floral',
    top: 'Pétalos de rosa fresca, rocío matinal',
    heart: 'Peonía rosada, flor de loto',
    base: 'Almizcle floral, sándalo blanco',
    description: 'Un bouquet floral sublime que evoca la frescura de un jardín primaveral recién florecido.',
  },
  'Jazmín & Vainilla': {
    mood: 'Cautivador, místico y armonioso',
    tag: 'Floral Cálido',
    top: 'Jazmín imperial, flor de azahar',
    heart: 'Vainilla suave, orquídea nocturna',
    base: 'Ámbar cálido, haba tonka',
    description: 'Equilibrio perfecto entre la intensidad floral del jazmín y la suavidad dulce de la vainilla.',
  },
  'Canela & Especias': {
    mood: 'Acogedor, festivo y estimulante',
    tag: 'Especiado',
    top: 'Naranja dulce, clavo de olor',
    heart: 'Canela de ceilán, nuez moscada',
    base: 'Haba tonka, madera tostada',
    description: 'Notas cálidas y especiadas que evocan momentos entrañables alrededor de una taza caliente.',
  },
  'Menta & Eucalipto': {
    mood: 'Despejado, balsámico y renovador',
    tag: 'Fresco',
    top: 'Menta piperita, rocío matutino',
    heart: 'Eucalipto azul, salvia romana',
    base: 'Pino silvestre, musgo de roble',
    description: 'Sensación revitalizante y refrescante que abre las vías respiratorias y despeja los pensamientos.',
  },
  'Lavanda & Flores Blancas': {
    mood: 'Sereno, fresco y purificante',
    tag: 'Relajante',
    top: 'Lavanda provenzal, bergamota',
    heart: 'Jazmín sambac, azahar',
    base: 'Cedro blanco, ámbar sutil',
    description: 'Fragancia etérea y limpia que purifica la mente e induce una sensación de serenidad absoluta.',
  },
  'Cítricos Silvestres': {
    mood: 'Revitalizante, fresco y energizante',
    tag: 'Cítrico',
    top: 'Mandarina verde, limón persa',
    heart: 'Hierba luisa, flor de pomelo',
    base: 'Vetiver ligero, almizcle limpio',
    description: 'Explosión botánica fresca que despierta los sentidos y purifica los ambientes del hogar.',
  },
  'Café Tostado & Caramelo': {
    mood: 'Envolvente, sofisticado y enérgico',
    tag: 'Gourmet',
    top: 'Granos de café arábica recién molidos',
    heart: 'Caramelo salado, cacao fino',
    base: 'Vainilla ahumada, madera de roble',
    description: 'Rico aroma a café de especialidad con notas acarameladas que deleitan el olfato por horas.',
  },
};

export const DEFAULT_BOTANICAL_AROMAS: string[] = [
  ...OFFICIAL_AROMAS,
  'Café Tostado & Caramelo',
];

/**
 * Retrieves the olfactory profile for any aroma name, with an intelligent fallback.
 */
export function getAromaProfile(aromaName: string): AromaProfile {
  const trimmed = (aromaName || '').trim();
  const known = KNOWN_AROMAS[trimmed];

  if (known) {
    return {
      name: trimmed,
      ...known,
    };
  }

  // Fallback for custom or newly registered aromas in DB
  return {
    name: trimmed || 'Aroma Exclusivo',
    mood: 'Natural, armónico y artesanal',
    tag: 'Botánico',
    top: 'Esencias florales y botánicas puras',
    heart: 'Aceites esenciales naturales',
    base: 'Cera de soya botánica 100% natural',
    description: 'Fragancia botánica cuidadosamente formulada para perfumar y armonizar tus espacios.',
  };
}

export type ShippingZone = 'URBANO_ZONAL' | 'NACIONAL' | 'ESPECIAL';

export interface City {
  id: string;
  name: string;
  departamento: string;
  zone: ShippingZone;
  transitDaysMin: number;
  transitDaysMax: number;
  transitDaysText: string;
}

export const SHIPPING_ZONES = {
  URBANO_ZONAL: {
    zone: 'URBANO_ZONAL' as const,
    name: 'Urbano y Zonal (Bogotá / Sabana / Aledaños)',
    cost: 0,
    transitDaysMin: 1,
    transitDaysMax: 1,
    transitText: '1 día hábil',
  },
  NACIONAL: {
    zone: 'NACIONAL' as const,
    name: 'Nacional Principal',
    cost: 9000,
    transitDaysMin: 1,
    transitDaysMax: 3,
    transitText: '1 a 3 días hábiles',
  },
  ESPECIAL: {
    zone: 'ESPECIAL' as const,
    name: 'Nacional Especial / Reexpedido',
    cost: 24000,
    transitDaysMin: 3,
    transitDaysMax: 5,
    transitText: '3 a 5 días hábiles',
  },
} as const;

// Unsorted raw city list
const RAW_CITIES: Omit<City, 'transitDaysMin' | 'transitDaysMax' | 'transitDaysText'>[] = [
  // --- ZONA 1: URBANO_ZONAL ($0 COP / 1 día tránsito) ---
  { id: 'bogota', name: 'Bogotá D.C.', departamento: 'Bogotá D.C.', zone: 'URBANO_ZONAL' },
  { id: 'cajica', name: 'Cajicá', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'chia', name: 'Chía', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'cota', name: 'Cota', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'facatativa', name: 'Facatativá', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'funza', name: 'Funza', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'fusagasuga', name: 'Fusagasugá', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'girardot', name: 'Girardot', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'la-calera', name: 'La Calera', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'madrid', name: 'Madrid', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'mosquera', name: 'Mosquera', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'sibate', name: 'Sibaté', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'soacha', name: 'Soacha', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'sopo', name: 'Sopó', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'tabio', name: 'Tabio', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'tenjo', name: 'Tenjo', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'tocancipa', name: 'Tocancipá', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },
  { id: 'tunja', name: 'Tunja', departamento: 'Boyacá', zone: 'URBANO_ZONAL' },
  { id: 'villavicencio', name: 'Villavicencio', departamento: 'Meta', zone: 'URBANO_ZONAL' },
  { id: 'zipaquira', name: 'Zipaquirá', departamento: 'Cundinamarca', zone: 'URBANO_ZONAL' },

  // --- ZONA 2: NACIONAL ($9.000 COP / 1 a 3 días tránsito) ---
  { id: 'armenia', name: 'Armenia', departamento: 'Quindío', zone: 'NACIONAL' },
  { id: 'barrancabermeja', name: 'Barrancabermeja', departamento: 'Santander', zone: 'NACIONAL' },
  { id: 'barranquilla', name: 'Barranquilla', departamento: 'Atlántico', zone: 'NACIONAL' },
  { id: 'bello', name: 'Bello', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'bucaramanga', name: 'Bucaramanga', departamento: 'Santander', zone: 'NACIONAL' },
  { id: 'buga', name: 'Buga', departamento: 'Valle del Cauca', zone: 'NACIONAL' },
  { id: 'cali', name: 'Cali', departamento: 'Valle del Cauca', zone: 'NACIONAL' },
  { id: 'cartagena', name: 'Cartagena', departamento: 'Bolívar', zone: 'NACIONAL' },
  { id: 'cartago', name: 'Cartago', departamento: 'Valle del Cauca', zone: 'NACIONAL' },
  { id: 'cucuta', name: 'Cúcuta', departamento: 'Norte de Santander', zone: 'NACIONAL' },
  { id: 'dosquebradas', name: 'Dosquebradas', departamento: 'Risaralda', zone: 'NACIONAL' },
  { id: 'duitama', name: 'Duitama', departamento: 'Boyacá', zone: 'NACIONAL' },
  { id: 'envigado', name: 'Envigado', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'florencia', name: 'Florencia', departamento: 'Caquetá', zone: 'NACIONAL' },
  { id: 'floridablanca', name: 'Floridablanca', departamento: 'Santander', zone: 'NACIONAL' },
  { id: 'ibague', name: 'Ibagué', departamento: 'Tolima', zone: 'NACIONAL' },
  { id: 'itagui', name: 'Itagüí', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'manizales', name: 'Manizales', departamento: 'Caldas', zone: 'NACIONAL' },
  { id: 'medellin', name: 'Medellín', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'monteria', name: 'Montería', departamento: 'Córdoba', zone: 'NACIONAL' },
  { id: 'neiva', name: 'Neiva', departamento: 'Huila', zone: 'NACIONAL' },
  { id: 'palmira', name: 'Palmira', departamento: 'Valle del Cauca', zone: 'NACIONAL' },
  { id: 'pasto', name: 'Pasto', departamento: 'Nariño', zone: 'NACIONAL' },
  { id: 'pereira', name: 'Pereira', departamento: 'Risaralda', zone: 'NACIONAL' },
  { id: 'popayan', name: 'Popayán', departamento: 'Cauca', zone: 'NACIONAL' },
  { id: 'riohacha', name: 'Riohacha', departamento: 'La Guajira', zone: 'NACIONAL' },
  { id: 'rionegro', name: 'Rionegro', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'sabaneta', name: 'Sabaneta', departamento: 'Antioquia', zone: 'NACIONAL' },
  { id: 'santa-marta', name: 'Santa Marta', departamento: 'Magdalena', zone: 'NACIONAL' },
  { id: 'sincelejo', name: 'Sincelejo', departamento: 'Sucre', zone: 'NACIONAL' },
  { id: 'sogamoso', name: 'Sogamoso', departamento: 'Boyacá', zone: 'NACIONAL' },
  { id: 'tulua', name: 'Tuluá', departamento: 'Valle del Cauca', zone: 'NACIONAL' },
  { id: 'valledupar', name: 'Valledupar', departamento: 'Cesar', zone: 'NACIONAL' },
  { id: 'yopal', name: 'Yopal', departamento: 'Casanare', zone: 'NACIONAL' },

  // --- ZONA 3: ESPECIAL ($24.000 COP / 3 a 5 días tránsito) ---
  { id: 'aguachica', name: 'Aguachica', departamento: 'Cesar', zone: 'ESPECIAL' },
  { id: 'arauca', name: 'Arauca', departamento: 'Arauca', zone: 'ESPECIAL' },
  { id: 'inirida', name: 'Inírida', departamento: 'Guainía', zone: 'ESPECIAL' },
  { id: 'ipiales', name: 'Ipiales', departamento: 'Nariño', zone: 'ESPECIAL' },
  { id: 'leticia', name: 'Leticia', departamento: 'Amazonas', zone: 'ESPECIAL' },
  { id: 'magangue', name: 'Magangué', departamento: 'Bolívar', zone: 'ESPECIAL' },
  { id: 'maicao', name: 'Maicao', departamento: 'La Guajira', zone: 'ESPECIAL' },
  { id: 'mitu', name: 'Mitú', departamento: 'Vaupés', zone: 'ESPECIAL' },
  { id: 'mocoa', name: 'Mocoa', departamento: 'Putumayo', zone: 'ESPECIAL' },
  { id: 'puerto-asis', name: 'Puerto Asís', departamento: 'Putumayo', zone: 'ESPECIAL' },
  { id: 'puerto-carreno', name: 'Puerto Carreño', departamento: 'Vichada', zone: 'ESPECIAL' },
  { id: 'quibdo', name: 'Quibdó', departamento: 'Chocó', zone: 'ESPECIAL' },
  { id: 'san-andres', name: 'San Andrés Isla', departamento: 'San Andrés y Providencia', zone: 'ESPECIAL' },
  { id: 'san-jose-guaviare', name: 'San José del Guaviare', departamento: 'Guaviare', zone: 'ESPECIAL' },
  { id: 'tumaco', name: 'Tumaco', departamento: 'Nariño', zone: 'ESPECIAL' },
  { id: 'turbo', name: 'Turbo', departamento: 'Antioquia', zone: 'ESPECIAL' },
];

// Enriched and alphabetically sorted city list
export const COLOMBIA_CITIES: City[] = RAW_CITIES.map((c) => {
  const zoneInfo = SHIPPING_ZONES[c.zone];
  return {
    ...c,
    transitDaysMin: zoneInfo.transitDaysMin,
    transitDaysMax: zoneInfo.transitDaysMax,
    transitDaysText: zoneInfo.transitText,
  };
}).sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));

/**
 * Find city object by id or name
 */
export function getCityById(cityId: string): City {
  const found = COLOMBIA_CITIES.find((c) => c.id === cityId);
  return found || COLOMBIA_CITIES[0]; // Fallback to Bogotá D.C.
}

/**
 * Calculates shipping cost for a given city ID
 */
export function getShippingCost(cityId: string): number {
  const city = getCityById(cityId);
  return SHIPPING_ZONES[city.zone].cost;
}

/**
 * Returns estimated delivery calculation details
 */
export function getEstimatedDeliveryInfo(city: City) {
  const zoneInfo = SHIPPING_ZONES[city.zone];
  const minTotal = 1 + zoneInfo.transitDaysMin;
  const maxTotal = 2 + zoneInfo.transitDaysMax;
  const totalRangeDays = minTotal === maxTotal ? `${minTotal}` : `${minTotal} a ${maxTotal}`;
  const totalRangeText = `${totalRangeDays} días hábiles`;
  const breakdownText = `1-2 días elaboración + ${zoneInfo.transitText} transporte`;

  return {
    totalRangeDays,
    totalRangeText,
    breakdownText,
    summaryCardText: `🚚 Aliado de envíos: Servientrega | Tiempo total estimado: ${totalRangeText} (${breakdownText})`,
  };
}

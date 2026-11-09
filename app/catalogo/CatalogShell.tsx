'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  Eye,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SkeletonImage from '@/components/SkeletonImage';
import { AROMAS } from '@/lib/aromas';

export type TipoProducto = 'VELA' | 'VELA_ENVASE' | 'VELA_ESCULPIDA' | 'JABON';

export interface Product {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  tipo?: TipoProducto | string | null;
  aroma?: string | null;
  material?: string | null;
  dimensiones?: string | null;
  precio: number | null;
  esBajoPedido: boolean;
  stock: number;
  url_imagen: string | null;
  imagenes?: string[];
  activo: boolean;
  temporada?: string | null;
}

interface CatalogShellProps {
  products: Product[];
}

/**
 * Normaliza una cadena eliminando tildes/diacríticos y convirtiendo a minúsculas.
 */
export const normalize = (str?: string | null): string =>
  str ? str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : '';

/**
 * Slugs conocidos de velas bajo pedido que deben excluirse absolutamente del catálogo general
 */
const BAJO_PEDIDO_SLUGS = [
  'bicicleta-vintage',
  'bouquet-botanico-esculpido',
  'cofre-botanico-esculpido',
  'leon-esculpido-melao',
];

/**
 * Determina si un producto es exclusivamente bajo pedido
 */
export const isBajoPedido = (product: {
  esBajoPedido?: boolean | null;
  slug?: string | null;
}): boolean => {
  if (product.esBajoPedido) return true;
  if (!product.slug) return false;
  return BAJO_PEDIDO_SLUGS.includes(product.slug.toLowerCase().trim());
};

/**
 * Determina si un producto es un jabón artesanal.
 */
export function isSoapProduct(product: {
  tipo?: string | null;
  nombre?: string | null;
  material?: string | null;
  descripcion?: string | null;
}): boolean {
  if (product.tipo) {
    const normTipo = normalize(product.tipo);
    if (normTipo.includes('jabon') || normTipo.includes('soap')) return true;
    if (normTipo.includes('vela') || normTipo.includes('candle')) return false;
  }
  const text = normalize(`${product.nombre || ''} ${product.material || ''} ${product.descripcion || ''}`);
  return text.includes('jabon') || text.includes('soap');
}

/**
 * Determina si un producto es una vela artesanal.
 */
export function isCandleProduct(product: {
  tipo?: string | null;
  nombre?: string | null;
  material?: string | null;
  descripcion?: string | null;
}): boolean {
  if (product.tipo) {
    const normTipo = normalize(product.tipo);
    if (normTipo.includes('vela') || normTipo.includes('candle')) return true;
    if (normTipo.includes('jabon') || normTipo.includes('soap')) return false;
  }
  const text = normalize(`${product.nombre || ''} ${product.material || ''} ${product.descripcion || ''}`);
  if (text.includes('vela') || text.includes('candle')) return true;
  return !isSoapProduct(product);
}

/**
 * Definiciones oficiales de categorías en el catálogo (Venta Directa)
 */
const CATEGORY_DEFINITIONS = [
  { id: 'VELA_ENVASE', label: 'Velas en Envase' },
  { id: 'VELA_ESCULPIDA', label: 'Velas Esculpidas' },
  { id: 'JABON', label: 'Jabones Artesanales' },
] as const;

interface CatalogProductCardProps {
  product: Product;
  priority?: boolean;
}

/**
 * Tarjeta de producto compacta adaptada a cuadrícula de 4 columnas en desktop y 2 columnas en mobile.
 */
export function CatalogProductCard({ product, priority = false }: CatalogProductCardProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Inicializar aroma: buscar coincidencia con los 28 aromas oficiales o usar el aroma registrado
  const initialAroma = useMemo(() => {
    if (product.aroma) {
      const trimmed = product.aroma.trim();
      const match = AROMAS.find((a) => a.toLowerCase() === trimmed.toLowerCase());
      if (match) return match;
      return trimmed;
    }
    return '';
  }, [product.aroma]);

  const [selectedAroma, setSelectedAroma] = useState<string>(initialAroma);

  const soap = isSoapProduct(product);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const displayImage =
    product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : product.url_imagen;

  // Añadir al carrito con el aroma seleccionado
  const handleAddToCart = () => {
    const effectiveAroma = selectedAroma || AROMAS[0];
    if (!selectedAroma) {
      setSelectedAroma(effectiveAroma);
    }
    addToCart(
      {
        ...product,
        url_imagen: displayImage,
        aroma: effectiveAroma,
      },
      1,
      effectiveAroma
    );
  };

  // Compra rápida directa
  const handleBuyNow = () => {
    clearCart();
    const effectiveAroma = selectedAroma || AROMAS[0];
    if (!selectedAroma) {
      setSelectedAroma(effectiveAroma);
    }
    addToCart(
      {
        ...product,
        url_imagen: displayImage,
        aroma: effectiveAroma,
      },
      1,
      effectiveAroma
    );
    router.push('/checkout');
  };

  return (
    <div
      className="group bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* 1. Imagen con relación aspect-[4/3] y badge de tipo/stock */}
        <Link
          href={`/productos/${product.slug}`}
          className="relative aspect-[4/3] w-full block overflow-hidden bg-stone-100 rounded-t-xl"
        >
          <SkeletonImage
            src={displayImage ?? ''}
            alt={product.nombre}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
            priority={priority}
          />

          {/* Badge de estado / tipo */}
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            {isOutOfStock ? (
              <span className="bg-rose-700/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Agotado
              </span>
            ) : isLowStock ? (
              <span className="bg-amber-600/95 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Últimas {product.stock}
              </span>
            ) : (
              <span className="bg-white/95 backdrop-blur-xs text-brand-brown border border-brand-gold/30 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-gold shrink-0" />
                {product.tipo === 'VELA_ENVASE'
                  ? 'Vela en Envase'
                  : product.tipo === 'VELA_ESCULPIDA' || product.tipo === 'VELA'
                    ? 'Vela Esculpida'
                    : soap
                      ? 'Jabón Botánico'
                      : 'Vela Artesanal'}
              </span>
            )}
          </div>

          {/* Chip sutil de temporada */}
          {product.temporada && (
            <span className="absolute top-2 right-2 z-10 pointer-events-none text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-800 shadow-2xs border border-stone-200/50">
              {product.temporada === 'navidad' && 'Navidad'}
              {product.temporada === 'otono' && 'Otoño'}
              {product.temporada === 'amor_amistad' && 'Amor & Amistad'}
              {product.temporada === 'primavera' && 'Primavera'}
            </span>
          )}

          {/* Overlay sutil de hover */}
          {hovered && (
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px] hidden sm:flex items-center justify-center">
              <span className="bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-stone-700" /> Ver Detalles
              </span>
            </div>
          )}
        </Link>

        {/* 2. Cuerpo: Título y Selector de Aroma Inline */}
        <div className="p-2 sm:p-2.5 pb-1">
          <Link href={`/productos/${product.slug}`} className="block group/title">
            <h3 className="font-serif text-xs sm:text-sm font-normal text-stone-900 truncate mb-1 sm:mb-1.5 group-hover/title:text-brand-brown transition duration-200">
              {product.nombre}
            </h3>
          </Link>

          {/* Selector de Aroma Inline Compacto */}
          <div className="mb-1">
            <label htmlFor={`aroma-${product.id}`} className="sr-only">
              Selecciona Aroma
            </label>
            <select
              id={`aroma-${product.id}`}
              value={selectedAroma}
              onChange={(e) => setSelectedAroma(e.target.value)}
              className="w-full text-[10px] sm:text-xs rounded-full border border-stone-200/90 bg-[#FAF8F5] py-1 px-2 text-stone-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors cursor-pointer truncate"
            >
              <option value="" disabled>
                Aroma (28 disp.)...
              </option>
              {initialAroma && !AROMAS.some((a) => a.toLowerCase() === initialAroma.toLowerCase()) && (
                <option value={initialAroma}>{initialAroma}</option>
              )}
              {AROMAS.map((aroma) => (
                <option key={aroma} value={aroma}>
                  {aroma.charAt(0).toUpperCase() + aroma.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Fila de Precio y Botones de Compra */}
      <div className="p-2 sm:p-2.5 pt-0 font-sans">
        <div className="pt-1.5 border-t border-stone-100 flex justify-between items-center mb-1.5">
          <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#B8862D]">
            ${product.precio?.toLocaleString('es-CO')} COP
          </span>

          {isOutOfStock ? (
            <span className="text-[9px] text-red-500 font-bold uppercase tracking-wider">
              Agotado
            </span>
          ) : isLowStock ? (
            <span className="text-[9px] text-amber-600 font-medium uppercase tracking-wider">
              Últimas {product.stock}
            </span>
          ) : (
            <span className="text-[9px] text-stone-500 font-medium uppercase tracking-wider">
              Stock
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`rounded-full py-1 px-2 font-semibold text-[9px] sm:text-xs tracking-wider uppercase bg-white border border-stone-300 text-stone-800 hover:border-[#B8862D] hover:text-[#B8862D] shadow-2xs transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-98 ${isOutOfStock ? 'border-stone-200 text-stone-400 cursor-not-allowed opacity-50' : ''
              }`}
          >
            Añadir
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`rounded-full py-1 px-2 font-semibold text-[9px] sm:text-xs tracking-wider uppercase text-white bg-[#B8862D] hover:bg-[#A37424] active:bg-[#91651D] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-98 ${isOutOfStock ? 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-50' : ''
              }`}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export { CatalogProductCard as ProductCard };

export default function CatalogShell({ products }: CatalogShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ── 1. FILTRADO ESTRICTO EN EL SHELL: EXCLUSIÓN DE BAJO PEDIDO ───────
  const directProducts = useMemo(
    () => products.filter((p) => !isBajoPedido(p)),
    [products]
  );

  // ── 2. RANGOS ABSOLUTOS Y METADATOS EXTRAÍDOS ────────────────────────
  const { minPriceAbsolute, maxPriceAbsolute } = useMemo(() => {
    const validPrices = directProducts
      .map((p) => p.precio)
      .filter((pr): pr is number => typeof pr === 'number' && pr > 0);
    if (validPrices.length === 0) return { minPriceAbsolute: 0, maxPriceAbsolute: 120000 };
    return {
      minPriceAbsolute: Math.floor(Math.min(...validPrices)),
      maxPriceAbsolute: Math.ceil(Math.max(...validPrices)),
    };
  }, [directProducts]);

  // Contadores dinámicos por Categoría / Tipo (Excluyendo bajo pedido)
  const categoryCounts = useMemo(() => {
    let envase = 0;
    let esculpida = 0;
    let jabon = 0;

    for (const p of directProducts) {
      if (p.tipo === 'VELA_ENVASE') {
        envase++;
      } else if (p.tipo === 'JABON' || isSoapProduct(p)) {
        jabon++;
      } else {
        esculpida++;
      }
    }

    return {
      VELA_ENVASE: envase,
      VELA_ESCULPIDA: esculpida,
      JABON: jabon,
    };
  }, [directProducts]);

  // Contadores dinámicos por Temporada (Excluyendo bajo pedido)
  const temporadaCounts = useMemo(() => {
    return {
      TODAS: directProducts.length,
      navidad: directProducts.filter((p) => p.temporada === 'navidad').length,
      otono: directProducts.filter((p) => p.temporada === 'otono').length,
      amor_amistad: directProducts.filter((p) => p.temporada === 'amor_amistad').length,
      primavera: directProducts.filter((p) => p.temporada === 'primavera').length,
    };
  }, [directProducts]);

  // Lista dinámica de aromas únicos con conteo
  const aromaList = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of directProducts) {
      const raw = p.aroma?.trim();
      if (raw) {
        map.set(raw, (map.get(raw) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [directProducts]);

  // Lista dinámica de materiales únicos con conteo
  const materialList = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of directProducts) {
      const raw = p.material?.trim();
      if (raw) {
        map.set(raw, (map.get(raw) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [directProducts]);

  // ── 3. ESTADO DE FILTROS SINCRONIZADO CON URL ───────────────────────
  const rawUrlTipo = searchParams.get('tipo') || '';
  const initialTypes = useMemo(() => {
    if (!rawUrlTipo) return [];
    const valid = ['VELA_ENVASE', 'VELA_ESCULPIDA', 'JABON'];
    return rawUrlTipo
      .split(',')
      .map((t) => t.trim())
      .filter((t) => valid.includes(t));
  }, [rawUrlTipo]);

  const rawUrlTemporada = searchParams.get('temporada') || '';
  const initialTemporada = useMemo(() => {
    const valid = ['navidad', 'otono', 'amor_amistad', 'primavera'];
    if (valid.includes(rawUrlTemporada)) return rawUrlTemporada;
    return 'TODAS';
  }, [rawUrlTemporada]);

  const rawUrlAroma = searchParams.get('aroma') || '';
  const initialAromas = useMemo(() => (rawUrlAroma ? [rawUrlAroma] : []), [rawUrlAroma]);

  const rawUrlMaterial = searchParams.get('material') || '';
  const initialMaterials = useMemo(() => (rawUrlMaterial ? [rawUrlMaterial] : []), [rawUrlMaterial]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [selectedTemporada, setSelectedTemporada] = useState<string>(initialTemporada);
  const [selectedAromas, setSelectedAromas] = useState<string[]>(initialAromas);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(initialMaterials);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPriceAbsolute, maxPriceAbsolute]);
  const [sortOrder, setSortOrder] = useState<
    'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre-asc' | 'nombre-desc'
  >('relevancia');

  // Estado de apertura de acordeones
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categoria: true,
    temporada: true,
    precio: true,
    aroma: true,
    material: false,
    orden: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sincronizar cambios de la URL hacia el estado local
  useEffect(() => {
    if (rawUrlTipo) {
      const valid = ['VELA_ENVASE', 'VELA_ESCULPIDA', 'JABON'];
      const parsed = rawUrlTipo.split(',').filter((t) => valid.includes(t.trim()));
      setSelectedTypes(parsed);
    }
  }, [rawUrlTipo]);

  useEffect(() => {
    if (rawUrlTemporada) {
      const valid = ['navidad', 'otono', 'amor_amistad', 'primavera'];
      if (valid.includes(rawUrlTemporada)) {
        setSelectedTemporada(rawUrlTemporada);
      }
    } else {
      setSelectedTemporada('TODAS');
    }
  }, [rawUrlTemporada]);

  // Sincronizar estado local hacia la URL
  const syncUrl = useCallback(
    (types: string[], temporada: string, aromas: string[], mats: string[]) => {
      const params = new URLSearchParams();
      if (types.length > 0) params.set('tipo', types.join(','));
      if (temporada && temporada !== 'TODAS') params.set('temporada', temporada);
      if (aromas.length > 0) params.set('aroma', aromas[0]);
      if (mats.length > 0) params.set('material', mats[0]);
      const qs = params.toString();
      router.replace(`/catalogo${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router]
  );

  // Controladores de selección de filtros
  const handleToggleType = (typeId: string) => {
    const next = selectedTypes.includes(typeId)
      ? selectedTypes.filter((t) => t !== typeId)
      : [...selectedTypes, typeId];
    setSelectedTypes(next);
    syncUrl(next, selectedTemporada, selectedAromas, selectedMaterials);
  };

  const handleSelectTemporada = (tempId: string) => {
    setSelectedTemporada(tempId);
    syncUrl(selectedTypes, tempId, selectedAromas, selectedMaterials);
  };

  const handleToggleAroma = (aromaName: string) => {
    const next = selectedAromas.includes(aromaName)
      ? selectedAromas.filter((a) => a !== aromaName)
      : [...selectedAromas, aromaName];
    setSelectedAromas(next);
    syncUrl(selectedTypes, selectedTemporada, next, selectedMaterials);
  };

  const handleToggleMaterial = (matName: string) => {
    const next = selectedMaterials.includes(matName)
      ? selectedMaterials.filter((m) => m !== matName)
      : [...selectedMaterials, matName];
    setSelectedMaterials(next);
    syncUrl(selectedTypes, selectedTemporada, selectedAromas, next);
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedTemporada('TODAS');
    setSelectedAromas([]);
    setSelectedMaterials([]);
    setPriceRange([minPriceAbsolute, maxPriceAbsolute]);
    setSortOrder('relevancia');
    setSearchQuery('');
    syncUrl([], 'TODAS', [], []);
  };

  // Bloquear scroll de fondo al abrir el Drawer móvil
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  // Cerrar Drawer con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileFilterOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Contador de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    count += selectedTypes.length;
    if (selectedTemporada !== 'TODAS') count += 1;
    count += selectedAromas.length;
    count += selectedMaterials.length;
    if (priceRange[0] > minPriceAbsolute || priceRange[1] < maxPriceAbsolute) count += 1;
    if (sortOrder !== 'relevancia') count += 1;
    if (searchQuery.trim() !== '') count += 1;
    return count;
  }, [
    selectedTypes,
    selectedTemporada,
    selectedAromas,
    selectedMaterials,
    priceRange,
    minPriceAbsolute,
    maxPriceAbsolute,
    sortOrder,
    searchQuery,
  ]);

  // ── 4. FILTRADO Y ORDENAMIENTO EN TIEMPO REAL ───────────────────────
  const filteredAndSortedProducts = useMemo(() => {
    let result = directProducts.filter((p) => {
      // Búsqueda por texto (nombre, aroma, material)
      if (searchQuery.trim()) {
        const queryNorm = normalize(searchQuery);
        const searchable = normalize(`${p.nombre} ${p.aroma || ''} ${p.material || ''} ${p.descripcion || ''}`);
        if (!searchable.includes(queryNorm)) return false;
      }

      // Filtro por tipo/categoría múltiple
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some((t) => {
          if (t === 'VELA_ENVASE') return p.tipo === 'VELA_ENVASE';
          if (t === 'VELA_ESCULPIDA') {
            return (
              p.tipo === 'VELA_ESCULPIDA' ||
              p.tipo === 'VELA' ||
              (!p.tipo && isCandleProduct(p) && !isSoapProduct(p))
            );
          }
          if (t === 'JABON') {
            return p.tipo === 'JABON' || isSoapProduct(p);
          }
          return false;
        });
        if (!matchesType) return false;
      }

      // Filtro por Temporada (Ortogonal)
      if (selectedTemporada !== 'TODAS') {
        if (p.temporada !== selectedTemporada) {
          return false;
        }
      }

      // Filtro por aromas múltiples
      if (selectedAromas.length > 0) {
        if (!p.aroma) return false;
        const normProdAroma = normalize(p.aroma);
        const matchesAroma = selectedAromas.some((a) => {
          const normTarget = normalize(a);
          return normProdAroma.includes(normTarget) || normTarget.includes(normProdAroma);
        });
        if (!matchesAroma) return false;
      }

      // Filtro por materiales múltiples
      if (selectedMaterials.length > 0) {
        if (!p.material) return false;
        const normProdMat = normalize(p.material);
        const matchesMat = selectedMaterials.some((m) => {
          const normTarget = normalize(m);
          return normProdMat.includes(normTarget) || normTarget.includes(normProdMat);
        });
        if (!matchesMat) return false;
      }

      // Filtro por rango de precio
      if (p.precio !== null && p.precio !== undefined) {
        if (p.precio < priceRange[0] || p.precio > priceRange[1]) {
          return false;
        }
      }

      return true;
    });

    // Ordenamiento
    if (sortOrder === 'precio-asc') {
      result = [...result].sort((a, b) => (a.precio || 0) - (b.precio || 0));
    } else if (sortOrder === 'precio-desc') {
      result = [...result].sort((a, b) => (b.precio || 0) - (a.precio || 0));
    } else if (sortOrder === 'nombre-asc') {
      result = [...result].sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (sortOrder === 'nombre-desc') {
      result = [...result].sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    return result;
  }, [
    directProducts,
    searchQuery,
    selectedTypes,
    selectedTemporada,
    selectedAromas,
    selectedMaterials,
    priceRange,
    sortOrder,
  ]);

  // ── 5. COMPONENTE DE CONTENIDO DE FILTROS (REUTILIZABLE DESKTOP Y MÓVIL) ──
  const FilterContent = (
    <div className="space-y-6 text-stone-800">
      {/* Cabecera del Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
          <span className="font-serif font-medium text-stone-900 text-base">Filtros</span>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-amber-900 hover:text-amber-700 font-medium underline cursor-pointer transition"
          >
            Limpiar ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Buscador Rápido */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar vela o jabón..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ACORDEÓN 1: CATEGORÍA / TIPO DE PRODUCTO */}
      <div className="border-b border-stone-200/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('categoria')}
          className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
        >
          <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
            Categoría
          </span>
          <div className="flex items-center gap-2">
            {selectedTypes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
            )}
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.categoria ? 'rotate-180' : ''
                }`}
            />
          </div>
        </button>

        {openSections.categoria && (
          <div className="mt-3 space-y-2.5 pt-1">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const isChecked = selectedTypes.includes(cat.id);
              const count = categoryCounts[cat.id] || 0;
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleType(cat.id)}
                      className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500/30 cursor-pointer accent-brand-gold"
                    />
                    <span className={isChecked ? 'font-semibold text-stone-900' : ''}>
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 group-hover:text-stone-600 transition">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SECCIÓN: TEMPORADA */}
      <div className="border-b border-stone-200/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('temporada')}
          className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
        >
          <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
            Temporada
          </span>
          <div className="flex items-center gap-2">
            {selectedTemporada !== 'TODAS' && (
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
            )}
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.temporada ? 'rotate-180' : ''
                }`}
            />
          </div>
        </button>

        {openSections.temporada && (
          <div className="mt-3 space-y-1.5 pt-1">
            {[
              { id: 'TODAS', label: 'Todas las Temporadas' },
              { id: 'navidad', label: 'Navideña ' },
              { id: 'otono', label: 'Otoño ' },
              { id: 'amor_amistad', label: 'Amor & Amistad ' },
              { id: 'primavera', label: 'Primavera ' },
            ].map((temp) => {
              const isSelected = selectedTemporada === temp.id;
              const count = temporadaCounts[temp.id as keyof typeof temporadaCounts] || 0;
              return (
                <button
                  key={temp.id}
                  type="button"
                  onClick={() => handleSelectTemporada(temp.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${isSelected
                      ? 'bg-amber-50 text-amber-950 font-medium border border-amber-200/80 shadow-2xs'
                      : 'text-stone-600 hover:bg-stone-50 border border-transparent'
                    }`}
                >
                  <span className="truncate">{temp.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-amber-200/60 text-amber-900 font-medium' : 'bg-stone-100 text-stone-500'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ACORDEÓN 2: RANGO DE PRECIO */}
      <div className="border-b border-stone-200/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('precio')}
          className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
        >
          <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
            Rango de Precio
          </span>
          <div className="flex items-center gap-2">
            {(priceRange[0] > minPriceAbsolute || priceRange[1] < maxPriceAbsolute) && (
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
            )}
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.precio ? 'rotate-180' : ''
                }`}
            />
          </div>
        </button>

        {openSections.precio && (
          <div className="mt-3 space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
              <span className="px-2 py-1 bg-stone-100 rounded border border-stone-200">
                ${priceRange[0].toLocaleString('es-CO')}
              </span>
              <span className="text-stone-400">—</span>
              <span className="px-2 py-1 bg-stone-100 rounded border border-stone-200">
                ${priceRange[1].toLocaleString('es-CO')}
              </span>
            </div>

            <input
              type="range"
              min={minPriceAbsolute}
              max={maxPriceAbsolute}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              aria-label="Precio máximo"
            />

            <div className="flex justify-between text-[10px] text-stone-400">
              <span>Mín: ${minPriceAbsolute.toLocaleString('es-CO')}</span>
              <span>Máx: ${maxPriceAbsolute.toLocaleString('es-CO')}</span>
            </div>

            {(priceRange[0] > minPriceAbsolute || priceRange[1] < maxPriceAbsolute) && (
              <button
                type="button"
                onClick={() => setPriceRange([minPriceAbsolute, maxPriceAbsolute])}
                className="text-[11px] text-amber-800 hover:text-amber-900 underline cursor-pointer pt-1 block"
              >
                Limpiar rango de precio
              </button>
            )}
          </div>
        )}
      </div>

      {/* ACORDEÓN 3: AROMA */}
      {aromaList.length > 0 && (
        <div className="border-b border-stone-200/70 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('aroma')}
            className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
          >
            <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
              Aroma
            </span>
            <div className="flex items-center gap-2">
              {selectedAromas.length > 0 && (
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">
                  {selectedAromas.length}
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.aroma ? 'rotate-180' : ''
                  }`}
              />
            </div>
          </button>

          {openSections.aroma && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-200 pt-1">
              {aromaList.map(({ name, count }) => {
                const isChecked = selectedAromas.includes(name);
                return (
                  <label
                    key={name}
                    className="flex items-center justify-between gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleAroma(name)}
                        className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500/30 cursor-pointer accent-brand-gold shrink-0"
                      />
                      <span className={`truncate ${isChecked ? 'font-semibold text-stone-900' : ''}`}>
                        {name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 group-hover:text-stone-600 shrink-0">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ACORDEÓN 4: MATERIAL */}
      {materialList.length > 0 && (
        <div className="border-b border-stone-200/70 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('material')}
            className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
          >
            <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
              Material
            </span>
            <div className="flex items-center gap-2">
              {selectedMaterials.length > 0 && (
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">
                  {selectedMaterials.length}
                </span>
              )}
              <ChevronDown
                className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.material ? 'rotate-180' : ''
                  }`}
              />
            </div>
          </button>

          {openSections.material && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-200 pt-1">
              {materialList.map(({ name, count }) => {
                const isChecked = selectedMaterials.includes(name);
                return (
                  <label
                    key={name}
                    className="flex items-center justify-between gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleMaterial(name)}
                        className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500/30 cursor-pointer accent-brand-gold shrink-0"
                      />
                      <span className={`truncate ${isChecked ? 'font-semibold text-stone-900' : ''}`}>
                        {name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 group-hover:text-stone-600 shrink-0">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ACORDEÓN 5: RELEVANCIA / ORDEN */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => toggleSection('orden')}
          className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
        >
          <span className="font-serif font-medium text-stone-900 text-sm group-hover:text-brand-brown transition">
            Ordenar Por
          </span>
          <div className="flex items-center gap-2">
            {sortOrder !== 'relevancia' && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${openSections.orden ? 'rotate-180' : ''
                }`}
            />
          </div>
        </button>

        {openSections.orden && (
          <div className="mt-3 space-y-2 pt-1">
            {[
              { id: 'relevancia', label: 'Relevancia (predeterminado)' },
              { id: 'precio-asc', label: 'Precio: Menor a Mayor' },
              { id: 'precio-desc', label: 'Precio: Mayor a Menor' },
              { id: 'nombre-asc', label: 'Nombre: A - Z' },
              { id: 'nombre-desc', label: 'Nombre: Z - A' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortOrder"
                  checked={sortOrder === opt.id}
                  onChange={() => setSortOrder(opt.id as any)}
                  className="w-4 h-4 text-amber-600 border-stone-300 focus:ring-amber-500/30 accent-brand-gold cursor-pointer"
                />
                <span className={sortOrder === opt.id ? 'font-semibold text-stone-900' : ''}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-brand-cream">
      <Header />

      {/* ── CONTENEDOR PRINCIPAL: TOOLBAR + SIDEBAR + PRODUCTOS ─────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex-1 w-full">
        {/* Encabezado H1 accesible para blindar SEO local sin saturar la UI */}
        <h1 className="sr-only">Catálogo de Productos Artesanales Sandra Gil Bogotá</h1>

        {/* Barra superior limpia: Contador General y Botón de Filtros Móvil */}
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/60 mb-5 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-stone-500 font-light">
              Mostrando <strong className="font-semibold text-stone-900">{filteredAndSortedProducts.length}</strong> de {directProducts.length} piezas
            </span>
          </div>

          {/* Botón trigger para Drawer en Móvil (< lg) */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden rounded-full bg-stone-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-stone-800 transition active:scale-95 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Layout en 2 Columnas (Sidebar + Grilla) */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-7 xl:gap-8 items-start">
          {/* ── SIDEBAR DESKTOP FIJO (STICKY) ───────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/70 shadow-2xs [scrollbar-width:thin]">
            {FilterContent}
          </aside>

          {/* ── GRILLA PRINCIPAL DE PRODUCTOS A 4 COLUMNAS EN DESKTOP ───── */}
          <main className="lg:col-span-3 space-y-6">
            {/* Chips de Filtros Activos para remoción rápida */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-stone-100/70 p-3 rounded-xl border border-stone-200/60">
                <span className="text-xs text-stone-500 font-medium mr-1">Filtros aplicados:</span>

                {/* Chips de Categoría */}
                {selectedTypes.map((t) => {
                  const label = CATEGORY_DEFINITIONS.find((c) => c.id === t)?.label || t;
                  return (
                    <button
                      key={t}
                      onClick={() => handleToggleType(t)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                    >
                      <span>{label}</span>
                      <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                    </button>
                  );
                })}

                {/* Chip de Temporada */}
                {selectedTemporada !== 'TODAS' && (
                  <button
                    onClick={() => handleSelectTemporada('TODAS')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                  >
                    <span>
                      Temporada:{' '}
                      {selectedTemporada === 'navidad'
                        ? 'Navideña 🎄'
                        : selectedTemporada === 'otono'
                          ? 'Otoño 🍂'
                          : selectedTemporada === 'amor_amistad'
                            ? 'Amor & Amistad 💖'
                            : selectedTemporada === 'primavera'
                              ? 'Primavera 🌸'
                              : selectedTemporada}
                    </span>
                    <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                  </button>
                )}

                {/* Chips de Aroma */}
                {selectedAromas.map((a) => (
                  <button
                    key={a}
                    onClick={() => handleToggleAroma(a)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                  >
                    <span>Aroma: {a}</span>
                    <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                  </button>
                ))}

                {/* Chips de Material */}
                {selectedMaterials.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleToggleMaterial(m)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                  >
                    <span>Material: {m}</span>
                    <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                  </button>
                ))}

                {/* Chip de Rango de Precio */}
                {(priceRange[0] > minPriceAbsolute || priceRange[1] < maxPriceAbsolute) && (
                  <button
                    onClick={() => setPriceRange([minPriceAbsolute, maxPriceAbsolute])}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                  >
                    <span>
                      ${priceRange[0].toLocaleString('es-CO')} - ${priceRange[1].toLocaleString('es-CO')}
                    </span>
                    <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                  </button>
                )}

                {/* Chip de Búsqueda */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs text-stone-800 hover:border-red-300 hover:text-red-700 transition"
                  >
                    <span>Búsqueda: &ldquo;{searchQuery}&rdquo;</span>
                    <X className="w-3 h-3 text-stone-400 hover:text-red-600" />
                  </button>
                )}

                {/* Botón Restablecer Todo */}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-amber-900 hover:text-amber-700 font-semibold underline ml-auto pl-2 transition"
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Listado de Productos o Estado Vacío */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/70 p-8 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-stone-900 font-serif text-lg sm:text-xl font-medium mb-2">
                  No encontramos productos con los filtros seleccionados
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-6 font-light">
                  Prueba ajustando el rango de precio, deseleccionando categorías o restableciendo todos los filtros para explorar la colección completa.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-full bg-amber-50/90 border border-amber-300/80 text-amber-950 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-amber-100 hover:border-amber-400 hover:shadow-md transition-all active:scale-98 cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                  <span>Restablecer todos los filtros</span>
                </button>
              </div>
            ) : (
              /* Cuadrícula de 4 Columnas en Desktop (`lg:grid-cols-4` o `lg:grid-cols-3 xl:grid-cols-4`) y 2 en Móvil (`grid-cols-2`) */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-3.5 xl:gap-4">
                {filteredAndSortedProducts.map((product, idx) => (
                  <CatalogProductCard
                    key={product.id}
                    product={product}
                    priority={idx < 4}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── 6. DRAWER LATERAL / SLIDE-OVER EN MÓVIL (< lg) ──────────────── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true">
          {/* Backdrop con desenfoque suave */}
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Lateral Deslizable */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Cabecera del Drawer */}
            <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                <span className="font-serif font-medium text-stone-900 text-base">Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition cursor-pointer"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido scrolleable con acordeones */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
              {FilterContent}
            </div>

            {/* Barra Inferior Fija de Acción */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition active:scale-98"
                >
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition active:scale-98 text-center shadow-md cursor-pointer"
              >
                Ver {filteredAndSortedProducts.length} productos
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
      <Footer />
    </div>
  );
}

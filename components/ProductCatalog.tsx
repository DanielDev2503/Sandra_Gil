'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';
import SkeletonImage from './SkeletonImage';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  dimensiones: string;
  precio: number;
  stock: number;
  url_imagen: string;
  activo: boolean;
}

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [selectedAroma, setSelectedAroma] = useState<string>('Todos');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Dynamically extract unique aromas for filter tabs
  const aromas = useMemo(() => {
    const list = new Set(products.map((p) => p.aroma));
    return ['Todos', ...Array.from(list)];
  }, [products]);

  // Filter products based on selected aroma
  const filteredProducts = useMemo(() => {
    if (selectedAroma === 'Todos') return products;
    return products.filter((p) => p.aroma === selectedAroma);
  }, [products, selectedAroma]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Catalog Title */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A68F81] font-semibold">Nuestra Colección</span>
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900 mt-2">Velas con Propósito</h2>
        <div className="w-12 h-[1px] bg-[#A68F81] mx-auto mt-4"></div>
        <p className="text-stone-500 text-sm max-w-lg mx-auto mt-4 leading-relaxed font-sans">
          Cada vela está vertida a mano en Bogotá con cera de soya natural, enriquecida con esencias botánicas premium y decorada con flores preservadas y cristales.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {aromas.map((aroma) => (
          <button
            key={aroma}
            onClick={() => setSelectedAroma(aroma)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-300 ${
              selectedAroma === aroma
                ? 'bg-[#A68F81] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {aroma}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => {
          const isLowStock = product.stock > 0 && product.stock <= 15;
          const isOutOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-350 ease-in-out"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Link Container */}
              <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                <SkeletonImage
                  src={product.url_imagen}
                  alt={product.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Handcrafted Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#A68F81]" />
                  <span className="text-[10px] font-medium text-stone-700 uppercase tracking-wider">
                    Hecho a Mano
                  </span>
                </div>

                {/* Scent Badge */}
                <div className="absolute bottom-3 left-3 bg-[#2C2A29]/80 backdrop-blur-xs text-[#FBF9F6] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest">
                  {product.aroma}
                </div>

                {/* Hover overlay detail */}
                {hoveredProduct === product.id && (
                  <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300">
                    <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-sm shadow-md flex items-center gap-2 transform translate-y-0 opacity-100 transition-all duration-300">
                      <Eye className="w-4 h-4" /> Ver Detalles
                    </span>
                  </div>
                )}
              </Link>

              {/* Product Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/productos/${product.id}`} className="block group/title">
                    <h3 className="font-serif font-medium text-stone-900 text-base group-hover/title:text-[#A68F81] transition duration-200 line-clamp-1">
                      {product.nombre}
                    </h3>
                  </Link>
                  
                  {/* Scent / Dimension details */}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400">
                    <span>Tamaño: {product.dimensiones}</span>
                    <span>•</span>
                    <span>Cera de Soya</span>
                  </div>

                  <p className="text-xs text-stone-500 mt-2.5 line-clamp-3 leading-relaxed">
                    {product.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-serif font-semibold text-[#2C2A29] text-base">
                      ${product.precio.toLocaleString('es-CO')} COP
                    </span>

                    {/* Stock status */}
                    {isOutOfStock ? (
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                        Agotado
                      </span>
                    ) : isLowStock ? (
                      <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider animate-pulse">
                        Últimas {product.stock} unidades
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">
                        En Stock
                      </span>
                    )}
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:scale-100 ${
                      isOutOfStock
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#2C2A29] hover:bg-[#A68F81] text-white shadow-xs hover:shadow-md'
                    }`}
                  >
                    {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

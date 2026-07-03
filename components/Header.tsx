'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { cartCount, openCart } = useCart();

  return (
    <>
      {/* Top micro-banner: Delivery guarantee */}
      <div className="bg-[#2C2A29] text-[#FBF9F6] text-[10px] sm:text-[11px] text-center py-1.5 font-sans tracking-wide">
        📦 Despachos protegidos contra impactos en Bogotá y Sabana — Garantía de entrega perfecta
      </div>

      <header className="sticky top-0 z-40 bg-[#FBF9F6]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Navigation */}
          <div className="hidden sm:flex items-center space-x-8 text-xs font-medium uppercase tracking-wider text-stone-600">
            <Link href="/" className="hover:text-stone-900 transition">Inicio</Link>
            <Link href="/catalogo" className="hover:text-stone-900 transition">Catálogo</Link>
          </div>

          {/* Brand Logo */}
          <div className="text-center flex-1 sm:flex-initial">
            <Link href="/" className="inline-block">
              <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-widest text-[#2C2A29]">
                SANDRA GIL
              </h1>
              <p className="text-[9px] tracking-[0.25em] text-stone-500 uppercase font-sans -mt-0.5">
                Velas Artesanales
              </p>
            </Link>
          </div>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#A68F81] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm font-sans animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

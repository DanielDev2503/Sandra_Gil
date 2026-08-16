'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-350"
        onClick={closeCart}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Panel */}
        <div className="w-screen max-w-md transform bg-[#FBF9F6] shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A68F81]" />
              Tu Carrito ({cartCount})
            </h2>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-850 hover:scale-105 active:scale-95 transition-all duration-250 cursor-pointer"
            >
              <X className="w-5. h-5." />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-stone-850 font-medium font-serif">Tu carrito está vacío</p>
                  <p className="text-xs text-stone-500 mt-1.5 font-sans leading-relaxed">Explora nuestro catálogo y añade velas con aromas premium.</p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer font-sans"
                >
                  Seguir Comprando
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.id}-${item.aroma}-${item.variacionId ?? 'base'}-${idx}`} className="flex gap-4 pb-4 border-b border-stone-150 last:border-0 last:pb-0 font-sans">
                  <img
                    src={item.url_imagen}
                    alt={item.nombre}
                    className="w-20 h-20 object-cover bg-stone-100 rounded-sm"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-medium text-stone-900 text-sm">{item.nombre}</h4>
                      {item.variacionNombre && (
                        <p className="text-[10px] text-[#B88A32] font-semibold uppercase tracking-wider mt-0.5">{item.variacionNombre}</p>
                      )}
                      <p className="text-[10px] text-[#A68F81] uppercase tracking-wider mt-0.5">{item.aroma}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad - 1, item.aroma || undefined, item.variacionId)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1, item.aroma || undefined, item.variacionId)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price and delete button */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-stone-900 font-serif">
                          ${(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.aroma || undefined, item.variacionId)}
                          className="text-stone-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-6 bg-stone-100/50 space-y-4">
              <div className="flex justify-between items-center text-stone-900">
                <span className="text-sm text-stone-600 font-medium font-sans">Subtotal</span>
                <span className="text-lg font-serif font-semibold text-[#2C2A29]">
                  ${cartTotal.toLocaleString('es-CO')} COP
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium leading-normal font-sans">
                * ¡Envío GRATIS a Bogotá y municipios aledaños para todas tus compras!
              </p>
              
              {/* Trust Badge */}
              <div className="bg-white p-3 rounded-sm border border-stone-200/50 flex gap-2.5 items-start text-[11px] text-stone-500 leading-normal font-sans">
                <span className="text-stone-650 font-semibold mt-0.5 text-xs">🔒</span>
                <div>
                  <p className="font-semibold text-stone-700">Pago 100% Seguro</p>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-relaxed">
                    Procesado de forma segura por Wompi (Bancolombia). Aceptamos Nequi, PSE y Tarjetas.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full block text-center py-3.5 bg-[#2C2A29] hover:bg-[#A68F81] hover:scale-[1.01] active:scale-[0.99] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg font-sans"
                >
                  Proceder al Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

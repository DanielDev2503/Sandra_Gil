'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  url_imagen: string;
  aroma?: string | null;
  variacionId?: string | null;
  variacionNombre?: string | null;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: { id: string; nombre: string; precio: number | null; url_imagen: string | null; aroma?: string | null },
    cantidad?: number,
    selectedAroma?: string,
    variacion?: { id: string; nombre: string; imagen: string; precio: number | null } | null
  ) => void;
  removeFromCart: (productId: string, aroma?: string | null, variacionId?: string | null) => void;
  updateQuantity: (productId: string, cantidad: number, aroma?: string | null, variacionId?: string | null) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/** Identity match: same product + same aroma + same variation */
function cartItemMatches(
  item: CartItem,
  productId: string,
  aroma?: string | null,
  variacionId?: string | null
): boolean {
  return (
    item.id === productId &&
    (item.aroma ?? null) === (aroma ?? null) &&
    (item.variacionId ?? null) === (variacionId ?? null)
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sandra_gil_velas_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sandra_gil_velas_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (
    product: { id: string; nombre: string; precio: number | null; url_imagen: string | null; aroma?: string | null },
    cantidad = 1,
    selectedAroma?: string,
    variacion?: { id: string; nombre: string; imagen: string; precio: number | null } | null
  ) => {
    // Determine the effective price: variation price > product price
    const effectivePrice = variacion?.precio ?? product.precio;
    if (effectivePrice === null) return;

    const finalAroma = selectedAroma || product.aroma || 'Aroma por defecto';
    const finalImage = variacion?.imagen || product.url_imagen || '';
    const finalVariacionId = variacion?.id ?? null;
    const finalVariacionNombre = variacion?.nombre ?? null;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) =>
        cartItemMatches(item, product.id, finalAroma, finalVariacionId)
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: updated[existingIndex].cantidad + cantidad,
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          id: product.id,
          nombre: product.nombre,
          precio: effectivePrice,
          cantidad,
          url_imagen: finalImage,
          aroma: finalAroma,
          variacionId: finalVariacionId,
          variacionNombre: finalVariacionNombre,
        },
      ];
    });

    showToast(`"${product.nombre}" añadido al carrito`);
    openCart();
  };

  const removeFromCart = (productId: string, aroma?: string | null, variacionId?: string | null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !cartItemMatches(item, productId, aroma, variacionId))
    );
  };

  const updateQuantity = (productId: string, cantidad: number, aroma?: string | null, variacionId?: string | null) => {
    if (cantidad <= 0) {
      removeFromCart(productId, aroma, variacionId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        cartItemMatches(item, productId, aroma, variacionId)
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);
  const cartTotal = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,
        toastMessage,
      }}
    >
      {children}

      {/* Accessible Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-sm text-white px-5 py-3 rounded-lg shadow-2xl border border-stone-700/60 flex items-center gap-3 animate-fade-in font-sans text-xs sm:text-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-[#B88A32] shrink-0" />
          <span className="font-medium text-stone-100">{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

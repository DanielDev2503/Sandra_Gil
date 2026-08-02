'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  url_imagen: string;
  aroma?: string | null;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: { id: string; nombre: string; precio: number | null; url_imagen: string; aroma?: string | null },
    cantidad?: number,
    selectedAroma?: string
  ) => void;
  removeFromCart: (productId: string, aroma?: string | null) => void;
  updateQuantity: (productId: string, cantidad: number, aroma?: string | null) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const addToCart = (
    product: { id: string; nombre: string; precio: number | null; url_imagen: string; aroma?: string | null },
    cantidad = 1,
    selectedAroma?: string
  ) => {
    if (product.precio === null) return;
    const validPrecio = product.precio;
    const finalAroma = selectedAroma || product.aroma || 'Aroma por defecto';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.aroma === finalAroma
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
          precio: validPrecio,
          cantidad,
          url_imagen: product.url_imagen,
          aroma: finalAroma,
        },
      ];
    });

    openCart();
  };

  const removeFromCart = (productId: string, aroma?: string | null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && (!aroma || item.aroma === aroma)))
    );
  };

  const updateQuantity = (productId: string, cantidad: number, aroma?: string | null) => {
    if (cantidad <= 0) {
      removeFromCart(productId, aroma);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && (!aroma || item.aroma === aroma)
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
      }}
    >
      {children}
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

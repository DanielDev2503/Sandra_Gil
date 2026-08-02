'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, FileText, Receipt, HelpCircle, CheckCircle2 } from 'lucide-react';

const WA_NUMBER = '573175752029';

export default function ExpressShippingForm() {
  const [orderId, setOrderId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Formatted values for WhatsApp
  const cleanOrderId = orderId.trim();
  const cleanTransId = transactionId.trim();

  // Generate WhatsApp message URL
  const baseMessage = 'Hola, acabo de realizar una compra y deseo solicitar ENVÍO EXPRESS en Bogotá.';
  const orderLine = `- ID Pedido: ${cleanOrderId || '[Por indicar / Ver en correo]'}`;
  const transLine = `- ID Transacción: ${cleanTransId || '[Por indicar / Ver en correo]'}`;

  const messageText = `${baseMessage}\n${orderLine}\n${transLine}`;
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-md p-6 sm:p-8 space-y-6">
      <div className="border-b border-stone-100 pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-[#25D366]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            Solicitud Directa por WhatsApp
          </h3>
        </div>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Ingresa los datos de tu compra para generar el mensaje directo de confirmación y agilizar el despacho de tu paquete en Bogotá.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Order ID Input */}
        <div className="space-y-1.5">
          <label htmlFor="order-id" className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-brand-gold" />
            <span>ID del Pedido (Order ID) *</span>
          </label>
          <input
            id="order-id"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Ej: clx9a8b7c... o ID de confirmación"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition"
          />
        </div>

        {/* Transaction ID Input */}
        <div className="space-y-1.5">
          <label htmlFor="trans-id" className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-brand-gold" />
            <span>ID de Transacción Wompi *</span>
          </label>
          <input
            id="trans-id"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Ej: 123456-1700000000-99999"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition"
          />
        </div>
      </div>

      {/* Helper notice */}
      <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium">¿Dónde encuentro estos datos?</p>
          <p className="text-amber-800 leading-normal">
            El <strong>ID del Pedido</strong> aparece en tu pantalla de confirmación tras finalizar el pago. El <strong>ID de Transacción</strong> es la referencia asignada por Wompi en el correo de recibo de pago. Si no los tienes a la mano, puedes enviarnos la solicitud y te ayudaremos a ubicarlos.
          </p>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 space-y-1.5">
        <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider block">
          Vista previa del mensaje a enviar:
        </span>
        <pre className="text-xs font-sans whitespace-pre-wrap text-stone-700 bg-white p-3 rounded border border-stone-200/60 leading-relaxed font-mono">
          {messageText}
        </pre>
      </div>

      {/* Primary Action WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[52px] py-4 px-6 bg-[#25D366] hover:bg-[#1da851] text-white text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 active:scale-[0.99] group"
      >
        <MessageCircle className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
        <span>Solicitar Envío Express por WhatsApp</span>
        <Send className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

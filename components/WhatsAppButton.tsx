'use client';

import React from 'react';

export default function WhatsAppButton() {
  const phoneNumber = '573000000000'; // Default business support number
  const message = encodeURIComponent('Hola, estoy viendo la página web y tengo una duda sobre las velas...');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Outer pulse ring — constrained to button size */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out"
        style={{ boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)' }}
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.01 2.003c-5.502 0-9.982 4.48-9.982 9.984 0 1.93.548 3.733 1.498 5.272l-1.524 5.565 5.694-1.494c1.488.812 3.19 1.277 4.996 1.277 5.502 0 9.983-4.48 9.983-9.984 0-5.503-4.48-9.983-9.983-9.983zm5.728 14.195c-.244.69-1.22 1.274-1.745 1.344-.477.062-.977.103-3.093-.77-2.704-1.115-4.44-3.87-4.575-4.05-.133-.18-1.077-1.432-1.077-2.733 0-1.302.684-1.942.927-2.207.243-.264.53-.33.707-.33h.508c.155 0 .365-.058.574.462.221.53.75 1.832.817 1.968.066.136.11.294.022.47-.088.176-.132.285-.265.44-.132.155-.278.347-.397.466-.133.132-.271.276-.11.554.16.277.712 1.173 1.523 1.897 1.043.93 1.92 1.218 2.197 1.35.277.133.438.11.6-.077.16-.188.685-.795.867-1.071.182-.276.365-.232.619-.138.254.093 1.611.758 1.887.896.276.138.46.207.527.32.066.113.066.653-.178 1.343z"
          />
        </svg>
      </a>
    </div>
  );
}

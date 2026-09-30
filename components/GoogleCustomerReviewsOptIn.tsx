'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    gapi?: {
      load: (module: string, callback: () => void) => void;
      surveyoptin?: {
        render: (config: {
          merchant_id: number;
          order_id: string;
          email: string;
          delivery_country: string;
          estimated_delivery_date: string;
          products?: Array<{ gtin: string }>;
          opt_in_style?: 'CENTER_DIALOG' | 'BOTTOM_RIGHT_DIALOG' | 'BOTTOM_LEFT_DIALOG' | 'TOP_RIGHT_DIALOG' | 'TOP_LEFT_DIALOG' | 'BOTTOM_TRAY';
        }) => void;
      };
    };
    renderOptIn?: () => void;
  }
}

interface GoogleCustomerReviewsOptInProps {
  orderId: string;
  email: string;
  deliveryCountry?: string;
  estimatedDeliveryDate: string;
  products?: Array<{ gtin: string }>;
}

export default function GoogleCustomerReviewsOptIn({
  orderId,
  email,
  deliveryCountry = 'CO',
  estimatedDeliveryDate,
  products,
}: GoogleCustomerReviewsOptInProps) {
  useEffect(() => {
    // Definir la función global requerida por Google platform.js (?onload=renderOptIn)
    window.renderOptIn = function () {
      if (window.gapi && typeof window.gapi.load === 'function') {
        window.gapi.load('surveyoptin', function () {
          if (window.gapi?.surveyoptin) {
            window.gapi.surveyoptin.render({
              merchant_id: 5860719569,
              order_id: orderId,
              email: email,
              delivery_country: deliveryCountry,
              estimated_delivery_date: estimatedDeliveryDate,
              ...(products && products.length > 0 ? { products } : {}),
            });
          }
        });
      }
    };

    // Si la librería gapi de Google ya cargó previamente en la ventana, invocar la función directamente
    if (window.gapi && typeof window.gapi.load === 'function') {
      window.renderOptIn();
    }
  }, [orderId, email, deliveryCountry, estimatedDeliveryDate, products ? JSON.stringify(products) : '']);

  return (
    <>
      {/* Declaración inicial inline de window.renderOptIn para el crawler y ejecución inmediata */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.renderOptIn = function() {
              if (window.gapi && typeof window.gapi.load === 'function') {
                window.gapi.load('surveyoptin', function() {
                  if (window.gapi && window.gapi.surveyoptin) {
                    window.gapi.surveyoptin.render({
                      "merchant_id": 5860719569,
                      "order_id": ${JSON.stringify(orderId)},
                      "email": ${JSON.stringify(email)},
                      "delivery_country": ${JSON.stringify(deliveryCountry)},
                      "estimated_delivery_date": ${JSON.stringify(estimatedDeliveryDate)}${
                        products && products.length > 0 ? `, "products": ${JSON.stringify(products)}` : ''
                      }
                    });
                  }
                });
              }
            };
          `,
        }}
      />
      {/* Script oficial de Google APIs con callback renderOptIn */}
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />
    </>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Sandra Gil Velas Artesanales',
  description: 'Política de cookies del sitio web de Sandra Gil Velas Artesanales. Información sobre las cookies utilizadas.',
};

export default function PoliticaCookiesPage() {
  const year = new Date().getFullYear();
  return (
    <article className="space-y-8 text-stone-700 font-sans">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-light text-stone-900">Política de Cookies</h2>
        <p className="text-xs text-stone-400">Última actualización: enero de {year}</p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">1. ¿Qué son las Cookies?</h3>
        <p className="text-sm leading-relaxed">
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. 
          Se utilizan ampliamente para hacer que los sitios funcionen de manera más eficiente y para proporcionar 
          información a los propietarios del sitio. En Colombia, el uso de cookies está regulado por la Ley 1581 de 2012 
          y los principios de la protección de datos personales.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">2. Cookies que Utilizamos</h3>

        <div className="space-y-4">
          <div className="border border-stone-200 rounded-md overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <h4 className="text-sm font-semibold text-stone-800">Cookies Estrictamente Necesarias</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-stone-600 leading-relaxed">
                Estas cookies son esenciales para que el sitio web funcione correctamente. Incluyen cookies de sesión 
                que permiten mantener el contenido de su carrito de compras durante su visita. 
                <strong> No requieren su consentimiento</strong> ya que son técnicamente necesarias.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100">
                      <th className="border border-stone-200 px-3 py-2 text-left">Cookie</th>
                      <th className="border border-stone-200 px-3 py-2 text-left">Finalidad</th>
                      <th className="border border-stone-200 px-3 py-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-stone-200 px-3 py-2 font-mono">cart_session</td>
                      <td className="border border-stone-200 px-3 py-2">Mantener los productos del carrito de compras</td>
                      <td className="border border-stone-200 px-3 py-2">Sesión</td>
                    </tr>
                    <tr>
                      <td className="border border-stone-200 px-3 py-2 font-mono">__Host-next-auth</td>
                      <td className="border border-stone-200 px-3 py-2">Gestión de sesión de la aplicación Next.js</td>
                      <td className="border border-stone-200 px-3 py-2">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 rounded-md overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <h4 className="text-sm font-semibold text-stone-800">Cookies de Análisis y Rendimiento</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-stone-600 leading-relaxed">
                Utilizamos Vercel Analytics para comprender cómo los visitantes interactúan con nuestro sitio web. 
                Esta información se recopila de forma anónima y agregada, sin identificar a usuarios individuales.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100">
                      <th className="border border-stone-200 px-3 py-2 text-left">Proveedor</th>
                      <th className="border border-stone-200 px-3 py-2 text-left">Finalidad</th>
                      <th className="border border-stone-200 px-3 py-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-stone-200 px-3 py-2">Vercel Analytics</td>
                      <td className="border border-stone-200 px-3 py-2">Métricas de uso anónimas del sitio web</td>
                      <td className="border border-stone-200 px-3 py-2">Anónimo / Sin cookie persistente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">3. Gestión de Cookies</h3>
        <p className="text-sm leading-relaxed">
          Puede controlar y/o eliminar las cookies a través de la configuración de su navegador. 
          A continuación, encontrará enlaces a las instrucciones para los navegadores más comunes:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-co/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Safari (Mac)</a></li>
          <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Microsoft Edge</a></li>
        </ul>
        <p className="text-sm leading-relaxed">
          Tenga en cuenta que si deshabilita las cookies técnicas necesarias, es posible que algunas funciones del sitio 
          (como el carrito de compras) no funcionen correctamente.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">4. Actualizaciones de esta Política</h3>
        <p className="text-sm leading-relaxed">
          Nos reservamos el derecho de actualizar esta Política de Cookies en cualquier momento. 
          Le recomendamos revisarla periódicamente para estar informado sobre cómo utilizamos las cookies.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-stone-800">5. Contacto</h3>
        <p className="text-sm leading-relaxed">
          Si tiene alguna pregunta sobre el uso de cookies en nuestro sitio, puede contactarnos por WhatsApp 
          al <strong>+57 317 575 2029</strong>.
        </p>
      </section>
    </article>
  );
}

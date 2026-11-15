import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, MessageCircle, AlertTriangle } from 'lucide-react';

export function Policies() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Volver a la tienda
      </Link>

      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Políticas y Métodos de Pago</h1>

      {/* Métodos de Pago */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-primary">Métodos de Pago Aceptados</h2>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">✅ Pago Móvil</li>
          <li className="flex items-center gap-2">✅ Efectivo</li>
          <li className="flex items-center gap-2">✅ Binance</li>
          <li className="flex items-center gap-2">✅ Zelle</li>
          <li className="flex items-center gap-2">✅ Pesos Colombianos (Transferencia)</li>
        </ul>
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Nota importante:</strong> Al pagar por Binance o Zelle, los precios de las prendas quedan a precio de divisas.
          </p>
        </div>
      </section>

      {/* Cómo Comprar */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-primary">¿Cómo Comprar?</h2>
        </div>
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li>Solicita nuestro catálogo a través de WhatsApp.</li>
          <li>Toma capture o menciónanos la referencia que deseas adquirir.</li>
          <li>Luego de mencionarte los colores disponibles, elige el color de preferencia para tu prenda.</li>
          <li>Confirmamos tu pedido con el total. Dependiendo de donde te ubiques, el pago es anticipado o al momento de recibir.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-500 italic">
          Cualquier duda o inquietud será atendida vía WhatsApp.
        </p>
      </section>

      {/* Condiciones Importantes */}
      <section className="bg-white border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-red-600">Condiciones Importantes</h2>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">1.</span>
            <span><strong>No se hacen devoluciones</strong> (sin excepción).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">2.</span>
            <span><strong>No se hacen cambios de prendas</strong> a menos que tenga un defecto de fabricación (costuras, manchas, etc.).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">3.</span>
            <span><strong>Prendas blancas y claras no tienen cambio</strong> (sin excepción).</span>
          </li>
        </ul>
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-sm text-red-800">
            <strong>Recomendación:</strong> Estar muy atentas al momento de hacer pedidos (talla, colores, prenda). Tener en cuenta los puntos mencionados anteriormente.
          </p>
        </div>
      </section>
    </div>
  );
}
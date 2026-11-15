import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { Trash2, MessageCircle } from 'lucide-react';

export function CartPage() {
  const { items, removeItem, clearCart, getTotal } = useCartStore();
  const navigate = useNavigate();

  // Función para generar el mensaje de WhatsApp
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const telefonoNegocio = "584123230893"; // ⚠️ CAMBIA ESTO por el número real

    let mensaje = "Hola! Quiero hacer el siguiente pedido en EVA Shop:\n\n";

    items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   Talla: ${item.tallaElegida} | Color: ${item.colorElegido}\n`;
      mensaje += `   Cantidad: ${item.cantidad} x $${item.precio.toFixed(2)} = $${(item.precio * item.cantidad).toFixed(2)}\n\n`;
    });

    const total = getTotal();
    mensaje += `TOTAL A PAGAR: $${total.toFixed(2)}\n\n`;
    mensaje += "Quedo atento(a) a las instrucciones de pago. Gracias!";

    // Codificamos TODO el mensaje correctamente para WhatsApp
    const url = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Tu carrito está vacío</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Tu Carrito de Compras</h2>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={`${item.id}-${item.tallaElegida}-${item.colorElegido}`} className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg">
            <img src={item.imagen_url || 'https://via.placeholder.com/80'} alt={item.nombre} className="w-20 h-20 object-cover rounded-md" />
            
            <div className="flex-grow">
              <h3 className="font-semibold text-primary">{item.nombre}</h3>
              <p className="text-sm text-gray-600">Talla: {item.tallaElegida} | Color: {item.colorElegido}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-primary">${(item.precio * item.cantidad).toFixed(2)}</p>
              <button 
                onClick={() => removeItem(item.id, item.tallaElegida, item.colorElegido)}
                className="text-red-500 hover:text-red-700 text-sm mt-2 flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold text-primary">
          Total: ${getTotal().toFixed(2)}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={clearCart}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Vaciar Carrito
          </button>
          <button 
            onClick={handleWhatsAppCheckout}
            className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
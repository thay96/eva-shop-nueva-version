import { useToastStore } from '../store/toastStore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../services/productService';
import { useCartStore } from '../store/cartStore';
import type { Producto } from '../types/product';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para la selección del usuario
  const [tallaElegida, setTallaElegida] = useState<string>('');
  const [colorElegido, setColorElegido] = useState<string>('');
  const [cantidad, setCantidad] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    async function cargarProducto() {
      if (id) {
        const data = await getProductoById(id);
        setProducto(data);
        
        // Seleccionar la primera talla y color por defecto si existen
        if (data?.tallas && data.tallas.length > 0) setTallaElegida(data.tallas[0]);
        if (data?.colores && data.colores.length > 0) setColorElegido(data.colores[0]);
        
        setLoading(false);
      }
    }
    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (!producto || !tallaElegida || !colorElegido) return;
    
    addItem({
      ...producto,
      cantidad,
      tallaElegida,
      colorElegido,
    });
    
    // Pequeña alerta visual o redirección (opcional)
    addToast('¡Producto agregado al carrito!', 'success');
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Cargando producto...</div>;
  }

  if (!producto) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Producto no encontrado.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Volver al catálogo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen del Producto */}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          {producto.imagen_url ? (
            <img 
              src={producto.imagen_url} 
              alt={producto.nombre} 
              className="w-full h-full object-cover aspect-square"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center text-gray-400">
              Sin imagen disponible
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary mb-2">{producto.nombre}</h1>
          <p className="text-3xl font-semibold text-accent mb-6">${producto.precio.toFixed(2)}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {producto.descripcion || 'Sin descripción disponible.'}
          </p>

          {/* Selector de Tallas */}
          {producto.tallas && producto.tallas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-primary mb-3">Talla</h3>
              <div className="flex flex-wrap gap-3">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla}
                    onClick={() => setTallaElegida(talla)}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      tallaElegida === talla 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de Colores */}
          {producto.colores && producto.colores.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-primary mb-3">Color: <span className="font-normal text-gray-600">{colorElegido}</span></h3>
              <div className="flex flex-wrap gap-3">
                {producto.colores.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColorElegido(color)}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      colorElegido === color 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad y Botón de Acción */}
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              >-</button>
              <span className="px-4 py-2 font-semibold">{cantidad}</span>
              <button 
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setCantidad(cantidad + 1)}
              >+</button>
            </div>
            
            <button 
              onClick={handleAgregarAlCarrito}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
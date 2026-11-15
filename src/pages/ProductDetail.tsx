import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoById } from "../services/productService";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tallaElegida, setTallaElegida] = useState("");
  const [colorElegido, setColorElegido] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    async function cargarProducto() {
      if (!id) return;
      const data = await getProductoById(id);
      setProducto(data);
      setLoading(false);
    }
    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (producto.tallas && producto.tallas.length > 0 && !tallaElegida) {
      addToast("Por favor selecciona una talla", "error");
      return;
    }
    if (producto.colores && producto.colores.length > 0 && !colorElegido) {
      addToast("Por favor selecciona un color", "error");
      return;
    }

    const tallaFinal = tallaElegida || "Única";
    const colorFinal = colorElegido || "Único";

    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      tallaElegida: tallaFinal,
      colorElegido: colorFinal,
      imagen_url: producto.imagen_url || undefined,
    });

    addToast(`¡${cantidad} x ${producto.nombre} agregado al carrito!`, "success");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={producto.imagen_url || "https://via.placeholder.com/600"}
            alt={producto.nombre}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Información (columna derecha) */}
        <div className="flex flex-col justify-center">
          {/* Nombre y precio arriba, dentro de la columna */}
          <h1 className="text-3xl font-bold text-primary mb-2">
            {producto.nombre}
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            ${producto.precio.toFixed(2)}
          </p>

          <p className="text-gray-600 mb-8">{producto.descripcion}</p>

          {/* Tallas */}
          {producto.tallas && producto.tallas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {producto.tallas.map((talla: string) => (
                  <button
                    key={talla}
                    onClick={() => setTallaElegida(talla)}
                    className={`px-4 py-2 border rounded-md font-medium transition-colors ${
                      tallaElegida === talla
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colores */}
          {producto.colores && producto.colores.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {producto.colores.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setColorElegido(color)}
                    className={`px-4 py-2 border rounded-md font-medium transition-colors ${
                      colorElegido === color
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-semibold w-10 text-center">
                {cantidad}
              </span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAgregarAlCarrito}
            className="w-full bg-primary text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
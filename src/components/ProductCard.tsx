import { Link } from 'react-router-dom';
import type { Producto } from '../types/product';

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* Imagen del producto */}
      {producto.imagen_url ? (
        <img 
          src={producto.imagen_url} 
          alt={producto.nombre}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Sin imagen</span>
        </div>
      )}
      
      {/* Información del producto */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-primary mb-2">
          {producto.nombre}
        </h3>
        
        {producto.descripcion && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {producto.descripcion}
          </p>
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-primary">
            ${producto.precio.toFixed(2)}
          </span>
          
          {/* AQUÍ ESTÁ EL LINK: Reemplaza al botón antiguo */}
          <Link 
            to={`/producto/${producto.id}`} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}
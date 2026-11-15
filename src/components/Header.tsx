import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCategoryClick?: (category: string) => void;
}

export function Header({ searchQuery, onSearchChange, onCategoryClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.items.reduce((sum, item) => sum + item.cantidad, 0));

  const categorias = [
    { nombre: "Inicio", slug: "" },
    { nombre: "Tops", slug: "tops" },
    { nombre: "Sueter", slug: "sueter" },
    { nombre: "Vestidos", slug: "vestidos" },
    { nombre: "Bodys", slug: "bodys" },
    { nombre: "Colección Playa", slug: "coleccion-playa" },
    { nombre: "Colección Coquette", slug: "coleccion-coquette" },
    { nombre: "Baggys y Joggers", slug: "baggys-y-joggers" },
  ];

  const handleCategoryClick = (slug: string) => {
    if (onCategoryClick) {
      onCategoryClick(slug);
    }
    setMobileMenuOpen(false);
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              handleCategoryClick("");
              window.location.reload();
            }}
            className="flex-shrink-0"
          >
            <span className="text-2xl font-bold text-primary tracking-tight">
              EVA Shop
            </span>
          </Link>

          {/* Menú Desktop */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {categorias.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="text-gray-700 hover:text-primary font-medium text-sm transition-colors whitespace-nowrap"
              >
                {cat.nombre}
              </button>
            ))}
          </nav>

          {/* Buscador y Carrito */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Buscar..."
                  className="w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Carrito con contador */}
            <Link to="/carrito" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Buscador móvil */}
        <div className="xl:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 max-h-96 overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary font-medium transition-colors"
                >
                  {cat.nombre}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
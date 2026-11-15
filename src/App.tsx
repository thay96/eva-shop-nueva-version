import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductos } from "./services/productService";
import { ProductCard } from "./components/ProductCard";
import { Header } from "./components/Header";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Policies } from "./pages/Policies";
import { HeroBanner } from "./components/HeroBanner";
import { ToastContainer } from "./components/ToastContainer";

function HomePage({
  searchQuery,
  selectedCategory,
}: {
  searchQuery: string;
  selectedCategory: string;
}) {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarProductos() {
      const data = await getProductos();
      setProductos(data);
      setLoading(false);
    }
    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      !searchQuery ||
      producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchQuery.toLowerCase());

    const coincideCategoria =
      !selectedCategory || producto.categorias?.slug === selectedCategory;

    // Temporal: para diagnosticar
    if (selectedCategory) {
      console.log("Producto:", producto.nombre);
      console.log("Slug de categoría:", producto.categorias?.slug);
      console.log("Categoría seleccionada:", selectedCategory);
      console.log("¿Coincide?", coincideCategoria);
    }

    return coincideBusqueda && coincideCategoria;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Cargando colección...</p>
      </div>
    );
  }

  return (
    <>
      {!searchQuery && !selectedCategory && <HeroBanner />}

      <main
        id="productos"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {selectedCategory
              ? selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              : searchQuery
                ? `Resultados para "${searchQuery}"`
                : "Nueva Colección"}
          </h2>
          <p className="text-gray-500">
            {productosFiltrados.length} producto(s) encontrado(s)
          </p>
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            {searchQuery || selectedCategory
              ? "No se encontraron productos."
              : "Próximamente nuevos productos."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function App() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!location.pathname.startsWith("/admin") && (
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCategoryClick={setSelectedCategory}
        />
      )}

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/politicas" element={<Policies />} />
        </Routes>
      </div>

      <footer className="bg-secondary py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            © {new Date().getFullYear()} EVA Shop. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link
              to="/politicas"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              Políticas y Pagos
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/admin"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              Acceso interno
            </Link>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}

export default App;

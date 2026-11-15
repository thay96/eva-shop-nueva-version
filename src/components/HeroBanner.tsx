import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Colección EVA Shop"
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro sutil para que el texto sea legible */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Contenido del banner */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <p className="text-white/90 text-sm sm:text-base uppercase tracking-[0.2em] mb-4">
            Nueva Temporada 2026
          </p>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Elegancia que <br className="hidden sm:block" />
            <span className="italic font-light">te define</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Descubre nuestra colección exclusiva de vestidos, conjuntos y prendas diseñadas para la mujer moderna.
          </p>
<button onClick={() => { const productosSection = document.getElementById('productos'); if (productosSection) { productosSection.scrollIntoView({ behavior: 'smooth' }); } }} className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors" > Ver Colección <ArrowRight className="h-4 w-4" /> </button>
        </div>
      </div>
    </section>
  );
}
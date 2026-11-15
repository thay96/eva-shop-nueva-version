export interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen_url: string | null;
  categoria_id: string | null;
  tallas: string[];
  colores: string[];
  stock: number;
  creado_en: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  created_at: string;
}
import { supabase } from '../lib/supabase';

// Obtener todos los productos
export async function getProductos(): Promise<any[]> {
  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      categorias (
        id,
        nombre,
        slug
      )
    `)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }

  return data || [];
}

// Obtener un producto por ID
export async function getProductoById(id: string): Promise<any> {
  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      categorias (
        id,
        nombre,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener producto:', error);
    return null;
  }

  return data;
}

// Obtener todas las categorías
export async function getCategorias(): Promise<any[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }

  return data || [];
}

// Crear un producto
export async function crearProducto(producto: any) {
  const { data, error } = await supabase
    .from('productos')
    .insert([producto])
    .select();

  if (error) throw error;
  return data;
}

// Eliminar un producto
export async function eliminarProducto(id: string) {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
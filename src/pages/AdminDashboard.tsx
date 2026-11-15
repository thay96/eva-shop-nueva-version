import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getProductos,
  crearProducto,
  eliminarProducto,
  getCategorias,
} from "../services/productService";
import { signOut } from "../services/authService";
import { useToastStore } from "../store/toastStore";
import { LogOut, Plus, Trash2, Upload } from "lucide-react";
import { ConfirmModal } from "../components/ConfirmModal";

export function AdminDashboard() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productoAEliminar, setProductoAEliminar] = useState<string | null>(
    null,
  );

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [tallasInput, setTallasInput] = useState("");
  const [coloresInput, setColoresInput] = useState("");
  const [stock, setStock] = useState("");
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    verificarSesion();
    cargarProductos();
    cargarCategorias();
  }, []);

  async function verificarSesion() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) navigate("/admin");
  }

  async function cargarProductos() {
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  }

  async function cargarCategorias() {
    const data = await getCategorias();
    setCategorias(data);
  }

  async function handleLogout() {
    await signOut();
    navigate("/admin");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre || !precio || !categoriaId) {
      addToast("Nombre, precio y categoría son obligatorios", "error");
      return;
    }
    setSubiendo(true);

    try {
      let imagen_url = "";
      if (imagenFile) {
        const fileExt = imagenFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("imagenes-productos")
          .upload(fileName, imagenFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("imagenes-productos").getPublicUrl(fileName);

        imagen_url = publicUrl;
      }

      const tallasArray = tallasInput
        ? tallasInput.split(",").map((t) => t.trim())
        : [];
      const coloresArray = coloresInput
        ? coloresInput.split(",").map((c) => c.trim())
        : [];

      await crearProducto({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria_id: categoriaId,
        tallas: tallasArray,
        colores: coloresArray,
        stock: parseInt(stock) || 0,
        imagen_url,
      });

      addToast("¡Producto agregado con éxito!", "success");

      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoriaId("");
      setTallasInput("");
      setColoresInput("");
      setStock("");
      setImagenFile(null);

      cargarProductos();
    } catch (error: any) {
      addToast("Error al guardar: " + error.message, "error");
    } finally {
      setSubiendo(false);
    }
  }

  function handleEliminar(id: string) {
    setProductoAEliminar(id);
  }

  async function confirmarEliminacion() {
    if (!productoAEliminar) return;

    try {
      console.log("Intentando eliminar producto con ID:", productoAEliminar);

      await eliminarProducto(productoAEliminar);

      addToast("Producto eliminado correctamente", "success");

      // Forzamos la recarga de la lista y limpiamos el estado
      await cargarProductos();
      setProductoAEliminar(null);
    } catch (error: any) {
      console.error("Error detallado al eliminar:", error);
      addToast(
        "Error al eliminar: " +
          (error.message || "Revisa permisos en Supabase"),
        "error",
      );
      setProductoAEliminar(null);
    }
  }
  if (loading) return <div className="p-8 text-center">Cargando panel...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Panel de Administración
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
        >
          <LogOut className="h-4 w-4" /> Cerrar Sesión
        </button>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5" /> Agregar Nuevo Producto
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del producto *
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio *
            </label>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tallas (separadas por coma)
            </label>
            <input
              value={tallasInput}
              onChange={(e) => setTallasInput(e.target.value)}
              placeholder="Ej: S, M, L"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colores (separados por coma)
            </label>
            <input
              value={coloresInput}
              onChange={(e) => setColoresInput(e.target.value)}
              placeholder="Ej: Rojo, Azul"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen del producto
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-white hover:file:bg-gray-800"
              />
              {imagenFile && (
                <span className="text-sm text-green-600">
                  ✓ {imagenFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={subiendo}
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {subiendo ? (
                <>
                  <Upload className="h-4 w-4 animate-spin" /> Subiendo...
                </>
              ) : (
                "Guardar Producto"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Productos Actuales ({productos.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Imagen
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Nombre
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Categoría
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Precio
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={p.imagen_url || "https://via.placeholder.com/50"}
                      alt={p.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {p.categorias?.nombre || "Sin categoría"}
                  </td>
                  <td className="px-4 py-3">${p.precio.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEliminar(p.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!productoAEliminar}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer. El producto se eliminará permanentemente."
        onConfirm={confirmarEliminacion}
        onCancel={() => setProductoAEliminar(null)}
      />
    </div>
  );
}

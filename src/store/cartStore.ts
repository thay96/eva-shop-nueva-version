import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Producto } from '../types/product';

export interface CartItem extends Producto {
  cantidad: number;
  tallaElegida: string;
  colorElegido: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, talla: string, color: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const currentItems = get().items;
        // Verificar si ya existe el mismo producto con la misma talla y color
        const existingItem = currentItems.find(
          (item) => item.id === newItem.id && item.tallaElegida === newItem.tallaElegida && item.colorElegido === newItem.colorElegido
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === newItem.id && item.tallaElegida === newItem.tallaElegida && item.colorElegido === newItem.colorElegido
                ? { ...item, cantidad: item.cantidad + newItem.cantidad }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },
      removeItem: (id, talla, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.tallaElegida === talla && item.colorElegido === color)
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.precio * item.cantidad, 0),
    }),
    { name: 'eva-shop-cart' } // Esto guarda el carrito en el navegador del usuario
  )
);
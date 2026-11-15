import { create } from "zustand";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  tallaElegida: string;
  colorElegido: string;
  imagen_url?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, talla: string, color: string) => void;
  updateQuantity: (id: string, talla: string, color: string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.id === item.id &&
          i.tallaElegida === item.tallaElegida &&
          i.colorElegido === item.colorElegido
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id &&
            i.tallaElegida === item.tallaElegida &&
            i.colorElegido === item.colorElegido
              ? { ...i, cantidad: i.cantidad + item.cantidad }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (id, talla, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.id === id && i.tallaElegida === talla && i.colorElegido === color)
      ),
    })),

  updateQuantity: (id, talla, color, cantidad) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.tallaElegida === talla && i.colorElegido === color
          ? { ...i, cantidad }
          : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
}));
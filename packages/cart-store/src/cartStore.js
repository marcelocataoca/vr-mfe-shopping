import { create } from 'zustand';
import { toCartItem } from './toCartItem';

export const useCartStore = create((set) => ({
  isOpen: false,
  items: [],

  addItem: (product) => {
    const line = toCartItem(product);
    set((state) => {
      const existing = state.items.find((item) => item.id === line.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === line.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, line] };
    });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));

export function getTotalQuantity(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

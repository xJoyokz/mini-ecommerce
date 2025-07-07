import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
  category: string
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            const updatedItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )

            return {
              items: updatedItems,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + item.price,
            }
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }
        }),

      removeItem: (id) =>
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id)

          if (!itemToRemove) return state

          return {
            items: state.items.filter((item) => item.id !== id),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
          }
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id)

          if (!item) return state

          const quantityDiff = quantity - item.quantity

          return {
            items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
            totalItems: state.totalItems + quantityDiff,
            totalPrice: state.totalPrice + item.price * quantityDiff,
          }
        }),

      clearCart: () =>
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
)

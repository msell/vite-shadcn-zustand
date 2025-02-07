import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type Product } from '@/types/Product'
import { devtools } from 'zustand/middleware'

interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  // Computed values
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: (product: Product) => {
          set(
            (state) => {
              const existingItem = state.items.find(
                (item) => item.product.id === product.id,
              )

              const newItems = existingItem
                ? state.items.map((item) =>
                    item.product.id === product.id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item,
                  )
                : [...state.items, { product, quantity: 1 }]

              return {
                items: newItems,
                totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: newItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                ),
              }
            },
            false,
            'addItem'
          )
        },

        removeItem: (productId: string) => {
          set(
            (state) => {
              const newItems = state.items.filter((item) => item.product.id !== productId)
              return {
                items: newItems,
                totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: newItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                ),
              }
            },
            false,
            'removeItem'
          )
        },

        updateQuantity: (productId: string, quantity: number) => {
          set(
            (state) => {
              const newItems = state.items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item,
              )
              return {
                items: newItems,
                totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: newItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                ),
              }
            },
            false,
            'updateQuantity'
          )
        },

        clearCart: () => {
          set(
            {
              items: [],
              totalItems: 0,
              totalPrice: 0,
            },
            false,
            'clearCart'
          )
        },

        totalItems: 0,
        totalPrice: 0,
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
        }),
      }
    ),
    {
      name: 'Cart Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)
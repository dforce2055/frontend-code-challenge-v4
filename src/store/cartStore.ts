import { create } from 'zustand'
import { useNotificationStore } from './notificationStore'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  itemsCount: number
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  itemsCount: 0,
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id)
    let newItems;
    if (existingItem) {
      newItems = state.items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
      useNotificationStore.getState().addNotification({
        message: `One more unit of ${item.name} has been added to your cart`,
        type: 'success'
      })
    } else {
      newItems = [...state.items, { ...item, quantity: 1 }]
      useNotificationStore.getState().addNotification({
        message: `The product ${item.name} has been successfully added to your cart`,
        type: 'success'
      })
    }
    const newItemsCount = newItems.reduce((total, item) => total + item.quantity, 0)
    return {
      items: newItems,
      itemsCount: newItemsCount
    }
  }),
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter(item => item.id !== id)
    const newItemsCount = newItems.reduce((total, item) => total + item.quantity, 0)
    return {
      items: newItems,
      itemsCount: newItemsCount
    }
  }),
  clearCart: () => set({ items: [], itemsCount: 0 }),
}))
// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  unit: string
}

interface CartState {
  items: CartItem[]
  deliveryFee: number
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  deliveryFee: parseFloat(localStorage.getItem('deliveryFee') || '0')
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart(state) {
      state.items = []
      state.deliveryFee = 0
      localStorage.setItem('cart', '[]')
      localStorage.setItem('deliveryFee', '0')
    },
    setDeliveryFee(state, action: PayloadAction<number>) {
      state.deliveryFee = action.payload
      localStorage.setItem('deliveryFee', action.payload.toString())
    }
  }
})

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setDeliveryFee
} = cartSlice.actions

export default cartSlice.reducer

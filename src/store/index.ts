// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import bookingReducer from './slices/bookTourSlice'  

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    booking: bookingReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

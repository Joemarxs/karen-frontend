// src/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setDeliveryFee
} from '../store/slices/cartSlice'

export function useCart() {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    items,
    total,
    deliveryFee,
    addItem: (item: Parameters<typeof addItem>[0]) => dispatch(addItem(item)),
    removeItem: (id: number) => dispatch(removeItem(id)),
    updateQuantity: (id: number, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    setDeliveryFee: (fee: number) => dispatch(setDeliveryFee(fee))
  }
}

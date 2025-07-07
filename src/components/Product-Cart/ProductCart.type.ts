import { CartItem } from '@/store/cartStore'

export interface ProductCartProps {
  item: CartItem
  onRemove: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
}

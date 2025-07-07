import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'

export const useCart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [subtotal, setSubtotal] = useState(0)
  const shipping = 10
  const total = subtotal + shipping

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const calculatedSubtotal = items.reduce(
      (acc: number, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    )
    setSubtotal(calculatedSubtotal)
  }, [items])

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  return {
    items,
    subtotal,
    shipping,
    total,
    handleQuantityChange,
    handleRemoveItem,
    isChecked,
    setIsChecked,
  }
}

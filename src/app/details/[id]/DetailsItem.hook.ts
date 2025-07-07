'use client'

import { getProductDetailsURL } from '@/services/url/products'
import { useState, useEffect } from 'react'
import { Product } from './DetailsItem.type'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

export const useProductDetails = () => {
  const { id } = useParams()

  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const cartItems = useCartStore((state) => state.items)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [isInCart, setIsInCart] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(getProductDetailsURL(id?.toString()))

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetails()
    }
  }, [id])

  // Check if product is already in cart
  useEffect(() => {
    if (product && product.id) {
      const cartItem = cartItems.find((item) => item.id === product.id)
      if (cartItem) {
        setIsInCart(true)
        setQuantity(cartItem.quantity || 1)
      } else {
        setIsInCart(false)
        setQuantity(1)
      }
    }
  }, [product, cartItems])

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleAddToCart = () => {
    if (!product) return

    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
    }

    console.log('Adding product to cart:', itemToAdd)
    addItem(itemToAdd)

    // Log the updated cart after adding the item
    console.log('Current cart items:', [...cartItems, itemToAdd])
  }

  const handleIncreaseQuantity = () => {
    if (!product || !product.id) return

    if (isInCart) {
      updateQuantity(product.id, quantity + 1)
    } else {
      handleAddToCart()
    }
  }

  const handleDecreaseQuantity = () => {
    if (!product || !product.id || !isInCart) return

    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
    } else {
      handleRemoveFromCart()
    }
  }

  const handleRemoveFromCart = () => {
    if (!product || !product.id) return

    removeItem(product.id)
    setIsInCart(false)
    setQuantity(1)
  }

  return {
    product,
    loading,
    error,
    selectedImageIndex,
    handleImageSelect,
    handleAddToCart,
    isInCart,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
  }
}

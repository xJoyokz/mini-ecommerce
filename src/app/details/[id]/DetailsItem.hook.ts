'use client'

import { getProductDetailsURL } from '@/services/url/products'
import { useState, useEffect } from 'react'
import { Product } from './DetailsItem.type'

export const useProductDetails = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(getProductDetailsURL(id))

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

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  return {
    product,
    loading,
    error,
    selectedImageIndex,
    handleImageSelect,
  }
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/components/Card/Card.type'
import { Category } from '@/components/SideBar/SideBar.type'
import { CategoryResponse, DummyJSONResponse } from './ListItem.type'
import {
  LIST_CATEGORIES_URL,
  getProductsWithPaginationURL,
  getSearchProductsURL,
  getCategoryProductsURL,
} from '@/services/url/products'

export const useProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [categoryQuery, setCategoryQuery] = useState<string | null>(null)
  const [availableCategories, setAvailableCategories] = useState<CategoryResponse[]>([])
  const limit = 9 // Number of products per page

  // Fetch available categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(LIST_CATEGORIES_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      // The API returns an array of category objects
      const categories: CategoryResponse[] = await response.json()
      console.log('Categories from API:', categories)
      setAvailableCategories(categories)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const skip = (currentPage - 1) * limit

      // Determine which API endpoint to use based on filters
      let url = ''
      if (searchQuery) {
        url = getSearchProductsURL(searchQuery, limit, skip)
      } else if (categoryQuery) {
        url = getCategoryProductsURL(categoryQuery, limit, skip)
      } else {
        url = getProductsWithPaginationURL(limit, skip)
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data: DummyJSONResponse = await response.json()

      // Calculate total pages
      setTotalPages(Math.ceil(data.total / limit))

      // Map the DummyJSON product format to our app's Product format
      const mappedProducts: Product[] = data.products.map((product) => ({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        outOfStock: product.stock <= 0,
      }))

      setProducts(mappedProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, categoryQuery, limit])

  // Effect to fetch categories when component mounts
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCategoryQuery(null) // Reset category when searching
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleCategoryChange = (category: string | null) => {
    setCategoryQuery(category)
    setSearchQuery('') // Reset search when changing category
    setCurrentPage(1) // Reset to first page when changing category
  }

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    categoryQuery,
    categories: availableCategories.map((category): Category => {
      return {
        label: category.name,
        value: category.slug, // Use the slug for API category filtering
        count: 0, // We don't have count info from the API
      }
    }),
    handlePageChange,
    handleSearch,
    handleCategoryChange,
  }
}

import { useState, useEffect } from 'react'
import { Form, UploadFile } from 'antd'
import { ADD_NEW_PRODUCT_URL, LIST_CATEGORIES_URL } from '@/services/url/products'
import { useRouter } from 'next/navigation'
import { ProductFormValues } from './FormProduct.type'

// Define the category type that could be either a string or an object
export type Category =
  | string
  | {
      name: string
      slug?: string
      url?: string
      [key: string]: string | number | boolean | undefined
    }

export const useFormProduct = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(LIST_CATEGORIES_URL)
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const onFinish = async (values: ProductFormValues) => {
    setLoading(true)
    try {
      const images =
        values.images?.map((file: UploadFile) => {
          if (file.originFileObj) {
            return file.name || ''
          }

          return file.url || ''
        }) || []

      const productData = {
        ...values,
        images: images.filter(Boolean),
        thumbnail: images[0] || '',
      }

      const response = await fetch(ADD_NEW_PRODUCT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      const result = await response.json()

      if (response.ok) {
        setShowModal(true)
      } else {
        throw new Error(result.message || 'Failed to add product')
      }
    } catch (error) {
      console.error('Error adding product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/list')
  }

  return { form, loading, categories, onFinish, handleCancel, showModal, setShowModal }
}

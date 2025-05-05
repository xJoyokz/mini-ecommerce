// Define the API response type based on the DummyJSON API
export interface DummyJSONResponse {
  products: DummyJSONProduct[]
  total: number
  skip: number
  limit: number
}

// Define the category response from API
export interface CategoryResponse {
  slug: string
  name: string
  url: string
}

// Define the DummyJSONProduct type based on the API
export interface DummyJSONProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

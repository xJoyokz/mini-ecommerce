export const LIST_CATEGORIES_URL = 'https://dummyjson.com/products/categories'
export const LIST_PRODUCTS_URL = 'https://dummyjson.com/products'
export const SEARCH_PRODUCTS_URL = 'https://dummyjson.com/products/search'
export const CATEGORY_PRODUCTS_URL = 'https://dummyjson.com/products/category'

export const getProductsWithPaginationURL = (limit: number, skip: number) =>
  `${LIST_PRODUCTS_URL}?limit=${limit}&skip=${skip}`

export const getSearchProductsURL = (query: string, limit: number, skip: number) =>
  `${SEARCH_PRODUCTS_URL}?q=${query}&limit=${limit}&skip=${skip}`

export const getCategoryProductsURL = (category: string, limit: number, skip: number) =>
  `${CATEGORY_PRODUCTS_URL}/${category}?limit=${limit}&skip=${skip}`
export const getProductDetailsURL = (id: string) => `${LIST_PRODUCTS_URL}/${id}`

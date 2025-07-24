import { UploadFile } from 'antd'

export interface ProductFormValues {
  title: string
  description: string
  price: number
  stock: number
  category: string
  images?: UploadFile[]
  [key: string]: string | number | UploadFile[] | undefined
}

import { UploadFile } from 'antd'

export interface UploadMediaProps {
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  onChange?: (fileList: UploadFile[]) => void
  value?: UploadFile[]
  buttonStyle?: boolean
  accept?: string
  title?: string
  subTitle?: string
}

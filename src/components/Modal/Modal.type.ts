import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  subDescription?: string
  buttonText?: string
  onButtonClick?: () => void
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  customHeader?: ReactNode
  hideHeader?: boolean
  showLogoInHeader?: boolean
  logoWidth?: number
  logoHeight?: number
}

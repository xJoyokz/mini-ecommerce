import React from 'react'
import { Modal as AntModal } from 'antd'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import { ModalProps } from './Modal.type'

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Modal Title',
  description,
  subDescription,
  buttonText = 'OK',
  onButtonClick,
  imageSrc,
  imageAlt = 'Modal image',
  imageWidth = 200,
  imageHeight = 200,
  customHeader,
  hideHeader = false,
  showLogoInHeader = false,
  logoWidth = 100,
  logoHeight = 60,
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    } else {
      onClose()
    }
  }

  const renderHeader = () => {
    if (hideHeader) return null

    if (customHeader) return customHeader

    if (showLogoInHeader) {
      return (
        <div className='flex items-center gap-3'>
          <Image src='/img/Logo.png' alt='Logo' width={logoWidth} height={logoHeight} />
        </div>
      )
    }

    return title
  }

  return (
    <AntModal open={isOpen} onCancel={onClose} footer={null} centered title={renderHeader()}>
      <div className='flex flex-col items-center gap-2 py-4'>
        {imageSrc && (
          <div className='my-4 flex justify-center'>
            <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />
          </div>
        )}

        {description && <h1 className='text-2xl font-bold'>{description}</h1>}
        {subDescription && <p className='text-center text-gray-500'>{subDescription}</p>}
        <Button variant='primary' className='mt-4 py-4' onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
    </AntModal>
  )
}

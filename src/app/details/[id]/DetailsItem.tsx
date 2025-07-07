'use client'

import React from 'react'
import Image from 'next/image'
import { useProductDetails } from './DetailsItem.hook'

const DetailsItem: React.FC = () => {
  const {
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
  } = useProductDetails()

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold text-red-600'>Error Loading Product</h2>
          <p className='text-gray-700'>{error}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold text-gray-700'>Product Not Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto'>
      <div className='mt-4 mb-4'>
        <button
          onClick={() => window.history.back()}
          className='flex cursor-pointer items-center text-gray-700 hover:text-gray-900'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2'
          >
            <path d='M19 12H5M12 19l-7-7 7-7' />
          </svg>
          Back
        </button>
        <hr className='my-2 border-gray-200' />
      </div>

      <div className='flex flex-col items-center gap-8 px-24 py-8 md:flex-col lg:flex-row'>
        <div className='md:w-1/2 lg:w-1/2'>
          <div className='relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100'>
            <Image
              src={product.images[selectedImageIndex] || product.thumbnail}
              alt={product.title}
              fill
              className='object-contain'
            />
          </div>

          <div className='flex gap-2 overflow-x-auto pb-2'>
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${selectedImageIndex === index ? 'border-black' : 'border-transparent'} `}
              >
                <div className='relative h-full w-full'>
                  <Image
                    src={image}
                    alt={`${product.title} - image ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full max-w-[500px]'>
          <div className='mb-6 text-gray-600'>
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1).replace(/-/g, ' ')}
          </div>

          <div className='mb-8 flex items-start justify-between'>
            <h1 className='text-3xl font-bold text-gray-900'>{product.title}</h1>
            <div className='text-3xl font-bold'>${product.price}</div>
          </div>

          <p className='mb-8 text-gray-700'>{product.description}</p>

          {isInCart ? (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center rounded-lg border border-gray-300'>
                  <button
                    onClick={handleDecreaseQuantity}
                    className='px-4 py-2 text-xl font-medium hover:bg-gray-100'
                  >
                    -
                  </button>
                  <span className='px-4 py-2 text-lg'>{quantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className='px-4 py-2 text-xl font-medium hover:bg-gray-100'
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className='rounded-lg border border-red-600 px-6 py-3 text-lg font-medium text-red-600 transition-colors hover:bg-red-50'
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className='w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-gray-800'
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailsItem

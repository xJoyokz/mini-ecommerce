import React from 'react'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }
  return (
    <button
      onClick={handleGoBack}
      className='flex cursor-pointer items-center pr-4 text-gray-700 hover:text-gray-900'
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
  )
}

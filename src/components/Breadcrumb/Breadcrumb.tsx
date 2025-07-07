'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.type'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ productName }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const getItems = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter((path) => path)

    // Start with back button instead of Home
    const items: BreadcrumbItem[] = [{ label: 'Back', href: '#', isBackButton: true }]

    paths.forEach((path, index) => {
      if (index === paths.length - 1 && productName && /^\d+$/.test(path)) {
        items.push({
          label: productName,
          href: `/${paths.slice(0, index + 1).join('/')}`,
          isActive: true,
        })
      } else {
        const pathLabel = path
          .replace(/-/g, ' ')
          .replace(/\[|\]/g, '')
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

        items.push({
          label: pathLabel,
          href: `/${paths.slice(0, index + 1).join('/')}`,
          isActive: index === paths.length - 1,
        })
      }
    })

    // Add Payment item if current page is Cart
    if (pathname === '/cart') {
      items.push({
        label: 'Payment',
        href: '/payment',
        isActive: false,
      })
    }

    return items
  }

  const items = getItems()

  return (
    <nav className='flex items-center text-sm'>
      {items.map((item, index) => (
        <React.Fragment key={item.href + index}>
          {index > 0 && <span className='mx-2 text-gray-500'>{'>'}</span>}
          {item.isBackButton ? (
            <button
              onClick={handleGoBack}
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
          ) : item.isActive ? (
            <span className='font-medium text-orange-500'>{item.label}</span>
          ) : (
            <Link href={item.href} className='text-gray-500 hover:text-gray-800'>
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb

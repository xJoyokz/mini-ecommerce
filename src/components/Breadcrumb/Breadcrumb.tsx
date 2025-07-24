'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BackButton } from '../Back-Button/BackButton'

import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.type'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ productName }) => {
  const pathname = usePathname()

  const getItems = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter((path) => path)

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

    if (pathname === '/payment') {
      const cartItemIndex = items.findIndex((item) => item.label === 'Cart')
      if (cartItemIndex === -1) {
        items.splice(items.length - 1, 0, {
          label: 'Cart',
          href: '/cart',
          isActive: false,
        })
      }
    }

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
          {index > 0 && index > 1 && <span className='mx-2 text-gray-500'>{'>'}</span>}
          {item.isBackButton ? (
            <BackButton />
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

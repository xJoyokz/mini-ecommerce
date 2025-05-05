'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BreadcrumbProps } from './Breadcrumb.type'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ productName }) => {
  const pathname = usePathname()

  const getItems = () => {
    const paths = pathname.split('/').filter((path) => path)

    const items = [{ label: 'Home', href: '/' }]

    paths.forEach((path, index) => {
      if (index === paths.length - 1 && productName && /^\d+$/.test(path)) {
        items.push({
          label: productName,
          href: `/${paths.slice(0, index + 1).join('/')}`,
        })
      } else {
        const pathLabel = path
          .replace(/-/g, ' ')
          .replace(/\[|\]/g, '')
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

        items.push({
          label: pathLabel,
          href: `/${paths.slice(0, index + 1).join('/')}`,
        })
      }
    })

    return items
  }

  const items = getItems()

  return (
    <nav className='mb-4 flex items-center text-sm'>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <span className='mx-2 text-gray-500'>/</span>}
          {index === items.length - 1 ? (
            <span className='font-medium text-gray-700'>{item.label}</span>
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

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from './Card.type'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function Card({ product }: ProductCardProps) {
  const router = useRouter()
  return (
    <div className='group relative w-full max-w-[287px] overflow-hidden bg-white'>
      <div className='relative h-[287px] overflow-hidden rounded-md border border-gray-200'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='cursor-pointer object-cover'
          onClick={() => router.push(`/details/${product?.id}`)}
        />
      </div>
      <div className='pt-2 pb-3'>
        <div className='mb-1 text-xs text-gray-500'>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' ')}
        </div>
        <div className='flex items-center justify-between'>
          <Link href={`/details/${product?.id}`} className='block'>
            <p className='mb-2text-base cursor-pointer font-medium text-black'>{product.name}</p>
          </Link>
          <div className='text-xl font-semibold'>${product.price}</div>
        </div>
      </div>
    </div>
  )
}

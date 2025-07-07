import Image from 'next/image'
import { ProductCartProps } from './ProductCart.type'

export default function ProductCart({ item, onRemove, onUpdateQuantity }: ProductCartProps) {
  return (
    <div className='relative rounded-lg p-4'>
      <div className='absolute top-4 right-6 cursor-pointer text-gray-500 hover:text-gray-700'>
        <button
          onClick={() => onRemove(item?.id || 0)}
          className='flex items-center justify-center'
          aria-label='Remove item'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        </button>
      </div>

      <div className='flex flex-col'>
        <div className='flex items-center'>
          <div className='flex-grow'>
            <Image
              src={item.thumbnail || ''}
              alt={item.title || ''}
              width={300}
              height={300}
              className='w-full rounded-md border border-gray-200 object-cover'
            />
            <div className='pt-2'>
              <div className='mb-1 text-xs text-gray-500'>
                {item.category
                  ? item.category.charAt(0).toUpperCase() +
                    item.category.slice(1).replace(/-/g, ' ')
                  : 'Product'}
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-base font-medium text-black'>{item.title}</p>
                <p className='text-base font-medium text-black'>${item.price}</p>
              </div>
            </div>
          </div>

          <div className='ml-2 flex flex-col self-center rounded-md border border-gray-300'>
            <button
              onClick={() =>
                item.id && item.quantity && onUpdateQuantity(item.id, item.quantity + 1)
              }
              className='cursor-pointer border-b border-gray-300 px-3 py-1'
            >
              +
            </button>
            <span className='px-3 py-1 text-center'>{item.quantity}</span>
            <button
              onClick={() =>
                item.id && item.quantity && onUpdateQuantity(item.id, item.quantity - 1)
              }
              className='cursor-pointer border-t border-gray-300 px-3 py-1'
              disabled={!item.quantity || item.quantity <= 1}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

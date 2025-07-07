'use client'

import Link from 'next/link'

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import ProductCart from '@/components/Product-Cart/ProductCart'
import { Col, Row } from 'antd'
import { useCart } from './Cart.hook'

export default function Cart() {
  const {
    items,
    subtotal,
    shipping,
    total,
    handleQuantityChange,
    handleRemoveItem,
    isChecked,
    setIsChecked,
  } = useCart()

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb />
      <hr className='mt-2 mb-8 border-gray-200' />
      <div className='flex flex-col gap-6 lg:flex-row'>
        <div className='flex-grow'>
          {items.length === 0 ? (
            <div className='py-10 text-center'>
              <h2 className='mb-4 text-xl font-medium'>Your cart is empty</h2>
              <Link href='/list' className='text-blue-600 hover:underline'>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <Row gutter={[12, 12]}>
              {items.map((item) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} key={item.id} className='gap-2'>
                  <ProductCart
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleQuantityChange}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <div className='w-full lg:w-96'>
          <div className='rounded-md bg-white p-6 shadow-sm'>
            <h2 className='mb-6 text-lg font-medium'>ORDER SUMMARY</h2>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className='mt-4 border-t border-gray-200 pt-4'>
                <div className='flex justify-between font-medium'>
                  <span>TOTAL</span>
                  <div>
                    <span className='text-lg'>${total.toFixed(0)}</span>
                    <div className='text-xs text-gray-500'>(Tax incl.)</div>
                  </div>
                </div>
              </div>
              <div className='pt-4'>
                <label className='flex items-center gap-4'>
                  <input
                    type='checkbox'
                    className='rounded'
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span className='text-xs'>I agree to the Terms and Conditions</span>
                </label>
              </div>
              <button
                className='w-full cursor-pointer rounded bg-black py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400'
                disabled={!isChecked}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/Modal/Modal'

export default function Payment() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const shipping = 10
  const total = subtotal + shipping

  useEffect(() => {
    const calculatedSubtotal = items.reduce(
      (acc: number, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    )
    setSubtotal(calculatedSubtotal)
  }, [items])

  interface FormValues {
    addressLine: string
    city: string
    state: string
    postalCode: string
    paymentMethod: string
    cardholderName: string
    cardNumber: string
    expiryDate: string
    cvc: string
  }

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values)
    setLoading(true)
    clearCart()
    setLoading(false)
    setIsImageModalOpen(true)
    setTimeout(() => {
      form.resetFields()
    }, 1000)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb />
      <hr className='mt-2 mb-4 border-gray-200' />
      <div className='mx-auto max-w-6xl p-4'>
        <h1 className='mb-6 text-2xl font-bold'>Checkout</h1>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='mb-4 rounded-lg bg-white p-6 shadow-sm'>
              <h2 className='mb-3 text-lg font-semibold'>Personal details</h2>
              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                requiredMark={false}
                className='space-y-0'
              >
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                  <Form.Item
                    name='addressLine'
                    label='Address Line'
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <Input placeholder='P.O.Box 1223' />
                  </Form.Item>

                  <Form.Item
                    name='city'
                    label='City'
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <Input placeholder='Denpasar' />
                  </Form.Item>

                  <Form.Item
                    name='state'
                    label='State'
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <Input placeholder='Indonesia' />
                  </Form.Item>

                  <Form.Item
                    name='postalCode'
                    label='Postal Code'
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <Input placeholder='9090' />
                  </Form.Item>
                </div>

                <h2 className='mb-4 text-lg font-semibold'>Payment methods</h2>
                <div className='flex'>
                  <div className='flex items-center justify-center gap-4'>
                    <Image src='/img/visa.png' alt='Visa' width={46} height={32} />
                    <Image src='/img/paypal.png' alt='PayPal' width={46} height={32} />
                    <Image src='/img/master.png' alt='Mastercard' width={46} height={32} />
                  </div>
                </div>
                <div className='mt-4 space-y-4'>
                  <Form.Item
                    name='cardholderName'
                    label="Cardholder's name"
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <Input placeholder='Seen your card' />
                  </Form.Item>

                  <Form.Item
                    name='cardNumber'
                    label='Card number'
                    rules={[
                      { required: true, message: 'This field is required' },
                      {
                        pattern: /^[0-9]{16}$/,
                        message: 'Please enter a valid 16-digit card number',
                      },
                    ]}
                  >
                    <Input placeholder='Seen your card' maxLength={16} />
                  </Form.Item>

                  <div className='grid grid-cols-2 gap-4'>
                    <Form.Item
                      name='expiryDate'
                      label='Expiry'
                      rules={[
                        { required: true, message: 'This field is required' },
                        {
                          pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: 'Please use MM/YY format',
                        },
                      ]}
                    >
                      <Input placeholder='MM/YY' maxLength={5} />
                    </Form.Item>

                    <Form.Item
                      name='cvc'
                      label='CVC'
                      rules={[
                        { required: true, message: 'This field is required' },
                        { pattern: /^[0-9]{3,4}$/, message: 'Please enter a valid CVC' },
                      ]}
                    >
                      <Input placeholder='123' maxLength={4} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='sticky top-6 rounded-lg bg-white p-6 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold'>Order Summary</h2>

              <div className='mb-6 space-y-4'>
                {items.map((item) => (
                  <div key={item.id} className='flex items-center gap-3'>
                    <div className='relative h-16 w-16 overflow-hidden rounded bg-gray-100'>
                      {item.thumbnail && (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          className='h-full w-full object-cover'
                          width={64}
                          height={64}
                        />
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium'>{item.title}</p>
                      <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                    </div>
                    <div className='font-medium'>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className='space-y-2 border-t border-gray-200 pt-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className='flex justify-between border-t border-gray-200 pt-2 text-lg font-semibold'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className='mt-6'>
                <Button
                  variant='primary'
                  fullWidth
                  onClick={() => form.submit()}
                  isLoading={loading}
                >
                  Checkout
                </Button>
                <Button variant='secondary' fullWidth href='/cart' className='mt-2'>
                  Return to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        description='Payment Successful'
        subDescription='Thank you! Your payment was successful.'
        imageSrc='/img/payment-success.svg'
        imageAlt='Payment Success'
        imageWidth={150}
        imageHeight={150}
        buttonText='Home'
        onButtonClick={() => router.push('/')}
        showLogoInHeader={true}
      />
    </div>
  )
}

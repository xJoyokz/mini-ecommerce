'use client'

import { Form, Input, InputNumber, Select } from 'antd'
import { useRouter } from 'next/navigation'

import UploadMedia from '@/components/Upload-Media/UploadMedia'
import Button from '@/components/Button/Button'
import { BackButton } from '@/components/Back-Button/BackButton'

import { useFormProduct, Category } from './FormProduct.hook'
import { Modal } from '@/components/Modal/Modal'

const { Option } = Select
const { TextArea } = Input

export default function FormProduct() {
  const { form, loading, categories, onFinish, handleCancel, setShowModal, showModal } =
    useFormProduct()

  const getCategoryValue = (category: Category): string => {
    if (typeof category === 'string') return category
    return category.slug || category.name
  }

  const getCategoryLabel = (category: Category): string => {
    if (typeof category === 'string') return category
    return category.name
  }

  const router = useRouter()

  return (
    <div className='container mx-auto px-4 py-4'>
      <BackButton />
      <hr className='mt-2 mb-4 border-gray-200' />
      <div className='mx-auto max-w-3xl p-4'>
        <h1 className='mb-1 text-2xl font-bold'>Add New Product</h1>
        <p className='mb-6 text-gray-500'>
          Enter product details, set availability, and submit to list the item.
        </p>
        <Form form={form} layout='vertical' onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name='title'
            label='Name'
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder='Enter product name here' />
          </Form.Item>

          <Form.Item
            name='category'
            label='Category'
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder='Select product category'>
              {categories?.map((category) => (
                <Option key={getCategoryValue(category)} value={getCategoryValue(category)}>
                  {getCategoryLabel(category)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Form.Item
              name='price'
              label='Price'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumber placeholder='Enter price here' min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name='stock'
              label='Stocks'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumber placeholder='Enter stocks here' min={1} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name='description'
            label='Description'
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TextArea rows={4} placeholder='Type description here' />
          </Form.Item>

          <Form.Item
            name='images'
            label='Product Picture'
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UploadMedia
              maxFiles={5}
              maxSize={10}
              accept='.jpg,.png,.svg,.zip'
              title='Media Upload'
              subTitle='Add your documents here, and you can upload up to 5 files max'
            />
          </Form.Item>

          <div className='mt-8 flex justify-end gap-4'>
            <Button onClick={handleCancel} variant='secondary'>
              Cancel
            </Button>
            <Button variant='primary' type='submit' loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        description='Successfully Add Product'
        subDescription='Congratulations! Your product has been added successfully'
        imageSrc='/img/add-product.png'
        imageAlt='Add Product Success'
        imageWidth={150}
        imageHeight={150}
        buttonText='Home'
        onButtonClick={() => router.push('/')}
        showLogoInHeader={true}
      />
    </div>
  )
}

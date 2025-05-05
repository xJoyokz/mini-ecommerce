'use client'

import React from 'react'
import { Row, Col, Spin, Input, Pagination, Empty, Alert } from 'antd'
import { useProductList } from './ListItem.hook'
import Sidebar from '@/components/SideBar/SideBar'
import Card from '@/components/Card/Card'

const { Search } = Input

export default function ListPage() {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    categoryQuery,
    categories,
    handlePageChange,
    handleSearch,
    handleCategoryChange,
  } = useProductList()

  const selectedCategoryName = React.useMemo(() => {
    if (!categoryQuery) return null
    const category = categories.find((cat) => cat.value === categoryQuery)
    return category?.label || categoryQuery
  }, [categoryQuery, categories])

  return (
    <div className='container mx-auto px-6 py-8'>
      <Row gutter={[40, 24]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={4}>
          <Sidebar
            categories={categories}
            selectedCategory={categoryQuery}
            onCategoryChange={handleCategoryChange}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={20}>
          <div className='mb-8'>
            <h1 className='mb-6 text-2xl font-semibold'>PRODUCTS</h1>
            <div className='flex items-center justify-between'>
              <div>
                <Search
                  placeholder='Search Products'
                  allowClear
                  className='w-3 rounded-md'
                  enterButton={false}
                  size='large'
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
              <button className='flex items-center gap-2 bg-white px-4 py-2 text-sm text-orange-400'>
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
                  <line x1='12' y1='5' x2='12' y2='19'></line>
                  <line x1='5' y1='12' x2='19' y2='12'></line>
                </svg>
                <span className='mr-2 text-sm'>Add Product</span>
              </button>
            </div>
          </div>
          {error && (
            <Alert message='Error' description={error} type='error' showIcon className='mb-6' />
          )}

          {loading ? (
            <div className='flex h-96 items-center justify-center'>
              <Spin size='large' tip='Loading products...'>
                <div className='h-[200px] w-[200px]'></div>
              </Spin>
            </div>
          ) : products.length > 0 ? (
            <>
              <Row gutter={[24, 40]}>
                {products.map((product) => (
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} key={product?.id}>
                    <Card product={product} />
                  </Col>
                ))}
              </Row>

              <div className='mt-12 flex justify-center'>
                <Pagination
                  current={currentPage}
                  total={totalPages * 10}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                />
              </div>
            </>
          ) : (
            <Empty
              description={
                <span className='text-lg'>
                  {searchQuery
                    ? `No products found for "${searchQuery}"`
                    : categoryQuery
                      ? `No products found in ${selectedCategoryName}`
                      : 'No products found'}
                </span>
              }
              className='my-12'
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Checkbox, Typography, Collapse } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { SideBarProps } from './SideBar.type'

const { Title } = Typography
const { Panel } = Collapse

// Custom expand icon component
const ExpandIcon = ({ isActive }: { isActive?: boolean }) => (
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
    className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
  >
    <polyline points='6 9 12 15 18 9'></polyline>
  </svg>
)

const Sidebar: React.FC<SideBarProps> = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
}) => {
  const [activePanels, setActivePanels] = useState<string | string[]>(['category'])

  useEffect(() => {
    console.log('Categories in SideBar:', categories)
  }, [categories])

  const handleCategoryChange = (e: CheckboxChangeEvent, categoryValue: string) => {
    // If this category is already selected, deselect it
    if (selectedCategory === categoryValue) {
      onCategoryChange(null)
    } else {
      // Otherwise select the new category
      onCategoryChange(categoryValue)
    }
  }

  return (
    <div className='sidebar-container font-poppins'>
      <Title level={5} className='mb-4 text-sm font-medium text-gray-500 uppercase'>
        FILTERS
      </Title>

      <Collapse
        activeKey={activePanels}
        onChange={setActivePanels}
        className='bg-transparent'
        expandIconPosition='end'
        expandIcon={({ isActive }) => <ExpandIcon isActive={isActive} />}
      >
        <Panel
          header={
            <Title level={5} className='m-0 text-base capitalize'>
              Category
            </Title>
          }
          key='category'
          className='mb-4'
        >
          <div className=''>
            {categories.map((category, index) => (
              <div
                key={`${category.value || index}`}
                className='mb-2 flex items-center justify-between'
              >
                <Checkbox
                  checked={selectedCategory === category.value}
                  onChange={(e) => handleCategoryChange(e, category.value)}
                  className='category-checkbox flex-grow'
                >
                  <span className='text-sm capitalize'>
                    {category.label || `Category ${index}`}
                  </span>
                </Checkbox>
                {category.count > 0 && (
                  <span className='text-xs text-gray-400'>({category.count})</span>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default Sidebar

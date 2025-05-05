'use client'

import React from 'react'
import { Form, Select, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { InputSelectProps } from './Input.type.'

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  helperText,
  tooltip,
  rules,
  options = [],
  className,
  ...props
}) => {
  const formItemClassName = `input-select-wrapper ${className || ''}`

  // Prepare the label with optional tooltip
  const formLabel = tooltip ? (
    <span>
      {label}{' '}
      <Tooltip title={tooltip}>
        <QuestionCircleOutlined className='text-gray-400' />
      </Tooltip>
    </span>
  ) : (
    label
  )

  return (
    <Form.Item
      name={name}
      label={formLabel}
      rules={rules}
      help={helperText}
      className={formItemClassName}
    >
      <Select className='font-poppins' options={options} {...props} />
    </Form.Item>
  )
}

export default InputSelect

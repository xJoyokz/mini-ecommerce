'use client'

import React from 'react'
import { Form, Input, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { InputTextProps } from './Input.type.'

const InputText: React.FC<InputTextProps> = ({
  name,
  label,
  helperText,
  tooltip,
  rules,
  className,
  ...props
}) => {
  const formItemClassName = `input-text-wrapper ${className || ''}`

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
      <Input className='font-poppins' {...props} />
    </Form.Item>
  )
}

export default InputText

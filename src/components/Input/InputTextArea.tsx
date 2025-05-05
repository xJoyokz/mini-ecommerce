'use client'

import React from 'react'
import { Form, Input, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { InputTextAreaProps } from './Input.type.'

const { TextArea } = Input

const InputTextArea: React.FC<InputTextAreaProps> = ({
  name,
  label,
  helperText,
  tooltip,
  rules,
  maxCount,
  className,
  ...props
}) => {
  const formItemClassName = `input-textarea-wrapper ${className || ''}`

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
      <TextArea
        className='font-poppins'
        showCount={maxCount ? true : false}
        maxLength={maxCount}
        autoSize={{ minRows: 3, maxRows: 6 }}
        {...props}
      />
    </Form.Item>
  )
}

export default InputTextArea

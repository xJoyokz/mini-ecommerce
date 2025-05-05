import React from 'react'
import { Button as AntButton } from 'antd'
import '../../styles/button.css'
import { ButtonProps } from './Button.type'
import type { ButtonProps as AntButtonProps } from 'antd'

// Map our variants to Ant Design types and custom classes
const variantMap: Record<
  NonNullable<ButtonProps['variant']>,
  {
    type?: AntButtonProps['type']
    ghost?: boolean
    danger?: boolean
    className: string
  }
> = {
  primary: {
    type: 'primary',
    className: 'btn-primary',
  },
  secondary: {
    type: 'default',
    className: 'btn-secondary',
  },
  success: {
    type: 'primary',
    className: 'btn-success',
  },
  danger: {
    type: 'primary',
    danger: true,
    className: 'btn-danger',
  },
  outline: {
    type: 'default',
    ghost: true,
    className: 'btn-outline',
  },
  text: {
    type: 'text',
    className: 'btn-text',
  },
}

// Size map
const sizeMap: Record<string, AntButtonProps['size']> = {
  small: 'small',
  medium: 'middle',
  large: 'large',
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'middle',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  onClick,
  className = '',
  ...props
}) => {
  // Get variant properties from map
  const { type: antType, ghost, danger, className: variantClass } = variantMap[variant]

  // Convert our size to Ant Design size
  const antSize = sizeMap[size] || 'middle'

  // Build className
  const combinedClassName = `
    button
    font-poppins
    ${variantClass}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  return (
    <AntButton
      htmlType={type as 'button' | 'submit' | 'reset'}
      type={antType}
      size={antSize}
      ghost={ghost}
      danger={danger}
      disabled={disabled}
      loading={isLoading}
      onClick={onClick}
      className={combinedClassName}
      block={fullWidth}
      {...props}
    >
      {children}
    </AntButton>
  )
}

export default Button

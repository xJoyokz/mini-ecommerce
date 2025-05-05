import type { ButtonProps as AntButtonProps } from 'antd'

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'variant'> {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'text'
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  fullWidth?: boolean
  isLoading?: boolean
}

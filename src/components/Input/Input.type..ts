import type {
  CheckboxProps as AntdCheckboxProps,
  DatePickerProps as AntdDatePickerProps,
  InputProps as AntdInputProps,
  SelectProps as AntdSelectProps,
  SwitchProps as AntdSwitchProps,
} from 'antd'
import type { Rule } from 'antd/es/form'
import { NamePath } from 'antd/es/form/interface'
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input'

// Select option interface
export interface SelectOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
  children?: SelectOption[]
}

// Base interface for all input components
export interface InputProps {
  /**
   * The name of the input field in the form. - Optional
   */
  name?: NamePath | undefined
  /**
   * The label of the input field in the form. - Optional
   */
  label?: string | undefined
  /**
   * The helper text of the input field in the form. - Optional
   */
  helperText?: string | undefined
  /**
   * The tooltip of the input field in the form.
   */
  tooltip?: string | undefined
  /**
   * The rules of the input field in the form for validation. - Optional
   */
  rules?: Rule[] | undefined
  /**
   * The maximum count of the input field in the form for character limit. - Optional
   */
  maxCount?: number | undefined
  /**
   * The className of the input field in the form. - Optional
   */
  className?: string | undefined
}

// Extended interfaces for specific input types
export interface InputTextProps extends InputProps, Omit<AntdInputProps, 'name'> {}

export interface InputTextAreaProps extends InputProps, Omit<AntdTextAreaProps, 'name'> {}

export interface InputSelectProps extends InputProps, Omit<AntdSelectProps, 'name'> {
  options?: SelectOption[]
}

export interface InputCheckboxProps extends InputProps, Omit<AntdCheckboxProps, 'name'> {
  valuePropName?: string
}

export interface InputDateProps extends InputProps, Omit<AntdDatePickerProps, 'name'> {}

export interface InputSwitchProps extends InputProps, Omit<AntdSwitchProps, 'name'> {
  valuePropName?: string
}

export interface InputPercentageProps extends InputProps, Omit<AntdInputProps, 'name'> {
  decimalScale?: number
  allowNegative?: boolean
}

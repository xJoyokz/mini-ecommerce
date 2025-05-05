import InputText from './InputText'
import InputTextArea from './InputTextArea'
import InputSelect from './InputSelect'

// Export all component types
export * from './Input.type.'

// Export the components
export { InputText, InputTextArea, InputSelect }

// Default export for convenience
const Input = {
  Text: InputText,
  TextArea: InputTextArea,
  Select: InputSelect,
}

export default Input

import InputText from './InputText'
import InputTextArea from './InputTextArea'
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputDate from './InputDate'
import InputSwitch from './InputSwitch'
import InputPercentage from './InputPercentage'

// Export all component types
export * from './Input.type.'

// Export the components
export {
  InputText,
  InputTextArea,
  InputSelect,
  InputCheckbox,
  InputDate,
  InputSwitch,
  InputPercentage,
}

// Default export for convenience
export default {
  Text: InputText,
  TextArea: InputTextArea,
  Select: InputSelect,
  Checkbox: InputCheckbox,
  Date: InputDate,
  Switch: InputSwitch,
  Percentage: InputPercentage,
}

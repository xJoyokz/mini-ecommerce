import { InputDateProps } from "@/types/components/form";
import { CloseCircle } from "iconsax-react";
import { DatePicker, Form } from "antd";

export default function InputDate({
  label,
  name,
  helperText,
  rules,
  tooltip,
  allowClear,
  ...props
}: InputDateProps) {
  return (
    <Form.Item
      label={label}
      name={name}
      extra={helperText}
      rules={rules}
      tooltip={tooltip}
    >
      <DatePicker
        placeholder={props.disabled ? "" : "Select date"}
        style={{ width: "100%" }}
        allowClear={
          allowClear
            ? { clearIcon: <CloseCircle size={16} /> }
            : { clearIcon: <span></span> }
        }
        {...props}
      />
    </Form.Item>
  );
}

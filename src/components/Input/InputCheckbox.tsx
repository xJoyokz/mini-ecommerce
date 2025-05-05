import { InputCheckboxProps } from "@/types/components/form";
import { Checkbox, Form } from "antd";
import React from "react";

export default function InputCheckbox({
  name,
  rules,
  valuePropName,
  className,
  ...props
}: InputCheckboxProps) {
  return (
    <Form.Item
      className={className}
      valuePropName={valuePropName}
      name={name}
      rules={rules}
    >
      <Checkbox {...props} />
    </Form.Item>
  );
}

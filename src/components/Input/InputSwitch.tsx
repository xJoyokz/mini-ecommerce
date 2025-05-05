import { InputCheckboxProps, InputSwitchProps } from "@/types/components/form";
import { Form, Switch } from "antd";
import React, { forwardRef } from "react";

const InputSwitch = forwardRef<HTMLButtonElement, InputSwitchProps>(
  ({ className, rules, name, ...props }, ref) => {
    return (
      <Form.Item className={className} name={name} rules={rules}>
        <Switch ref={ref} {...props} />
      </Form.Item>
    );
  }
);

InputSwitch.displayName = "InputSwitch";
export default InputSwitch;

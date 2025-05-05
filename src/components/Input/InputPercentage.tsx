"use client";

import { InputTextProps } from "@/types/components/form";
import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { Form, Input } from "antd";

const InputPercentage: React.FC<InputTextProps> = ({
  label,
  name,
  helperText,
  rules,
  tooltip,
  allowClear,
  className,
  ...props
}) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^(\d{1,2}(\,\d{1,3})?|100(\,0{1,3})?)$/;

    if (regex.test(value) && Number(value.replace(",", ".")) <= 100) {
      setError("");
      props.onChange && props.onChange(e);
    } else {
      setError("Please enter a valid percentage between 0 and 100.");
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      extra={helperText}
      rules={[
        ...(rules || []),
        {
          validator: () => (error ? Promise.reject(error) : Promise.resolve()),
        },
      ]}
      tooltip={tooltip}
      className={className}
    >
      <Input
        allowClear={
          allowClear
            ? { clearIcon: <CloseCircle size={16} /> }
            : { clearIcon: <span></span> }
        }
        {...props}
        onChange={handleChange}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Form.Item>
  );
};

export default InputPercentage;

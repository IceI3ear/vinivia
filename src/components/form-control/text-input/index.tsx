import { Form, FormItemProps, Input } from "antd";
import { ChangeEventHandler } from "react";

import "./styles.scss";

export interface ITextInputProps extends FormItemProps {
  placeholder?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput({
  placeholder,
  disabled,
  onChange,
  ...props
}: ITextInputProps) {
  return (
    <Form.Item className="form-input" {...props}>
      <Input
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </Form.Item>
  );
}

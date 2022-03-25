import { ChangeEvent, ReactNode } from "react";
import { Form, FormItemProps, Input } from "antd";

import "./styles.scss";

export interface IPasswordInputProps extends FormItemProps {
  disabled?: boolean;
  placeholder?: string;
  iconRender?: (visible: boolean) => ReactNode;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  disabled,
  placeholder,
  iconRender,
  className,
  onChange,
  ...props
}: IPasswordInputProps) {
  return (
    <Form.Item className="form-input" {...props}>
      <Input.Password
        disabled={disabled}
        placeholder={placeholder}
        iconRender={iconRender}
        className={className}
        onChange={onChange}
      />
    </Form.Item>
  );
}

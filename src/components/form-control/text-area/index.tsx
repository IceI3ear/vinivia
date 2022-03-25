import { Form, FormItemProps, Input } from "antd";

import "./styles.scss";

interface TextAreaInputProps extends FormItemProps {
  disabled?: boolean;
  placeholder?: string;
  autoSize?: boolean;
}

export function TextArea({
  disabled,
  placeholder,
  autoSize,
  ...props
}: TextAreaInputProps) {
  return (
    <Form.Item className="form-input-wrapper" {...props}>
      <Input.TextArea
        className="text-area-custom"
        autoSize={autoSize}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  );
}

TextArea.defaultProps = {
  disabled: false,
  placeholder: "",
  autoSize: false
};

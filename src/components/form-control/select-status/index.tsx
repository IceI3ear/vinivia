import { Form, FormItemProps, Select } from "antd";
import { MouseEventHandler } from "react";

import "./styles.scss";

export interface ISelectProps extends FormItemProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  onChange?: (value: string) => void;
  options: Array<string>;
  disabled?: boolean;
  defaultValue?: string;
}

export default function SelectStatus({
  onClick,
  onChange,
  options,
  disabled,
  defaultValue,
  ...props
}: ISelectProps) {
  const { Option } = Select;

  return (
    <Form.Item className="form-select" {...props}>
      <Select
        onClick={onClick}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <Option value={option} key={index}>
            <span className={option}>{option}</span>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

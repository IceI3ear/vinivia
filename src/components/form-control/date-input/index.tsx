import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

import "./styles.scss";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export interface IDateInputProps {
  disabled?: boolean;
  initialValue?: string;
  onChange?: (date: Dayjs | null, dateString: string) => void;
}

export default function DateInput({
  disabled,
  onChange,
  initialValue
}: IDateInputProps) {
  return (
    <DatePicker
      onChange={onChange}
      format="DD/MM/YYYY"
      defaultValue={dayjs(initialValue as string)}
      disabled={disabled}
    />
  );
}

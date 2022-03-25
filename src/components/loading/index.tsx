import { Spin, SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./styles.scss";

const antIcon = <LoadingOutlined />;

export default function Loading({ ...props }: SpinProps) {
  return <Spin indicator={antIcon} {...props} />;
}

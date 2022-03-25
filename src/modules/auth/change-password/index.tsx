import { Button, Form } from "antd";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";

import PasswordInput from "components/form-control/password-input";
import CommonModal from "components/modal/common-modal";
import { regex } from "./constant";
import "./styles.scss";

export interface IValuePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePasswordProps {
  isVisible: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function ChangePassword({
  isVisible,
  onSave,
  onCancel
}: IChangePasswordProps) {
  const [form] = Form.useForm();
  const [isDescription, setIsDescription] = useState<boolean>(true);

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      setIsDescription(true);
    } else {
      setIsDescription(false);
    }
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value)) {
      setIsDescription(true);
    } else {
      setIsDescription(false);
    }
  };

  const handleSave = (values: IValuePassword) => {
    console.log("values:", values);
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
    setIsDescription(true);
    form.resetFields();
  };
  return (
    <div>
      <CommonModal
        width={494}
        visible={isVisible}
        okText={"SAVE"}
        className="form-password"
      >
        <div className="title">Change Password</div>
        <Form
          form={form}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleSave}
        >
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "This field is required" }]}
            placeholder="Type your password"
            hasFeedback
          />
          <div className="current-password">
            <PasswordInput
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "This field is required" },
                {
                  pattern: regex,
                  message: ""
                }
              ]}
              placeholder="Type your password"
              onChange={(e) => handleChangeNewPassword(e)}
              hasFeedback
            />
          </div>
          <PasswordInput
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            placeholder="Type your password"
            onChange={(e) => handleChangeConfirmPassword(e)}
            rules={[
              {
                required: true,
                message: "This field is required"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Confirm password does not match")
                  );
                }
              }),
              {
                pattern: regex,
                message: ""
              }
            ]}
            hasFeedback
          />
          <div
            className={clsx("description", {
              "description-error": !isDescription
            })}
          >
            Password must be 8-16 characters long, and contain one uppercase and
            one lowercase character
          </div>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="default" className=" mr-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </CommonModal>
    </div>
  );
}

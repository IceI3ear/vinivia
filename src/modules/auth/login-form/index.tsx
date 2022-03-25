import { Form, Input, Button, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hook";
import { UserIcon, LogoLogin, LockIcon } from "assets/icons";
import { adminLogin, login } from "store/auth.slice";
import { IAdmin } from "types/admin/admin";
import "./styles.scss";

interface IValuesLogin {
  userName: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const listAdmin = useAppSelector(adminLogin);

  const isCheck = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (isCheck) {
      navigate("/");
    }
  }, [isCheck, navigate]);

  const handleLogin = (values: IValuesLogin) => {
    dispatch(login());
    const findAdmin = listAdmin.find(
      (item: IAdmin) =>
        item.userName === values.userName && item.password === values.password
    );
    findAdmin
      ? localStorage.setItem("accessToken", JSON.stringify("Success"))
      : message.error("Username or password incorrect");
  };

  return (
    <div className="form-login">
      <LogoLogin />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserIcon className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockIcon className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

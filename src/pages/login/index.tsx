import LoginForm from "modules/auth/login-form";
import "./styles.scss";

export default function LoginLayout() {
  return (
    <div className="login">
      <div className="login-layout">
        <LoginForm />
      </div>
    </div>
  );
}

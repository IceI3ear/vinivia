import { Navigate, Outlet, Route } from "react-router-dom";

import { login } from "./routes.paths";

export interface IPrivateRouterProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: IPrivateRouterProps) {
  const accessToken = Boolean(localStorage.getItem("accessToken"));
  return !accessToken ? <Navigate to={login.PATH_LOGIN} /> : children;
}

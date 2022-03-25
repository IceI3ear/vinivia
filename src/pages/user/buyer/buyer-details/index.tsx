import { Divider } from "antd";
import { NavLink, Outlet } from "react-router-dom";

import "./styles.scss";

export default function BuyerDetail() {
  const id: string | null = localStorage.getItem("id");

  return (
    <div className="buyer-detail-container">
      <div className="buyer-detail-header">
        <div className="sidebar">
          <NavLink
            to={`/user/buyer/${id}/buyer-details/basic-information`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Basic Information
          </NavLink>
          <NavLink
            to={`/user/buyer/${id}/buyer-details/address`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Address
          </NavLink>
        </div>
      </div>
      <Divider />
      <Outlet />
    </div>
  );
}

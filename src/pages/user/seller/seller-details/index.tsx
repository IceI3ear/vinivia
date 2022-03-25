import { NavLink, Outlet } from "react-router-dom";

import "./styles.scss";

function SellerDetail() {
  const id: string | null = localStorage.getItem("id");

  return (
    <div className="seller-detail-container">
      <div className="seller-detail-header">
        <div className="sidebar">
          <NavLink
            to={`/user/seller/${id}/seller-details/basic-information`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Basic Information
          </NavLink>
          <NavLink
            to={`/user/seller/${id}/seller-details/address`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Address
          </NavLink>
          <NavLink
            to={`/user/seller/${id}/seller-details/products`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Products
          </NavLink>
          <NavLink
            to={`/user/seller/${id}/seller-details/livestream`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink-inactive"
            }
          >
            Livestream
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SellerDetail;

import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

import { SeparatorIcon } from "assets/icons";
import { breadcrumbNameMap } from "./constants";
import "./styles.scss";

export default function HeaderBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbSnippets = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    return (
      <Breadcrumb.Item key={url} className="breadcrumb-item">
        {index === 0 ? (
          <p>{breadcrumbNameMap[url]}</p>
        ) : (
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItem = breadcrumbSnippets.filter(
    (item) =>
      item.key !== "/user/buyer/buyer-details" &&
      item.key !== "/user/seller/seller-details"
  );

  return (
    <Breadcrumb className="breadcrumb" separator={<SeparatorIcon />}>
      {breadcrumbItem}
    </Breadcrumb>
  );
}

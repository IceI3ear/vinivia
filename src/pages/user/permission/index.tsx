import { Divider } from "antd";

import { PermissionListing } from "modules/user/permission/permission-list";
import { SearchSortFilter } from "modules/user/permission/search-sort-filter";

export default function Permission() {
  return (
    <div>
      <SearchSortFilter />
      <Divider />
      <PermissionListing />
    </div>
  );
}

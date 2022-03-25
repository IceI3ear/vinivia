import { Divider } from "antd";
import SearchSortFilter from "modules/user/admin/search-sort-filter";
import { AdminListing } from "modules/user/admin/admin-listing";

export default function Admin() {
  return (
    <>
      <SearchSortFilter />
      <Divider />
      <AdminListing />
    </>
  );
}

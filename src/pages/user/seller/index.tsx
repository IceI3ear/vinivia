import { Divider } from "antd";

import { SearchSortFilter } from "modules/user/seller/search-sort-filter";
import { SellerListing } from "modules/user/seller/seller-listing";

export default function Seller() {
  return (
    <>
      <SearchSortFilter />
      <Divider />
      <SellerListing />
    </>
  );
}

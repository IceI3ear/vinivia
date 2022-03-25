import { Divider } from "antd";

import SearchSortFilter from "modules/user/buyer/search-sort-filter";
import BuyerListing from "modules/user/buyer/buyer-listing";

export default function Buyer() {
  return (
    <>
      <div className="buyer-header">
        <SearchSortFilter />
      </div>
      <Divider />
      <div>
        <BuyerListing />
      </div>
    </>
  );
}

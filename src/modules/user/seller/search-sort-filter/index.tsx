import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParseParams } from "hooks/use-params";

import SearchInput from "modules/user/components/search-input";
import SortButton from "modules/user/components/sort-button";
import FilterButton from "modules/user/components/filter-button";
import { EStatus } from "modules/user/components/user.types";
import { initFilterByStatus } from "modules/user/components/user.const";
import "./styles.scss";

export function SearchSortFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentCondition = useParseParams();

  const currentFilterByStatus = useMemo(() => {
    if (currentCondition.status) {
      const arrStatus = currentCondition.status.split(";");
      return {
        [EStatus.Active]: arrStatus.includes(EStatus.Active),
        [EStatus.Inactive]: arrStatus.includes(EStatus.Inactive),
        [EStatus.Banned]: arrStatus.includes(EStatus.Banned)
      };
    }
    return initFilterByStatus;
  }, [currentCondition]);

  return (
    <div className="block-container">
      <SearchInput
        placeholder="Username, email, phone number"
        navigate={navigate}
        location={location}
        currentFilter={currentCondition}
      />
      <div className="sort-filter-container flex item-center">
        <div className="mr-3">
          <SortButton
            navigate={navigate}
            location={location}
            currentFilter={currentCondition}
          />
        </div>
        <div>
          <FilterButton
            filterByStatus={currentFilterByStatus}
            navigate={navigate}
            location={location}
            currentFilter={currentCondition}
          />
        </div>
      </div>
    </div>
  );
}

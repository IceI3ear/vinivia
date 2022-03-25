import { NavigateFunction, Location } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import clsx from "clsx";

import { CommonButton } from "components/button";
import { ArrowDownSortIcon } from "assets/icons";
import { initFilter } from "components/constants";
import { mergeParam } from "utils/helper";
import { sortBy, CurrentFilter } from "../user.types";
import "./styles.scss";

interface SortButtonProps {
  navigate: NavigateFunction;
  location: Location;
  currentFilter: CurrentFilter;
}

function SortButton({ navigate, location, currentFilter }: SortButtonProps) {
  const handleSort = (input?: string) => {
    const newUrl = mergeParam(location.pathname, {
      ...currentFilter,
      page: initFilter.page,
      sort: input
    });
    navigate(newUrl);
  };

  const menu = (
    <Menu className="sortby-dropdown-menu">
      <div className="sortby-dropdown-menu-container flex flex-column">
        <span
          onClick={() => handleSort()}
          className={clsx("sort-item", {
            "text-selected": !currentFilter.sort
          })}
        >
          Newest Created Date
        </span>
        <span
          onClick={() => handleSort(sortBy.DateCreatedOld)}
          className={clsx("sort-item", {
            "text-selected": currentFilter.sort === sortBy.DateCreatedOld
          })}
        >
          Oldest Created Date
        </span>
        <CommonButton
          onClick={() => handleSort()}
          variant="dashed"
          size="small"
          space="space-large"
          block={true}
          className="font-medium"
        >
          Reset
        </CommonButton>
      </div>
    </Menu>
  );

  return (
    <Dropdown placement="bottomLeft" overlay={menu}>
      <CommonButton
        size="middle"
        variant="dashed"
        icon={<ArrowDownSortIcon />}
        reverseIcon={true}
      >
        <span className="mr-2">Sort by</span>
      </CommonButton>
    </Dropdown>
  );
}

export default SortButton;

import { useState } from "react";
import { NavigateFunction, Location } from "react-router-dom";
import { Menu, Dropdown, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import { CommonButton } from "components/button";
import { initFilter } from "components/constants";
import { FilterIcon } from "assets/icons";
import { mergeParam } from "utils/helper";
import { EStatus, CurrentFilter, FilterType } from "../user.types";
import "./styles.scss";

interface FilteButtonProps {
  filterByStatus: FilterType;
  navigate: NavigateFunction;
  location: Location;
  currentFilter: CurrentFilter;
  mode?: "User" | "Admin";
}

function FilterButton({
  filterByStatus,
  navigate,
  location,
  currentFilter,
  mode = "User"
}: FilteButtonProps) {
  const [filter, setFilter] = useState<FilterType>({ ...filterByStatus });

  const handleChangeChecked = (e: CheckboxChangeEvent): void => {
    const { checked, value } = e.target;
    setFilter({ ...filter, [value]: checked });
  };

  const handleApply = () => {
    const newCondition = [];
    for (const [fielName, value] of Object.entries(filter)) {
      if (value) {
        newCondition.push(fielName);
      }
    }

    const newUrl = mergeParam(location.pathname, {
      ...currentFilter,
      page: initFilter.page,
      status: newCondition.length ? newCondition.join(";") : null
    });

    navigate(newUrl);
  };

  const handleReset = () => {
    setFilter({
      [EStatus.Active]: false,
      [EStatus.Inactive]: false,
      [EStatus.Banned]: false
    });
    const newUrl = mergeParam(location.pathname, {
      ...currentFilter,
      page: initFilter.page,
      status: ""
    });
    navigate(newUrl);
  };

  const menu = (
    <Menu className="filter-dropdown-menu">
      <div className="filter-dropdown-menu-container">
        <p className="checkbox-text">STATUS</p>
        <div className="checkbox-container">
          <Checkbox
            value={EStatus.Active}
            checked={filter[EStatus.Active]}
            onChange={handleChangeChecked}
          >
            Active
          </Checkbox>
          <Checkbox
            value={EStatus.Inactive}
            checked={filter[EStatus.Inactive]}
            onChange={handleChangeChecked}
          >
            Inactive
          </Checkbox>

          {mode !== "Admin" && (
            <Checkbox
              value={EStatus.Banned}
              checked={filter[EStatus.Banned]}
              onChange={handleChangeChecked}
            >
              Banned
            </Checkbox>
          )}
        </div>
        <div className="filter-dropdown-button-container flex justify-end">
          <div className="mr-2">
            <CommonButton
              onClick={handleApply}
              size="small"
              space="space-large"
              className="font-medium"
            >
              Apply
            </CommonButton>
          </div>
          <CommonButton
            onClick={handleReset}
            variant="dashed"
            size="small"
            space="space-large"
            className="font-medium"
          >
            Reset
          </CommonButton>
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <CommonButton size="middle" variant="dashed" icon={<FilterIcon />}>
        <span className="ml-2">Filter</span>
      </CommonButton>
    </Dropdown>
  );
}

FilterButton.defaultProps = {
  mode: "User"
};

export default FilterButton;

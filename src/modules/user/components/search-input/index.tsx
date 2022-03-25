import { useState, ChangeEvent } from "react";
import { NavigateFunction, Location } from "react-router-dom";
import { Form } from "antd";

import { CommonButton } from "components/button";
import { mergeParam } from "utils/helper";
import { initFilter } from "components/constants";
import { SearchIcon, ClearInput } from "assets/icons";
import { CurrentFilter } from "../user.types";
import "./styles.scss";

interface SearchInputProps {
  navigate: NavigateFunction;
  location: Location;
  currentFilter: CurrentFilter;
  placeholder: string;
}

function SearchInput({
  navigate,
  location,
  currentFilter,
  placeholder
}: SearchInputProps) {
  const [keyword, setKeyword] = useState<string>(currentFilter.content || "");

  const handleChangeKeyWord = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchByKeyWord = () => {
    const newUrl = mergeParam(location.pathname, {
      ...currentFilter,
      page: initFilter.page,
      content: keyword
    });

    navigate(newUrl);
  };

  const handleClear = () => {
    setKeyword("");
    const newUrl = mergeParam(location.pathname, {
      ...currentFilter,
      page: initFilter.page,
      content: ""
    });

    navigate(newUrl);
  };

  return (
    <Form>
      <Form.Item>
        <div className="search-input-user flex item-center justify-between">
          <div className="flex item-center input-search">
            <SearchIcon className="mr-1-5" />
            <input
              type="text"
              maxLength={200}
              placeholder={placeholder}
              onChange={handleChangeKeyWord}
              value={keyword}
            />
          </div>
          <div className="btn-search">
            {keyword && (
              <ClearInput className="clear-input" onClick={handleClear} />
            )}
            <CommonButton htmlType="submit" onClick={handleSearchByKeyWord}>
              Search
            </CommonButton>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SearchInput;

import React from "react";
import { Pagination, Select } from "antd";
import "antd/dist/antd.css";

import { listSizePage } from "../constants";
import "./styles.scss";

export interface PaginationTableProp {
  pageSize: number;
  currentPage: number;
  totalPage?: number;
  totalItem?: number;
}
export default function PaginationTable({
  pageSize,
  totalPage = 0,
  totalItem = 0,
  currentPage
}: PaginationTableProp) {
  const { Option } = Select;

  return (
    <div className="pagination-container">
      <div className="records">
        <Select
          className="select-records"
          value={`${pageSize} records/ page`}
          placeholder="records/ page"
        >
          {listSizePage.map((item, sizeIdx) => (
            <Option value={item} key={`pagination-size-${sizeIdx}`}>
              {item} records/ page
            </Option>
          ))}
        </Select>
        <label htmlFor="records" className="lbl-records">
          <span>{totalItem} records</span>
        </label>
      </div>
      {totalPage > 1 && (
        <div className="choose-page">
          <Pagination
            size="default"
            defaultCurrent={currentPage}
            total={totalItem}
            pageSize={pageSize}
            showQuickJumper
            locale={{ jump_to: "Page", page: "" }}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

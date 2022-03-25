import { GetComponentProps, DefaultRecordType } from "rc-table/lib/interface";
import { Table as AntdTable } from "antd";

import "./styles.scss";

export interface TableProps {
  columns: any;
  data?: object[];
  loading?: boolean;
  onRow?: GetComponentProps<DefaultRecordType>;
}
export default function Table({ columns, data, loading, onRow }: TableProps) {
  return (
    <div className="table-container">
      <AntdTable
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        onRow={onRow}
        locale={{ emptyText: "No result found" }}
        scroll={{ y: 600, x: "auto" }}
      />
    </div>
  );
}

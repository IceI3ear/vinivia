import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Table from "components/Table";
import PaginationTable from "components/Pagination";
import SelectStatus from "components/form-control/select-status";
import { ConfirmModal } from "components/modal/modal-confirm";
import { useAppDispatch, useAppSelector } from "store/hook";
import { IAdmin } from "types/admin/admin";
import { getListAdmin, selectAdminList } from "store/admin.slice";
import { options } from "./constants";

export function AdminListing() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [valueSelectedStatus, setValueSelectedStatus] = useState<string>("");
  const adminData: IAdmin[] = useAppSelector(selectAdminList);

  const handleConfirm = (): void => {
    setIsModalVisible(false);
  };
  const handleCancel = (): void => {
    setIsModalVisible(false);
  };
  const handleSelectStatus = (status: string, number: any): void => {
    setIsModalVisible(true);
    setValueSelectedStatus(status);
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  useEffect(() => {
    dispatch(getListAdmin());
  }, [dispatch]);

  const columns = [
    {
      title: "No",
      dataIndex: "number",
      key: "number",
      width: 100,
      render: (text: any, record: IAdmin, index: number) =>
        index < 9 ? `0${index + 1}` : `${index + 1}`
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      width: 470
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 540
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: 360
    },
    {
      title: "Create Date",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 240,
      render: (dateUpdated: string, data: IAdmin) =>
        dayjs(dateUpdated).format("DD/MM/YYYY")
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 210,
      render: (status: string, data: IAdmin) => (
        <SelectStatus
          defaultValue={status}
          name="status"
          options={options}
          onChange={(value: string) => handleSelectStatus(value, data.id)}
          onClick={(e: MouseEvent<HTMLDivElement>) => handleClick(e)}
        />
      )
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={adminData}
        onRow={(record) => ({
          onClick: () => navigate(`/user/admin/${record.id}/admin-details`)
        })}
      />
      <PaginationTable
        pageSize={12}
        currentPage={1}
        totalPage={2}
        totalItem={12}
      />
      <ConfirmModal
        visible={isModalVisible}
        okText={valueSelectedStatus === "Banned" ? "Ban" : valueSelectedStatus}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        Are you sure to{" "}
        {valueSelectedStatus === "Banned"
          ? "ban"
          : valueSelectedStatus.toLocaleLowerCase()}{" "}
        this admin?
      </ConfirmModal>
    </div>
  );
}

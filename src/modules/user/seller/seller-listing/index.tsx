import { MouseEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Table from "components/Table";
import PaginationTable from "components/Pagination";
import { ConfirmModal } from "components/modal/modal-confirm";
import { options } from "modules/user/components/user.const";
import { useAppDispatch, useAppSelector } from "store/hook";
import { getListUser, updateUser } from "store/users.slice";
import { IUser } from "types/user/user";
import { IPermissionGroup } from "types/permission-group/permission-group";
import { Select } from "antd";
import { UpdateUserRequest } from "services/users.services";

const { Option } = Select;

export function SellerListing() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [valueSelectedStatus, setValueSelectedStatus] = useState<string>("");

  const [rowSelected, setRowSelected] = useState<IUser>({});
  const { userList } = useAppSelector((state) => state.user);
  const sellerList = userList.filter((user) => user.isSeller === true);

  const handleConfirm = () => {
    setIsModalVisible(false);
    const user: UpdateUserRequest = {
      ...rowSelected,
      status: valueSelectedStatus
    };
    if (rowSelected.id) {
      const { id } = rowSelected;
      dispatch(updateUser({ id, user }));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectStatus = (status: string, userData: IUser) => {
    setIsModalVisible(true);
    setValueSelectedStatus(status);
    setRowSelected(userData);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleClickRow = (record: IUser) => {
    navigate(`/user/seller/${record.id}/seller-details/basic-information`);
    record.id && localStorage.setItem("id", record.id);
  };

  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);

  const columns = [
    {
      title: "No",
      dataIndex: "number",
      key: "number",
      width: 100,
      render: (text: any, record: IUser, index: number) =>
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
      render: (dateUpdated: string, data: IPermissionGroup) =>
        dayjs(dateUpdated).format("DD/MM/YYYY")
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: string, data: IUser) => (
        <div className="select">
          <Select
            value={status}
            onChange={(value: string) => handleSelectStatus(value, data)}
            onClick={(e: MouseEvent<HTMLDivElement>) => handleClick(e)}
          >
            {options.map((option, index) => (
              <Option value={option} key={index}>
                <span className={option}>{option}</span>
              </Option>
            ))}
          </Select>
        </div>
      )
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={sellerList}
        onRow={(record) => ({
          onClick: () => handleClickRow(record)
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
        this seller?
      </ConfirmModal>
    </div>
  );
}

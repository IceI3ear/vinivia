import dayjs from "dayjs";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

import { useAppDispatch, useAppSelector } from "store/hook";
import Table from "components/Table";
import PaginationTable from "components/Pagination";
import {
  getAllPermissionGroup,
  listPermissionGroup,
  updatePermissionGroup
} from "store/permission-group.slice";
import { ConfirmModal } from "components/modal/modal-confirm";
import { IPermissionGroup } from "types/permission-group/permission-group";
import { permission } from "routes/routes.paths";
import { options } from "./constants";
import "./styles.scss";

const { Option } = Select;

export function PermissionListing() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [valueSelectedStatusConfirm, setValueSelectedStatusConfirm] =
    useState<string>("");
  const permissionGroups = useAppSelector(listPermissionGroup);
  const [id, setId] = useState<string>("");
  const [body, setBody] = useState<IPermissionGroup>({
    name: "",
    description: "",
    permission: [],
    status: "",
    isDeleted: false,
    deletedAt: "",
    dateCreated: "",
    dateUpdated: ""
  });

  useEffect(() => {
    dispatch(getAllPermissionGroup());
  }, [dispatch]);

  const handleConfirm = () => {
    const params = { id, body };
    dispatch(updatePermissionGroup(params));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectStatus = (status: string, data: IPermissionGroup) => {
    if (data.id) {
      setId(data.id);
    }
    const dateUpdated = dayjs(Date.now()).toISOString();
    const value = {
      name: data.name,
      description: data.description,
      permission: data.permission,
      status,
      isDeleted: data.isDeleted,
      deletedAt: data.deletedAt,
      dateCreated: data.dateCreated,
      dateUpdated
    };
    setBody(value);
    setValueSelectedStatusConfirm(status);
    setIsModalVisible(true);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      width: 100,
      render: (value: string, data: IPermissionGroup, index: string) =>
        index.toString().length < 2 ? `0${index + 1}` : index + 1
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      width: 400
    },
    {
      title: "Created Date",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 300,
      render: (dateCreated: string, data: IPermissionGroup) =>
        dayjs(dateCreated).format("DD/MM/YYYY")
    },
    {
      title: "Updated Date",
      dataIndex: "dateUpdated",
      key: "dateUpdated",
      width: 300,
      render: (dateUpdated: string, data: IPermissionGroup) =>
        dayjs(dateUpdated).format("DD/MM/YYYY")
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 105,
      render: (status: string, data: IPermissionGroup) => (
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
        data={permissionGroups}
        onRow={(record) => ({
          onClick: () =>
            navigate(`/user/permission/${record.id}/permission-details`)
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
        okText={valueSelectedStatusConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        Are you sure to {valueSelectedStatusConfirm.toLocaleLowerCase()} this
        group permission?
      </ConfirmModal>
    </div>
  );
}

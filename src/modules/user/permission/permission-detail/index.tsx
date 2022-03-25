import { useEffect, useState } from "react";
import { Col, Divider, Form, Row, Switch } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  getPermissionGroupDetail,
  permissionGroupDetail
} from "store/permission-group.slice";
import { PencilIcon } from "assets/icons";
import { CommonButton } from "components/button";
import { TextArea } from "components/form-control/text-area";
import TextInput from "components/form-control/text-input";
import SelectStatus from "components/form-control/select-status";
import { options } from "../permission-list/constants";
import { FieldManagement } from "./constants";
import "./styles.scss";

interface IValueSave {
  groupName: string;
  status: boolean;
  description: string;
}

export interface IPermissionDetailProps {}

export default function PermissionDetail(props: IPermissionDetailProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const permissionGroupDetails = useAppSelector(permissionGroupDetail);

  useEffect(() => {
    if (id) {
      dispatch(getPermissionGroupDetail(id));
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSave = (values: IValueSave) => {
    setIsEdit(false);
  };

  return (
    <>
      <Divider />
      <div className="permission-detail">
        <Form className="basic-information-form" onFinish={handleSave}>
          {isEdit ? (
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <TextInput
                  initialValue={permissionGroupDetails.name}
                  label="Group Name"
                  name="groupName"
                  placeholder="Text input"
                  rules={[
                    { required: true, message: "Group name is required" }
                  ]}
                />
                <SelectStatus
                  options={options}
                  label="Status"
                  initialValue={permissionGroupDetails.status}
                  name="status"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <TextArea
                  initialValue={permissionGroupDetails.description}
                  placeholder="Type description here"
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Description is required" }
                  ]}
                />
              </Col>
            </Row>
          ) : (
            <>
              <div className="title">
                <div className="name">{permissionGroupDetails.name}</div>
                <div
                  className={clsx("status Active", {
                    "status Inactive":
                      permissionGroupDetails.status === "Inactive"
                  })}
                >
                  {permissionGroupDetails.status}
                </div>
              </div>
              <div className="content">
                {permissionGroupDetails.description}
              </div>
            </>
          )}

          <Row gutter={[24, 24]}>
            {FieldManagement.map((item, index) => (
              <Col className="gutter-row" span={6} key={index}>
                <div
                  className={clsx(
                    "fields",
                    (index === 0 ||
                      index === 1 ||
                      index === 2 ||
                      index === 3) &&
                      "min-height-74"
                  )}
                >
                  <div className="field-name">
                    {item.fieldName}
                    <Switch defaultChecked={item.status} />
                  </div>
                  <Divider />
                  {item.item.map((item2, index2) => (
                    <div className="field-item" key={index}>
                      {item2.action} <Switch defaultChecked={item2.status} />
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
          <div className="flex justify-end">
            {isEdit ? (
              <div className="flex">
                <div className="mr-4">
                  <CommonButton
                    size="large"
                    variant="dashed"
                    className="button-cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </CommonButton>
                </div>
                <div className="">
                  <CommonButton
                    size="large"
                    variant="primary"
                    htmlType="submit"
                    className="button-save"
                  >
                    Save
                  </CommonButton>
                </div>
              </div>
            ) : (
              <CommonButton
                variant="dashed"
                icon={<PencilIcon />}
                onClick={handleEdit}
              >
                Edit Group
              </CommonButton>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}

import Avatar from "antd/lib/avatar/avatar";
import { useEffect, useState } from "react";
import { Button, Divider, Form, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import {
  UserIcon,
  PencilIcon,
  CameraIcon,
  ArrowDownSortIcon,
  FlagIcon
} from "assets/icons";
import { useAppDispatch, useAppSelector } from "store/hook";
import { CommonButton } from "components/button";
import SelectStatus from "components/form-control/select-status";
import TextInput from "components/form-control/text-input";
import {
  getAdminById,
  selectAdminDetail,
  updateAdmin
} from "store/admin.slice";
import "./styles.scss";
import { IAdmin } from "types/admin/admin";
import {
  getAllPermissionGroup,
  listPermissionGroup
} from "store/permission-group.slice";
import { IPermissionGroup } from "types/permission-group/permission-group";
import { UpdateAdminRequest } from "services/admin.service";
import { statusOptions } from "./constans";
import SelectCountry from "./select-country";

const { Option } = Select;

export default function AdminDetail() {
  const [form] = Form.useForm();
  const [formSelected] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [groupPermissionSelect, setGroupPermissionSelect] =
    useState<string>("");
  const [prefixPhone, setPrefixPhone] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const adminData = useAppSelector(selectAdminDetail);
  const groupPermissionData = useAppSelector(listPermissionGroup);

  const groupPermission = groupPermissionData.find(
    (item: IPermissionGroup) => item.id === adminData.groupPermission
  );

  useEffect(() => {
    id && dispatch(getAdminById(id));
    dispatch(getAllPermissionGroup());
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue(adminData);
    formSelected.setFieldsValue(groupPermission);
    adminData.groupPermission &&
      setGroupPermissionSelect(adminData.groupPermission);
    adminData.prefixPhone && setPrefixPhone(adminData.prefixPhone);
  }, [adminData, form, formSelected, groupPermission]);

  const handleUpdate = (): void => {
    setIsUpdate(false);
    navigate(`/user/admin/${id}/admin-details/edit`);
  };
  const handleCancel = (): void => {
    setIsUpdate(true);
    navigate(`/user/admin/${id}/admin-details`);
    form.resetFields();
  };
  const handleSave = (values: IAdmin): void => {
    setIsUpdate(true);
    const admin: UpdateAdminRequest = {
      ...adminData,
      prefixPhone,
      userName: values.userName,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      status: values.status,
      groupPermission: groupPermissionSelect
    };
    id && dispatch(updateAdmin({ id, admin }));
    navigate(`/user/admin/${id}/admin-details`);
  };
  const handleToggleVisibleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };
  const handleChangeGroupPermission = (value: string): void => {
    const groupSelect = groupPermissionData.find((item) => item.name === value);
    groupSelect && groupSelect.id && setGroupPermissionSelect(groupSelect.id);
  };
  return (
    <>
      <Divider />
      <div className="container">
        <Form
          form={form}
          className="form-information"
          onFinish={handleSave}
          initialValues={adminData}
        >
          <div className="avt">
            <Avatar size={120} icon={<UserIcon />} />
            <div className={!isUpdate ? "camera" : "none"}>
              <CameraIcon />
            </div>
          </div>
          <div className="input-form">
            <div className="input-group">
              <div className="input">
                <span className="lbl-input">User Name *</span>
                <TextInput
                  name="userName"
                  disabled={isUpdate}
                  rules={[
                    { required: true, message: "Username is required" },
                    {
                      pattern: /^[a-zA-Z0-9]+$/,
                      message: "Username is alphanumeric characters"
                    }
                  ]}
                />
              </div>
              <div className="input">
                <span className="lbl-input">Name</span>
                <TextInput
                  name="fullName"
                  disabled={isUpdate}
                  rules={[
                    { required: true, message: "Name is required" },
                    {
                      min: 6,
                      message: "Minimum name length is 6 characters"
                    },
                    {
                      max: 56,
                      message: "Maximum name length is 56 characters"
                    }
                  ]}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input">
                <span className="lbl-input">Email</span>
                <TextInput
                  name="email"
                  disabled={isUpdate}
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid E-mail"
                    },
                    {
                      required: true,
                      message: "E-mail is required"
                    }
                  ]}
                />
              </div>
              <div className="input">
                <span className="lbl-input">Phone Number</span>
                <div className="group-phone-number">
                  <Button
                    disabled={isUpdate}
                    className="area-code flex item-center"
                    onClick={handleToggleVisibleModal}
                  >
                    <FlagIcon />
                    {prefixPhone}
                    <ArrowDownSortIcon />
                  </Button>
                  <div className="phone-number">
                    <TextInput
                      name="phone"
                      disabled={isUpdate}
                      rules={[
                        { required: true, message: "Phone number is required" }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-group">
              <div className="status">
                <span className="lbl-status">Status</span>
                <SelectStatus
                  options={statusOptions}
                  name="status"
                  disabled={isUpdate}
                  rules={[{ required: true, message: "Status is required" }]}
                />
              </div>
              <div className="status">
                <span className="lbl-status">Group Permission*</span>
                <Form
                  className="group-permission"
                  form={formSelected}
                  initialValues={groupPermission}
                >
                  <Form.Item name="name">
                    <Select
                      disabled={isUpdate}
                      defaultValue={groupPermission?.name}
                      notFoundContent={
                        <div className="no-found-item">
                          No groups has been created
                        </div>
                      }
                      onChange={handleChangeGroupPermission}
                    >
                      {groupPermissionData?.map((option) => (
                        <Option value={option.name} key={option.id}>
                          {option.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="button">
            {isUpdate ? (
              <CommonButton
                size="large"
                icon={<PencilIcon />}
                variant="dashed"
                onClick={handleUpdate}
              >
                <span className="span-tittle-button">Edit Admin Profile</span>
              </CommonButton>
            ) : (
              <div className="button-update">
                <div className="button-update-item">
                  <CommonButton
                    size="large"
                    variant="dashed"
                    onClick={handleCancel}
                  >
                    <span className="span-tittle-button-update">Cancel</span>
                  </CommonButton>
                </div>
                <div className="button-update-item">
                  <CommonButton
                    size="large"
                    variant="primary"
                    htmlType="submit"
                  >
                    <span className="span-tittle-button-update">Save</span>
                  </CommonButton>
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>
      <SelectCountry
        prefixPhone={prefixPhone}
        handleChangeCountry={setPrefixPhone}
        visible={isModalVisible}
        handleToggleVisibleModal={handleToggleVisibleModal}
      />
    </>
  );
}

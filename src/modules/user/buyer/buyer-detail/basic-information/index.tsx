import Avatar from "antd/lib/avatar/avatar";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { UpdateUserRequest } from "services/users.services";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/hook";
import { getUserById, selectUserDetail, updateUser } from "store/users.slice";
import { UserIcon, PencilIcon, CameraIcon } from "assets/icons";
import { CommonButton } from "components/button";
import DateInput from "components/form-control/date-input";
import SelectStatus from "components/form-control/select-status";
import TextInput from "components/form-control/text-input";
import { IUser } from "types/user/user";
import { rulesInput } from "utils/constants";
import { statusOptions } from "./constant";
import "./styles.scss";

export default function BasicInformation() {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formProfile] = Form.useForm();
  const location = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const buyerData = useAppSelector(selectUserDetail);

  let phone: string = "";
  if (buyerData.phone) {
    phone = `${buyerData.phone.slice(
      0,
      buyerData.phone.indexOf(")") + 1
    )} ${buyerData.phone
      .slice(buyerData.phone.indexOf(")") + 1)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  }
  const handleChangeStatus = (value: string): void => {
    setStatus(value);
  };
  const handleUpdate = (): void => {
    setIsUpdate(false);
    navigate(`/user/buyer/${id}/buyer-details/basic-information/edit`);
  };
  const handleCancel = (): void => {
    setIsUpdate(true);
    navigate(`/user/buyer/${id}/buyer-details/basic-information`);
    form.resetFields();
    formProfile.resetFields();
    buyerData.profile?.firstName && setFirstName(buyerData.profile.firstName);
  };
  const handleFirstName = (e: any): void => {
    setFirstName(e.target.value);
  };
  const handleSave = (values: IUser): void => {
    setIsUpdate(true);
    navigate(`/user/buyer/${id}/buyer-details/basic-information`);
    const user: UpdateUserRequest = {
      ...buyerData,
      userName: values.userName,
      profile: {
        ...buyerData.profile,
        firstName
      },
      status
    };
    id && dispatch(updateUser({ id, user }));
  };

  useEffect(() => {
    location.pathname ===
      `/user/buyer/${id}/buyer-details/basic-information/edit`
      ? setIsUpdate(false)
      : setIsUpdate(true);
  }, [location.pathname, id]);

  useEffect(() => {
    id && dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue(buyerData);
    formProfile.setFieldsValue(buyerData.profile);
    buyerData.status && setStatus(buyerData.status);
    buyerData.profile?.firstName && setFirstName(buyerData.profile.firstName);
  }, [buyerData, form, formProfile]);

  return (
    <div className="basic-information-container">
      <Form
        form={form}
        className="basic-information-form"
        initialValues={buyerData}
        onFinish={handleSave}
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
                  { required: true, message: "User Name is required" },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: "User Name is alphanumeric characters"
                  }
                ]}
              />
            </div>
            <div className="input">
              <span className="lbl-input">Name</span>
              <Form form={formProfile} initialValues={buyerData.profile}>
                <TextInput
                  name="firstName"
                  disabled={isUpdate}
                  rules={rulesInput}
                  onChange={handleFirstName}
                />
              </Form>
            </div>
          </div>
          <div className="input-group">
            <div className="input">
              <span className="lbl-input">Email</span>
              <TextInput name="email" disabled />
            </div>
            <div className="input">
              <span className="lbl-input">Phone Number</span>
              <div className="phone">
                <input
                  disabled
                  className="phone-number"
                  name="phone"
                  value={phone}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="input-group">
            <div className="input">
              <span className="lbl-input">Created Date</span>
              <Form.Item name="dateCreated">
                <DateInput disabled />
              </Form.Item>
            </div>
            <div className="status">
              <span className="lbl-status">Status</span>
              <SelectStatus
                options={statusOptions}
                name="status"
                disabled={isUpdate}
                onChange={handleChangeStatus}
              />
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
              <span className="span-tittle-button">Edit buyer profile</span>
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
                <CommonButton size="large" variant="primary" htmlType="submit">
                  <span className="span-tittle-button-update">Save</span>
                </CommonButton>
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

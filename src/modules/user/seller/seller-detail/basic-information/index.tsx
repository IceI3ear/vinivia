import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Image, Avatar } from "antd";
import { useDispatch } from "react-redux";

import { CommonButton } from "components/button";
import DateInput from "components/form-control/date-input";
import TextInput from "components/form-control/text-input";
import SelectStatus from "components/form-control/select-status";
import { TextArea } from "components/form-control/text-area";
import { options } from "modules/user/components/user.const";
import { PencilIcon } from "assets/icons";
import convertimg from "assets/image/convert-img.png";
import logo from "assets/image/logo-seller.png";
import "./styles.scss";
import { useAppSelector } from "store/hook";
import { getUserById, selectUserDetail } from "store/users.slice";
import {
  getListShopProfile,
  selectShopProfileList,
  updateShopProfile
} from "store/shop-profile.slice";
import { IShopProfile } from "types/shop/profile";
import { rulesInput } from "utils/constants";
import { UpdateShopProfileRequest } from "services/shop-profile.service";

function BasicInformation() {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formSeller] = Form.useForm();
  const location = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const sellerDetail = useAppSelector(selectUserDetail);
  const shopProfileList = useAppSelector(selectShopProfileList);
  const shopProfileDetail = shopProfileList.find(
    (item: IShopProfile) => item.user === id
  );

  let phone: string = "";
  if (sellerDetail.phone) {
    phone = `${sellerDetail.phone.slice(
      0,
      sellerDetail.phone.indexOf(")") + 1
    )} ${sellerDetail.phone
      .slice(sellerDetail.phone.indexOf(")") + 1)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  }
  const handleUpdate = (): void => {
    setIsUpdate(!isUpdate);
    navigate(`/user/seller/${id}/seller-details/basic-information/edit`);
  };
  const handleCancel = (): void => {
    setIsUpdate(true);
    navigate(`/user/seller/${id}/seller-details/basic-information`);
    form.resetFields();
  };
  const handleSave = (values: IShopProfile): void => {
    setIsUpdate(true);
    navigate(`/user/seller/${id}/seller-details/basic-information`);
    const shopProfile: UpdateShopProfileRequest = {
      ...shopProfileDetail,
      name: values.name,
      status: values.status,
      description: values.description
    };
    id && dispatch(updateShopProfile({ id, shopProfile }));
  };

  useEffect(() => {
    location.pathname ===
      `/user/seller/${id}/seller-details/basic-information/edit`
      ? setIsUpdate(false)
      : setIsUpdate(true);
  }, [location.pathname, id]);

  useEffect(() => {
    id && dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getListShopProfile());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue(shopProfileDetail);
    formSeller.setFieldsValue(sellerDetail);
  }, [shopProfileDetail, form, formSeller, sellerDetail]);

  return (
    <div className="seller-information ">
      <Form form={form} initialValues={shopProfileDetail} onFinish={handleSave}>
        <div className="image-information">
          <div className="img-cover">
            <Image src={convertimg} width="100%" height={200} />
          </div>
          <div className="avatar">
            <Avatar src={logo} size={120} />
          </div>
        </div>
        <div className="form-information">
          <div className="form-information-wrap">
            <div className="shop_name">
              <span className="lbl-input">Shop Name</span>
              <TextInput name="name" disabled={isUpdate} rules={rulesInput} />
            </div>
            <Form form={formSeller} initialValues={sellerDetail}>
              <div className="input-group">
                <div className="input-item">
                  <span className="lbl-input">Email</span>
                  <TextInput name="email" disabled />
                </div>
                <div className="input-item">
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
            </Form>
            <div className="input-group">
              <div className="input-item">
                <span className="lbl-input">Created Date</span>
                <Form.Item name="dateCreated">
                  <DateInput disabled />
                </Form.Item>
              </div>
              <div className="input-item status">
                <span className="lbl-input">Status</span>
                <SelectStatus
                  options={options}
                  name="status"
                  disabled={isUpdate}
                />
              </div>
            </div>
            <div className="description">
              <span className="lbl-input">Shop Description</span>
              <TextArea
                name="description"
                disabled={isUpdate}
                rules={[{ required: true, message: "Description is require" }]}
              />
            </div>
          </div>
          <div className="btn-edit">
            {isUpdate ? (
              <CommonButton
                size="large"
                icon={<PencilIcon />}
                variant="dashed"
                onClick={handleUpdate}
              >
                <span className="span-tittle-button">Edit seller profile</span>
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
        </div>
      </Form>
    </div>
  );
}

export default BasicInformation;

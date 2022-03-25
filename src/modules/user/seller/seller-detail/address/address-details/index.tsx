import { Button, Divider, Form, Input, Switch } from "antd";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./styles.scss";
import TextInput from "components/form-control/text-input";
import { CommonButton } from "components/button";
import CommonModal from "components/modal/common-modal";
import { ConfirmModal } from "components/modal/modal-confirm";
import {
  ArrowDownSortIcon,
  ArrowRightIcon,
  FlagIcon,
  SearchIcon
} from "assets/icons";
import { ICity } from "types/user/city";
import { sortCityByName } from "utils/helper";
import { rulesInput } from "utils/constants";
import { IAddress } from "types/user/address";
import {
  getListShopAddress,
  getShopAddressById,
  selectShopAddressDetail,
  selectShopAddressList,
  updateShopAddress
} from "store/shop-address.slice";
import { useForm } from "antd/lib/form/Form";
import { useAppSelector } from "store/hook";
import { dataCountry } from "modules/user/admin/admin-detail/select-country/constant";
import { cityList } from "./datamock";

export default function SellerAddressDetail() {
  const [isOpenModalCity, setIsOpenModalCity] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [citySelected, setCitySelected] = useState<string>("");
  const [isOpenModalGoBack, setIsOpenModalGoBack] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [prefixPhone, setPrefixPhone] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [formName] = useForm();
  const [formCountry] = useForm();

  const { idAddress, id } = useParams<{ idAddress: string; id: string }>();
  const listCitySorted: ICity[] = sortCityByName(cityList);
  const shopAddressDetail = useAppSelector(selectShopAddressDetail);
  const shopAddressDataAll = useAppSelector(selectShopAddressList);
  const shopAddressData = shopAddressDataAll.filter(
    (item) => item.shopProfile === id
  );
  const countryDetail = dataCountry.find(
    (item) => item.areaCode === prefixPhone
  );

  const separatorPhoneNumber = (numb: string): string =>
    numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const handleClickCity = (): void => {
    setIsOpenModalCity(true);
  };
  const handleCancelModalCity = (): void => {
    setIsOpenModalCity(false);
    setCitySelected(city);
  };
  const handleSaveModalCity = (): void => {
    setIsOpenModalCity(false);
    setCity(citySelected);
  };
  const handleChangeLabel = (e: string): void => {
    setLabel(e);
  };
  const handleChangeCity = (e: string[]): void => {
    const event = e.toString();
    setCitySelected(event);
  };
  const handleToggleModalGoBack = (): void => {
    setIsOpenModalGoBack(!isOpenModalGoBack);
  };
  const handleConfirmModalGoBack = (): void => {
    navigate(`/user/seller/${id}/seller-details/address/`);
  };
  const handleChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const phoneReg = e.target.value.replace(/\s/g, "");
    const re = /^[0-9\b]+$/;
    if (phoneReg === "" || re.test(phoneReg)) {
      setPhone(phoneReg);
    }
  };
  const handleChangeSwitch = (checked: boolean) => {
    setIsDefault(checked);
  };
  const handleSubmit = (values: IAddress) => {
    const shopAddress: IAddress = {
      ...shopAddressDetail,
      fullName: values.fullName,
      phone: `(${prefixPhone})`.concat(phone),
      city,
      address: values.address,
      label,
      isDefault: isDefault ? "default" : ""
    };
    if (idAddress) {
      const params = { id: idAddress, shopAddress };
      dispatch(updateShopAddress(params));
    }
    if (isDefault) {
      const addressDefault = {
        ...shopAddressData.find((item) => item.isDefault === "default"),
        isDefault: ""
      };
      if (addressDefault.id) {
        const params = { id: addressDefault.id, shopAddress: addressDefault };
        dispatch(updateShopAddress(params));
      }
    }
    navigate(`/user/seller/${id}/seller-details/address/`);
  };

  useEffect(() => {
    dispatch(getListShopAddress());
    idAddress && dispatch(getShopAddressById(idAddress));
  }, [dispatch, idAddress]);
  useEffect(() => {
    form.setFieldsValue(shopAddressDetail);
    formCountry.setFieldsValue(countryDetail);
  }, [shopAddressDetail, form, formName, formCountry, countryDetail]);
  useEffect(() => {
    shopAddressDetail.label && setLabel(shopAddressDetail.label);
    if (shopAddressDetail.phone) {
      setPhone(
        shopAddressDetail.phone.slice(shopAddressDetail.phone.indexOf(")") + 1)
      );
      setPrefixPhone(
        shopAddressDetail.phone.slice(1, shopAddressDetail.phone.indexOf(")"))
      );
    }
    if (shopAddressDetail.city) {
      setCity(shopAddressDetail.city);
      setCitySelected(shopAddressDetail.city);
    }
    shopAddressDetail.isDefault ? setIsDefault(true) : setIsDefault(false);
  }, [
    shopAddressDetail.city,
    shopAddressDetail.isDefault,
    shopAddressDetail.label,
    shopAddressDetail.phone
  ]);

  return (
    <div className="address-details-container">
      <Form
        form={form}
        className="address-details-form"
        initialValues={shopAddressDetail}
        onFinish={handleSubmit}
      >
        <div className="address-details-input">
          <span className="lbl-input">Recipient's Name</span>
          <TextInput name="fullName" rules={rulesInput} />
        </div>
        <div className="address-details-input">
          <span className="lbl-input">Phone Number</span>
          <div className="phone-number-input">
            <Button disabled className="area-code flex item-center">
              <FlagIcon />
              {`(${prefixPhone})`}
              <ArrowDownSortIcon />
            </Button>
            <input
              className="phone-number"
              name="phoneNumber"
              value={separatorPhoneNumber(phone)}
              onChange={handleChangePhoneNumber}
              type="text"
            />
          </div>
        </div>
        <div className="address-details-input">
          <div className="address-details-county-city">
            <div className="country-city">
              <span className="lbl-input">Country</span>
              <Form form={formCountry}>
                <TextInput name="country" disabled />
              </Form>
            </div>
            <div className="country-city">
              <span className="lbl-input">City</span>
              <div className="city" onClick={handleClickCity}>
                <p>{city}</p>
                <ArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="address-details-input">
          <span className="lbl-input">Detail Address</span>
          <TextInput name="address" rules={rulesInput} />
          <TextInput name="subAddress2" placeholder="Address 2" />
        </div>
        <div className="address-details-switch">
          <p>Label as</p>
          <div className="group-label-as">
            <div
              className={clsx(
                "button-label",
                label === "Office" && "button-label-active"
              )}
              onClick={() => handleChangeLabel("Office")}
            >
              Office
            </div>
            <div
              className={clsx(
                "button-label",
                label === "Home" && "button-label-active"
              )}
              onClick={() => handleChangeLabel("Home")}
            >
              Home
            </div>
          </div>
        </div>
        <div className="address-details-switch">
          <p>Set as default address</p>
          <Switch checked={isDefault} onChange={handleChangeSwitch} />
        </div>
        <div className="address-details-button">
          <div className="button-update">
            <div className="button-update-item">
              <CommonButton
                size="large"
                variant="dashed"
                onClick={handleToggleModalGoBack}
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
        </div>
      </Form>
      <CommonModal
        width={776}
        okText="Save"
        visible={isOpenModalCity}
        onCancel={handleCancelModalCity}
        onOk={handleSaveModalCity}
      >
        <h2 className="title">Selected City</h2>
        <div className="content">
          <div className="lbl-modal">
            <span className="label">City</span>
          </div>
          <Input
            className="search-input"
            name="search"
            placeholder="Search"
            prefix={<SearchIcon />}
          />
          <div className="list-city">
            {Object.entries(listCitySorted).map((groupCity, key: number) => (
              <div className="group-city-container" key={key}>
                <div className="group-city">
                  <div className="group-name">
                    <p>{groupCity[0]}</p>
                  </div>
                  <div className="group-item">
                    {Object.values(groupCity[1]).map(
                      (item: string[], key2: number) => (
                        <div
                          className={clsx(
                            "item-city",
                            citySelected === item.toString() &&
                            "item-city-selected"
                          )}
                          key={key2}
                          onClick={() => handleChangeCity(item)}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      </CommonModal>
      <ConfirmModal
        visible={isOpenModalGoBack}
        onCancel={handleToggleModalGoBack}
        onOk={handleConfirmModalGoBack}
        okText="Yes"
        cancelText="No"
      >
        <div className="content-confirm">
          Are you sure to go back without saving?
        </div>
      </ConfirmModal>
    </div>
  );
}

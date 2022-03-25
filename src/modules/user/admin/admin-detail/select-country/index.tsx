import { Input, Modal } from "antd";
import { useState } from "react";
import clsx from "clsx";

import { CheckIcon, SearchIcon } from "assets/icons";
import "./styles.scss";
import { dataCountry } from "./constant";

export interface ISelectCountryProps {
  visible: boolean;
  prefixPhone: string;
  handleChangeCountry: Function;
  handleToggleVisibleModal: () => void;
}

export default function SelectCountry({
  prefixPhone,
  handleChangeCountry,
  visible,
  handleToggleVisibleModal
}: ISelectCountryProps) {
  const [valueKey, setValueKey] = useState<string>(prefixPhone);

  const handleClick = (params: string): void => {
    setValueKey(params);
  };
  const handleSave = (): void => {
    handleToggleVisibleModal();
    handleChangeCountry(valueKey);
  };
  const handleCancel = (): void => {
    setValueKey(prefixPhone);
    handleToggleVisibleModal();
  };

  return (
    <Modal
      visible={visible}
      okText="Save"
      width={494}
      className="modal-select-country"
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <div className="title">Select Country Code</div>
      <Input prefix={<SearchIcon />} className="input" placeholder="Search" />
      <div className="list-country scroll-y mb-3">
        {dataCountry.map((item) => (
          <div
            className={clsx(
              "country-row-container",
              valueKey === item.areaCode && "country-row-container-selected"
            )}
            key={item.id}
            onClick={() => handleClick(item.areaCode)}
          >
            <div className="country-row">
              {item.icon}
              <span className="area-code">{item.areaCode}</span>
              <span className="country">{item.country}</span>
            </div>
            {valueKey === item.areaCode && (
              <div className="suffix-icon">
                <CheckIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

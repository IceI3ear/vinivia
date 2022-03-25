import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IAddress } from "types/user/address";
import { useAppSelector } from "store/hook";
import { ConfirmModal } from "components/modal/modal-confirm";
import {
  deleteAddress,
  getListAddress,
  selectAddressList,
  updateAddress
} from "store/address.slice";
import { UpdateAddressRequest } from "services/address.service";
import AddressItem from "./address-item";
import "./styles.scss";

export default function Address() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [idDeleted, setIdDeleted] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const addressDataAll = useAppSelector(selectAddressList);
  const addressData = addressDataAll.filter((item) => item.user === id);

  const handleEdit = (idAddress: string | undefined): void => {
    navigate(`/user/buyer/${id}/buyer-details/address/${idAddress}/edit`);
  };
  const handleSetAsDefault = (itemUpdate: IAddress) => {
    const addressDefault = {
      ...addressData.find((item) => item.isDefault === "default"),
      isDefault: ""
    };
    if (addressDefault.id) {
      const params = { id: addressDefault.id, address: addressDefault };
      dispatch(updateAddress(params));
    }
    const address: UpdateAddressRequest = {
      ...itemUpdate,
      isDefault: "default"
    };
    if (itemUpdate.id) {
      const params = { id: itemUpdate.id, address };
      dispatch(updateAddress(params));
    }
  };
  const handleToggleModal = (): void => {
    setIsOpenModal(!isOpenModal);
  };
  const handleDelete = (idAddress: string | undefined): void => {
    handleToggleModal();
    idAddress && setIdDeleted(idAddress);
  };
  const handleConfirmDelete = () => {
    idDeleted && dispatch(deleteAddress(idDeleted));
    handleToggleModal();
  };

  useEffect(() => {
    dispatch(getListAddress());
  }, [dispatch]);

  return (
    <div className="address-container">
      {addressData.map((item) => (
        <div className="address-item" key={item.id}>
          <AddressItem
            user={item.fullName}
            phone={item.phone}
            address={item.address}
            isDefault={item.isDefault}
            city={item.city}
            onClickEdit={() => handleEdit(item.id)}
            onClickSetAsDefault={() => handleSetAsDefault(item)}
            onClickDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}
      <ConfirmModal
        visible={isOpenModal}
        okText="Delete"
        onCancel={handleToggleModal}
        onOk={handleConfirmDelete}
      >
        <p>Are you sure to delete this address ?</p>
      </ConfirmModal>
    </div>
  );
}

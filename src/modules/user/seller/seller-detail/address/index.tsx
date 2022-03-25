import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ConfirmModal } from "components/modal/modal-confirm";
import AddressItem from "modules/user/buyer/buyer-detail/address/address-item";
import "./styles.scss";
import { useAppSelector } from "store/hook";
import {
  deleteShopAddress,
  getListShopAddress,
  selectShopAddressList,
  updateShopAddress
} from "store/shop-address.slice";
import { IShopAddress } from "types/shop/address";
import { UpdateShopAddressRequest } from "services/shop-address.service";

export default function SellerAddress() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [idDeleted, setIdDeleted] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const shopAddressListAll = useAppSelector(selectShopAddressList);
  const shopAddressList = shopAddressListAll.filter(
    (item) => item.shopProfile === id
  );

  const handleEdit = (idAddress: string | undefined): void => {
    navigate(`/user/seller/${id}/seller-details/address/${idAddress}/edit`);
  };
  const handleSetAsDefault = (itemUpdate: IShopAddress): void => {
    const addressDefault = {
      ...shopAddressList.find((item) => item.isDefault === "default"),
      isDefault: ""
    };
    if (addressDefault.id) {
      const params = { id: addressDefault.id, shopAddress: addressDefault };
      dispatch(updateShopAddress(params));
    }
    const shopAddress: UpdateShopAddressRequest = {
      ...itemUpdate,
      isDefault: "default"
    };
    if (itemUpdate.id) {
      const params = { id: itemUpdate.id, shopAddress };
      dispatch(updateShopAddress(params));
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
    idDeleted && dispatch(deleteShopAddress(idDeleted));
    handleToggleModal();
  };

  useEffect(() => {
    dispatch(getListShopAddress());
  }, [dispatch]);

  return (
    <div className="address-container">
      {shopAddressList.map((item) => (
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

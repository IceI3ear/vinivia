import request from "utils/request";
import { IShopAddress } from "types/shop/address";

export type UpdateShopAddressRequest = Omit<IShopAddress, "id">;

const ShopAddressServices = {
  getAllShopAddress(): Promise<IShopAddress[]> {
    return request.get("/shop_address");
  },
  getShopAddressById(id: string): Promise<IShopAddress> {
    return request.get(`/shop_address/${id}`);
  },
  createShopAddress(body: UpdateShopAddressRequest): Promise<IShopAddress> {
    return request.post("/shop_address", body);
  },
  updateShopAddress(
    id: string,
    body: UpdateShopAddressRequest
  ): Promise<IShopAddress> {
    return request.put(`/shop_address/${id}`, body);
  },
  deleteShopAddress(id: string): Promise<IShopAddress> {
    return request.delete(`/shop_address/${id}`);
  }
};

export default ShopAddressServices;

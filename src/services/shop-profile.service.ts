import request from "utils/request";
import { IShopProfile } from "types/shop/profile";

export type UpdateShopProfileRequest = Omit<IShopProfile, "id">;

const ShopProfileServices = {
  getAllShopProfile(): Promise<IShopProfile[]> {
    return request.get("/shop_profiles");
  },
  getShopProfileById(id: string): Promise<IShopProfile> {
    return request.get(`/shop_profiles/${id}`);
  },
  createShopProfile(body: UpdateShopProfileRequest): Promise<IShopProfile> {
    return request.post("/shop_profiles", body);
  },
  updateShopProfile(
    id: string,
    body: UpdateShopProfileRequest
  ): Promise<IShopProfile> {
    return request.put(`/shop_profiles/${id}`, body);
  },
  deleteShopProfile(id: string): Promise<IShopProfile> {
    return request.delete(`/shop_profiles/${id}`);
  }
};

export default ShopProfileServices;

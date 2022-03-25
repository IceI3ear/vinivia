import request from "utils/request";
import { IAddress } from "types/user/address";

export type UpdateAddressRequest = Omit<IAddress, "id">;

const AddressServices = {
  getAllAddress(): Promise<IAddress[]> {
    return request.get("/address");
  },
  getAddressById(id: string): Promise<IAddress> {
    return request.get(`/address/${id}`);
  },
  createAddress(body: UpdateAddressRequest): Promise<IAddress> {
    return request.post("/address", body);
  },
  updateAddress(id: string, body: UpdateAddressRequest): Promise<IAddress> {
    return request.put(`/address/${id}`, body);
  },
  deleteAddress(id: string): Promise<IAddress> {
    return request.delete(`/address/${id}`);
  }
};

export default AddressServices;

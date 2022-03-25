import request from "utils/request";
import { IAdmin } from "types/admin/admin";

export type UpdateAdminRequest = Omit<IAdmin, "id">;

const AdminServices = {
  getAllAdmin(): Promise<IAdmin[]> {
    return request.get("/admins");
  },
  getAdminById(id: string): Promise<IAdmin> {
    return request.get(`/admins/${id}`);
  },
  createAdmin(body: UpdateAdminRequest): Promise<IAdmin> {
    return request.post("/admins", body);
  },
  updateAdmin(id: string, body: UpdateAdminRequest): Promise<IAdmin> {
    return request.put(`/admins/${id}`, body);
  },
  deleteAdmin(id: string): Promise<IAdmin> {
    return request.delete(`/admins/${id}`);
  }
};

export default AdminServices;

import request from "utils/request";
import { IPermissionGroup } from "types/permission-group/permission-group";

export type UpdatePermissionGroupRequest = Omit<IPermissionGroup, "id">;

const PermissionGroupServices = {
  getAllPermissionGroup(): Promise<IPermissionGroup[]> {
    return request.get("/group_permissions");
  },
  getPermissionGroupById(id: string): Promise<IPermissionGroup> {
    return request.get(`/group_permissions/${id}`);
  },
  createPermissionGroup(
    body: UpdatePermissionGroupRequest
  ): Promise<IPermissionGroup> {
    return request.post("/group_permissions", { body });
  },
  updatePermissionGroup(
    id: string,
    body: UpdatePermissionGroupRequest
  ): Promise<IPermissionGroup> {
    return request.put(`/group_permissions/${id}`, body);
  },
  deletePermissionGroup(id: string): Promise<IPermissionGroup> {
    return request.delete(`/group_permissions/${id}`);
  }
};

export default PermissionGroupServices;

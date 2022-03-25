import request from "utils/request";
import { IUser } from "types/user/user";

export type UpdateUserRequest = Omit<IUser, "id">;

const UserServices = {
  getAllUser(): Promise<IUser[]> {
    return request.get("/users");
  },
  getUserById(id: string): Promise<IUser> {
    return request.get(`/users/${id}`);
  },
  createUser(body: UpdateUserRequest): Promise<IUser> {
    return request.post("/users", body);
  },
  updateUser(id: string, body: UpdateUserRequest): Promise<IUser> {
    return request.put(`/users/${id}`, body);
  },
  deleteUser(id: string): Promise<IUser> {
    return request.delete(`/users/${id}`);
  }
};

export default UserServices;

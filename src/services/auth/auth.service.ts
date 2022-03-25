import { IAdmin } from "types/admin/admin";
import request from "utils/request";

const AuthServices = {
  getAllAdmin(): Promise<IAdmin[]> {
    return request.get("/admins");
  }
};
export default AuthServices;

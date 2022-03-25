export interface IAdmin {
  id?: string;
  email?: string;
  prefixPhone?: string;
  phone?: string;
  userName?: string;
  password?: string;
  fullName?: string;
  avatar?: string;
  isSuperAdmin?: boolean;
  lastLogin?: string;
  groupPermission?: string;
  createdBy?: string;
  status?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  dateCreated?: string;
  dateUpdated?: string;
}

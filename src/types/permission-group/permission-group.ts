export interface IPermissionGroup {
  id?: string;
  name?: string;
  description?: string;
  permission?: string[];
  status?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  dateCreated?: string;
  dateUpdated?: string;
}

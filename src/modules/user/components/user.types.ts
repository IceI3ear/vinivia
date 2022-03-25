export enum EStatus {
  Active = "Active",
  Inactive = "Inactive",
  Banned = "Banned"
}
export const sortBy = {
  DateCreatedNew: "dateCreated:1",
  DateCreatedOld: "dateCreated:-1"
};

export type FilterType = {
  [EStatus.Active]: boolean;
  [EStatus.Inactive]: boolean;
  [EStatus.Banned]: boolean;
};

export interface CurrentFilter {
  page?: string | number;
  content?: string;
  sort?: string;
  status?: string | null;
}

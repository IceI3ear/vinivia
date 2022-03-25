import { EStatus, FilterType } from "./user.types";

export const initFilterByStatus: FilterType = {
  [EStatus.Active]: false,
  [EStatus.Inactive]: false,
  [EStatus.Banned]: false
};

export const options = ["Active", "Inactive", "Banned"];

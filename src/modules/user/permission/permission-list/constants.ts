export interface IPermissionData {
  number: string;
  groupName: string;
  createdDate: string;
  updatedDate: string;
  status: string;
}

export const PermissionData: IPermissionData[] = [
  {
    number: "01",
    groupName: "CMS_Level 1",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Active"
  },
  {
    number: "02",
    groupName: "CMS_Level 2",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Inactive"
  },
  {
    number: "03",
    groupName: "CMS_Level 3",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Active"
  },
  {
    number: "04",
    groupName: "CMS_Level 4",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Inactive"
  },
  {
    number: "05",
    groupName: "CMS_Level 5",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Active"
  },
  {
    number: "06",
    groupName: "CMS_Level 6",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Inactive"
  },
  {
    number: "07",
    groupName: "CMS_Level 7",
    createdDate: "16/09/2021",
    updatedDate: "16/09/2021",
    status: "Active"
  }
];

export const options = ["Active", "Inactive"];

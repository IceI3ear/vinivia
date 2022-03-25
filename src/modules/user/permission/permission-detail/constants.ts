export interface IItem {
  action: string;
  status: boolean;
}

export interface IFieldManagement {
  fieldName: string;
  status: boolean;
  item: IItem[];
}

export const FieldManagement: IFieldManagement[] = [
  {
    fieldName: "Admin Management",
    status: true,
    item: [
      { action: "Create", status: false },
      { action: "Edit", status: false },
      { action: "View", status: false },
      { action: "Delete", status: true }
    ]
  },
  {
    fieldName: "Buyer Management",
    status: true,
    item: [
      { action: "View", status: false },
      { action: "Edit", status: false },
      { action: "View", status: false },
      { action: "Ban", status: true }
    ]
  },
  {
    fieldName: "Seller Management",
    status: true,
    item: [
      { action: "View", status: false },
      { action: "Edit", status: false },
      { action: "Delete", status: false },
      { action: "Ban", status: true },
      { action: "Review KYC", status: true }
    ]
  },
  {
    fieldName: "Product Management",
    status: true,
    item: [
      { action: "Create Categories", status: false },
      { action: "View Categories", status: false },
      { action: "Edit Categories", status: false },
      { action: "Delete Categories", status: true },
      { action: "View Products", status: true },
      { action: "Add Product To Product Violation List", status: true }
    ]
  },
  {
    fieldName: "Order Management",
    status: false,
    item: [
      { action: "View", status: false },
      { action: "Manually Track", status: false }
    ]
  },
  {
    fieldName: "Livestream Management",
    status: false,
    item: [
      { action: "View", status: false },
      { action: "Delete", status: false }
    ]
  },
  {
    fieldName: "Dashboard",
    status: false,
    item: [{ action: "View", status: false }]
  }
];

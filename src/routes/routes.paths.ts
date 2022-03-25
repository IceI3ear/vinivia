export const user = {
  PATH_BUYER: "/user/buyer",
  PATH_SELLER: "/user/seller",
  PATH_ADMIN: "/user/admin",
  PATH_PERMISSION: "/user/permission",
  PATH_USER: "/user"
};

export const buyer = {
  PATH_BUYER_DETAIL: "/user/buyer/:id/buyer-details",
  PATH_BASIC_INFORMATION: "/user/buyer/:id/buyer-details/basic-information",
  PATH_BASIC_INFORMATION_EDIT:
    "/user/buyer/:id/buyer-details/basic-information/edit",
  PATH_ADDRESS: "/user/buyer/:id/buyer-details/address",
  PATH_ADDRESS_EDIT: "/user/buyer/:id/buyer-details/address/:idAddress/edit"
};

export const seller = {
  PATH_SELLER_DETAIL: "/user/seller/:id/seller-details",
  PATH_BASIC_INFORMATION: "/user/seller/:id/seller-details/basic-information",
  PATH_BASIC_INFORMATION_EDIT:
    "/user/seller/:id/seller-details/basic-information/edit",
  PATH_ADDRESS: "/user/seller/:id/seller-details/address",
  PATH_ADDRESS_EDIT: "/user/seller/:id/seller-details/address/:idAddress/edit",
  PATH_PRODUCTS: "/user/seller/:id/seller-details/products",
  PATH_LIVESTREAM: "/user/seller/:id/seller-details/livestream"
};

export const admin = {
  PATH_ADMIN_DETAIL: "/user/admin/:id/admin-details",
  PATH_ADMIN_DETAIL_EDIT: "/user/admin/:id/admin-details/edit"
};

export const permission = {
  PATH_PERMISSION_DETAIL: "/user/permission/:id/permission-details"
};

export const video = { PATH_VIDEO: "/video" };

export const product = {
  PATH_CATEGORY: "/product/category",
  PATH_ATTRIBUTE: "/product/attribute",
  PATH_PRODUCT: "/product"
};

export const other = { PATH_OTHER: "/other" };

export const login = { PATH_LOGIN: "/login" };

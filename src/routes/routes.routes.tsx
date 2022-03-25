import { RouteObject } from "react-router-dom";

import { Other, Video } from "pages";
import { Admin, Buyer, Permission, Seller } from "pages/user";
import { Attribute, Category } from "pages/product";
import AppLayout from "layout";
import Address from "modules/user/buyer/buyer-detail/address";
import LoginLayout from "pages/login";
import BasicInformation from "modules/user/buyer/buyer-detail/basic-information";
import SellerBasicInformation from "modules/user/seller/seller-detail/basic-information";
import SellerDetail from "pages/user/seller/seller-details";
import SellerAddress from "modules/user/seller/seller-detail/address";
import SellerProducts from "modules/user/seller/seller-detail/products";
import SellerLivestream from "modules/user/seller/seller-detail/livestream";
import BuyerDetail from "pages/user/buyer/buyer-details";
import AddressDetails from "modules/user/buyer/buyer-detail/address/address-details";
import AdminDetail from "modules/user/admin/admin-detail";
import SellerAddressDetail from "modules/user/seller/seller-detail/address/address-details";
import PermissionDetail from "modules/user/permission/permission-detail";
import {
  buyer,
  user,
  product,
  video,
  other,
  login,
  seller,
  admin,
  permission
} from "./routes.paths";
import PrivateRoute from "./private.routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Buyer /> },
      {
        path: user.PATH_BUYER,
        element: <Buyer />
      },
      {
        path: buyer.PATH_BUYER_DETAIL,
        element: <BuyerDetail />,
        children: [
          {
            path: buyer.PATH_BASIC_INFORMATION,
            element: <BasicInformation />
          },
          {
            path: buyer.PATH_BASIC_INFORMATION_EDIT,
            element: <BasicInformation />
          },
          {
            path: buyer.PATH_ADDRESS,
            element: <Address />
          },
          { path: buyer.PATH_ADDRESS_EDIT, element: <AddressDetails /> }
        ]
      },
      {
        path: user.PATH_SELLER,
        element: <Seller />
      },
      {
        path: seller.PATH_SELLER_DETAIL,
        element: <SellerDetail />,
        children: [
          {
            path: seller.PATH_BASIC_INFORMATION,
            element: <SellerBasicInformation />
          },
          {
            path: seller.PATH_BASIC_INFORMATION_EDIT,
            element: <SellerBasicInformation />
          },
          {
            path: seller.PATH_ADDRESS,
            element: <SellerAddress />
          },
          { path: seller.PATH_ADDRESS_EDIT, element: <SellerAddressDetail /> },
          {
            path: seller.PATH_PRODUCTS,
            element: <SellerProducts />
          },
          {
            path: seller.PATH_LIVESTREAM,
            element: <SellerLivestream />
          }
        ]
      },
      {
        path: user.PATH_ADMIN,
        element: <Admin />
      },
      {
        path: admin.PATH_ADMIN_DETAIL,
        element: <AdminDetail />,
        children: [
          {
            path: admin.PATH_ADMIN_DETAIL_EDIT,
            element: <AdminDetail />
          }
        ]
      },
      {
        path: user.PATH_PERMISSION,
        element: <Permission />
      },
      {
        path: permission.PATH_PERMISSION_DETAIL,
        element: <PermissionDetail />
      },
      {
        path: video.PATH_VIDEO,
        element: <Video />
      },
      {
        path: product.PATH_PRODUCT,
        element: <Category />
      },
      {
        path: product.PATH_CATEGORY,
        element: <Category />
      },
      {
        path: product.PATH_ATTRIBUTE,
        element: <Attribute />
      },
      {
        path: other.PATH_OTHER,
        element: <Other />
      }
    ]
  },
  { path: login.PATH_LOGIN, element: <LoginLayout /> }
];

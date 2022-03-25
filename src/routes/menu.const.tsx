import {
  OtherIcon,
  ProductAttributeIcon,
  ProductCateIcon,
  ProductIcon,
  UserAdminIcon,
  UserBuyerIcon,
  UserIcon,
  UserPermissionIcon,
  UserSellerIcon,
  VideoIcon
} from "assets/icons";
import { Other, Video } from "pages";
import { Admin, Buyer, Permission, Seller } from "pages/user";
import { Attribute, Category } from "pages/product";
import { user, product, video, other } from "./routes.paths";
import { CollapseMenu, MenuItem } from "../types/types.menu";

export const menuList: MenuItem[] = [
  {
    id: "01",
    name: "User",
    icon: UserIcon,
    path: user.PATH_BUYER,
    subMenu: [
      {
        id: "01-01",
        name: "Buyer",
        icon: UserBuyerIcon,
        path: user.PATH_BUYER,
        element: <Buyer />
      },
      {
        id: "01-02",
        name: "Seller",
        icon: UserSellerIcon,
        path: user.PATH_SELLER,
        element: <Seller />
      },
      {
        id: "01-03",
        name: "Admin",
        icon: UserAdminIcon,
        path: user.PATH_ADMIN,
        element: <Admin />
      },
      {
        id: "01-04",
        name: "Permission",
        icon: UserPermissionIcon,
        path: user.PATH_PERMISSION,
        element: <Permission />
      }
    ]
  },
  {
    id: "02",
    name: "Video",
    icon: VideoIcon,
    path: video.PATH_VIDEO,
    element: <Video />
  },
  {
    id: "03",
    name: "Product",
    icon: ProductIcon,
    path: product.PATH_CATEGORY,
    subMenu: [
      {
        id: "03-02",
        name: "Category",
        path: product.PATH_CATEGORY,
        icon: ProductCateIcon,
        element: <Category />
      },
      {
        id: "03-03",
        name: "Attribute",
        path: product.PATH_ATTRIBUTE,
        icon: ProductAttributeIcon,
        element: <Attribute />
      }
    ]
  },
  {
    id: "04",
    name: "Other",
    icon: OtherIcon,
    path: other.PATH_OTHER,
    element: <Other />
  }
];

export const collapseMenuList: CollapseMenu[] = [
  {
    id: "01-01",
    name: "Buyer",
    icon: UserBuyerIcon,
    path: user.PATH_BUYER,
    element: <Buyer />
  },
  {
    id: "01-02",
    name: "Seller",
    icon: UserSellerIcon,
    path: user.PATH_SELLER,
    element: <Seller />
  },
  {
    id: "01-03",
    name: "Admin",
    icon: UserAdminIcon,
    path: user.PATH_ADMIN,
    element: <Admin />
  },
  {
    id: "01-04",
    name: "Permission",
    icon: UserPermissionIcon,
    path: user.PATH_PERMISSION,
    element: <Permission />
  },

  {
    id: "02",
    name: "Video",
    icon: VideoIcon,
    path: video.PATH_VIDEO,
    element: <Video />
  },
  {
    id: "03-01",
    name: "Category",
    path: product.PATH_CATEGORY,
    icon: ProductCateIcon,
    element: <Category />
  },
  {
    id: "03-02",
    name: "Attribute",
    path: product.PATH_ATTRIBUTE,
    icon: ProductAttributeIcon,
    element: <Attribute />
  },
  {
    id: "04",
    name: "Other",
    icon: OtherIcon,
    path: other.PATH_OTHER,
    element: <Other />
  }
];

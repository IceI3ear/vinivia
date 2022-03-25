import { ReactNode } from "react";

export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

export type SubMenu = {
  id: string | number;
  path: string;
  name?: string;
  icon?: Icon;
  element: ReactNode;
};
export type MenuItem = {
  id: string | number;
  path: string;
  name: string;
  icon?: Icon;
  subMenu?: Array<SubMenu>;
  element?: ReactNode;
};
export type CollapseMenu = Omit<MenuItem, "subMenu">;

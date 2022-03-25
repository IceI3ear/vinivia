import { Avatar, Divider, Dropdown, Layout, Menu, Space } from "antd";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { ArrowRightIcon, Logo, UserIcon, ViniviaIcon } from "assets/icons";
import { collapseMenuList, menuList } from "../../routes/menu.const";
import { Icon, MenuItem } from "../../types/types.menu";
import "./styles.scss";

export interface ISidebarProps {
  collapsed: boolean;
  onShowModal: () => void;
}

const { Sider } = Layout;
const { SubMenu } = Menu;

const MenuUnCollapsed = () => (
  <Menu mode="inline" className="sidebar text-base">
    {menuList.map((item: MenuItem) => {
      const RootMenuIcon = item.icon as Icon;
      if (item.subMenu) {
        return (
          <SubMenu key={item.id} icon={<RootMenuIcon />} title={item.name}>
            {item.subMenu?.map((item2) => {
              const SubMenuIcon = item2.icon as Icon;
              return (
                <Menu.Item key={item2.id} icon={<SubMenuIcon />}>
                  <Link to={item2.path}>{item2.name}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id} icon={<RootMenuIcon />} className="menu-item">
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      );
    })}
  </Menu>
);

const MenuCollapsed = () => (
  <Menu mode="inline" className="sidebar text-base">
    {collapseMenuList.map((item) => {
      const MenuIcon = item.icon as Icon;
      return (
        <NavLink
          to={item.path}
          key={item.id}
          className="menu-collapsed flex justify-center"
        >
          <MenuIcon />
        </NavLink>
      );
    })}
  </Menu>
);

export default function Sidebar({ collapsed, onShowModal }: ISidebarProps) {
  const navigate = useNavigate();

  const handleClickSignOut = () => {
    localStorage.removeItem(`accessToken`);
    navigate("/login");
  };

  const menu = (
    <Menu className="radius-normal">
      <Menu.Item>My Profile</Menu.Item>
      <Menu.Item onClick={onShowModal}>Change Password</Menu.Item>
      <Divider className="divider" />
      <Menu.Item className="text-red" onClick={handleClickSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sidebar"
      width={264}
      collapsedWidth={100}
    >
      <div className="flex justify-between flex-column full-height">
        <div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="logo"
          >
            {collapsed ? <ViniviaIcon /> : <Logo />}
          </div>
          {collapsed ? <MenuCollapsed /> : <MenuUnCollapsed />}
        </div>
        {collapsed ? (
          <div className="margin-auto">
            <Avatar size="large" icon={<UserIcon />} />
          </div>
        ) : (
          <Space direction="vertical">
            <Dropdown overlay={menu} placement="topRight" trigger={["click"]}>
              <div className="menu-profile-button flex item-center cursor-pointer">
                <Avatar size="large" icon={<UserIcon />} />
                <div className="ml-1">
                  <div className="flex">
                    <div className="mr-4">James Potter</div>
                    <ArrowRightIcon />
                  </div>
                  <div>Admin</div>
                </div>
              </div>
            </Dropdown>
          </Space>
        )}
      </div>
    </Sider>
  );
}

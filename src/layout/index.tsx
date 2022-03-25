import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router";

import ChangePassword from "modules/auth/change-password";
import { BarIcon } from "assets/icons";
import Sidebar from "./sidebar";
import "./styles.scss";

const { Header, Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const location = useLocation();

  const pathSnippets = location.pathname.replace("/", "").split("/");
  const path = pathSnippets.slice(0, 2);

  const showModalChangePassword = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleSave = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-container">
      <Sidebar collapsed={collapsed} onShowModal={showModalChangePassword} />
      <Layout className="site-layout">
        <Header>
          <div className=" flex item-center ">
            <BarIcon className="cursor-pointer mr-2" onClick={toggle} />
            {path.length === 1 ? (
              <h1 className="text-2xl font-bold mb-0">{`${path[0]} Management`}</h1>
            ) : (
              path.length === 2 && (
                <h1 className="text-2xl font-bold mb-0">{`${path[1]} Management`}</h1>
              )
            )}
          </div>
        </Header>
        <Content className="site-layout-background">
          <Outlet />
        </Content>
      </Layout>
      <ChangePassword
        onSave={handleSave}
        onCancel={handleCancel}
        isVisible={isModalVisible}
      />
    </Layout>
  );
}

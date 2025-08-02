import React, { useState } from "react";
import { Layout, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "../../components/shared/SideNav";
import Content from "../../components/shared/Content";

const { Header, Content: AntdContent } = Layout;

const DashBoardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <Layout className="h-screen rounded-lg bg-[#F5F5F5] overflow-hidden shadow-lg p-1">
      <Sidebar onSelectMenu={handleMenuClick} selectedKey={selectedMenu} />
      <Layout className="md:m-2 m-1 rounded-lg overflow-hidden">
        <Header style={{ background: "#FFFFFF" }} className=" flex justify-between items-center px-4 py-4 rounded-lg shadow-md mb-2 min-h-[100px]">
          <div className="flex flex-col">
            <h1 className="text-black md:text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-700 text-sm mt-2">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center justify-center rounded-full bg-[#E2E8F0] p-3">
              <Badge count={3} offset={[-3, 3]}>
                <BellOutlined style={{ fontSize: 20, color: "black" }} />
              </Badge>
            </div>
            <div className="flex items-center space-x-3 bg-[#E2E8F0] px-3 py-2 rounded-lg text-black">
              <Avatar icon={<UserOutlined />} size="large"  style={{ backgroundColor: "#3B82F6",marginRight: "8px" }} />
              <div className="leading-tight">
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-gray-600">Administrator</div>
              </div>
            </div>
          </div>
        </Header>
        <AntdContent className="rounded-b-lg overflow-hidden shadow-lg bg-white">
          <Content selectedMenu={selectedMenu} onMenuChange={(menuKey) => setSelectedMenu(menuKey)} />
        </AntdContent>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;

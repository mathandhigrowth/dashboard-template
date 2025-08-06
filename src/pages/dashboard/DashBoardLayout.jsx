import React, { useState } from "react";
import { Layout, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "../../components/shared/SideNav";
import Content from "../../components/shared/Content";
import { selectUser } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

const { Header, Content: AntdContent } = Layout;

const DashBoardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const user = useSelector(selectUser);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <Layout className="h-screen rounded-lg bg-[#F5F5F5] overflow-hidden shadow-lg p-1">
      <Sidebar onSelectMenu={handleMenuClick} selectedKey={selectedMenu} />
      <Layout className="md:m-2 m-1 rounded-lg overflow-hidden">
        <Header style={{ background: "#FFFFFF" }} className=" flex justify-between items-center px-4 py-4 rounded-lg shadow-md mb-2 min-h-[30px] md:min-h-[100px]">
          <div className="flex flex-col">
            <h1 className="text-black text-xl md:text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-700 text-sm mt-2"> Welcome back{user?.fullName ? `, ${user.fullName}` : "Anonymous"}!</p>
            
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

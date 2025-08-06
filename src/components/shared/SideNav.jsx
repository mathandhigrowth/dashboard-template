import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MdDashboard, MdCategory, MdLogout, MdOutlineInventory2, MdOutlineLocalShipping, MdAlternateEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
const { Sider } = Layout;
const { SubMenu } = Menu;

import { BarChart3, Users, AlertTriangle, Building, Utensils, User, CreditCard, Settings, BuildingIcon, Bike } from "lucide-react";
import { FiSettings } from "react-icons/fi";
import { Calendar } from "lucide-react";
const MENU_ITEMS = [
  {
    key: "dashboard",
    icon: <BarChart3 size={18} />,
    label: "Dashboard",
    type: "item",
  },
  {
    key: "bookings",
    icon: <Calendar size={18} />,
    label: "Booking Management",
    type: "item",
  },
  {
    key: "contacts",
    icon: <Users size={18} />,
    label: "Contact Messages",
    type: "item",
  },
];

const DEFAULT_SIDEBAR_WIDTH = 250;
const MOBILE_COLLAPSED_WIDTH = 60;

export default function Sidebar({ onSelectMenu, selectedKey }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : keys);
  };

  const handleMenuSelect = ({ key }) => {
    onSelectMenu(key);
  };

  const getShadowStyle = () => {
    return window.innerWidth <= 768 && !collapsed ? "0px 0px 1112px 1112px rgb(104, 104, 104, 0.3)" : "none";
  };

  const renderMenuItem = (item) => {
    if (item.type === "group") {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map((child) => (
            <Menu.Item key={child.key} icon={child.icon}>
              {child.label}
            </Menu.Item>
          ))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        {item.label}
      </Menu.Item>
    );
  };

  return (
    <Sider
      width={DEFAULT_SIDEBAR_WIDTH}
      theme="light"
      breakpoint="lg"
      collapsedWidth={MOBILE_COLLAPSED_WIDTH}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={{
        background: "#f0f2f5",
        boxShadow: getShadowStyle(),
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="text-center py-2 border-b border-gray-400 bg-white flex items-center justify-center flex-row gap-3">
        <Bike size={35} className={` p-1 mt-2 rounded bg-blue-500 text-white mb-1`} />
        {!collapsed && (
          <div className="text-gray-900 text-start m-0">
            <h2 className="text-md md:text-xl font-semibold">RUTS N RIDES</h2>
            <p className="text-xs">Admin Dashboard</p>
          </div>
        )}
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onSelect={handleMenuSelect}
        style={{
          borderRight: 0,
          height: collapsed ? "calc(100vh - 150px)" : "calc(100vh - 150px)",
        }}
        className="flex-grow overflow-y-auto scrollbar"
      >
        {MENU_ITEMS.map(renderMenuItem)}
      </Menu>

      <div className="flex justify-center items-center w-full">
        <Button onClick={handleLogout} style={{ backgroundColor: "#19314B", borderColor: "#19314B" }} type="primary" icon={<MdLogout size={15} />} className="w-full">
          {collapsed ? "" : "Logout"}
        </Button>
      </div>
    </Sider>
  );
}

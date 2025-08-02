import React from "react";
import { Layout } from "antd";
import DashboardContents from "../../pages/dashboard/DashboardContents";
import CustomerPage from "../../pages/dashboard/customer/CustomerPage";
import FoodManagementPage from "../../pages/dashboard/food/FoodManagementPage";
import RoomManagementPage from "../../pages/dashboard/room/RoomManagementPage";
import PaymentManagementPage from "../../pages/dashboard/payment/PaymentManagementPage";

const { Content: AntContent } = Layout;

const Content = ({ selectedMenu, onMenuChange }) => {
  let content;
  switch (selectedMenu) {
    case "dashboard":
      content = <DashboardContents onMenuChange={onMenuChange} />;
      break;
    case "customers":
      content = <CustomerPage />;
      break;
    case "rooms":
      content = <RoomManagementPage />;
      break;
    case "foods":
      content = <FoodManagementPage />;
      break;
    case "payments":
      content = <PaymentManagementPage />;
      break;
    default:
      content = <DashboardContents onMenuChange={onMenuChange} />;
  }

  return (
    <AntContent className="thumb-control" style={{ padding: "6px", height: "85vh", overflow: "auto" }}>
      {content}
    </AntContent>
  );
};

export default Content;

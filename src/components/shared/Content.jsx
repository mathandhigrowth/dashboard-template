import React from "react";
import { Layout } from "antd";
import DashboardContents from "../../pages/dashboard/DashboardContents";
import ContactPage from "../../pages/dashboard/customer/ContactPage";
import BookingPage from "../../pages/dashboard/booking/BookingPage";

const { Content: AntContent } = Layout;

const Content = ({ selectedMenu, onMenuChange }) => {
  let content;
  switch (selectedMenu) {
    case "dashboard":
      content = <DashboardContents onMenuChange={onMenuChange} />;
      break;
    case "bookings":
      content = <BookingPage onMenuChange={onMenuChange} />;
      break;
    case "contacts":
      content = <ContactPage onMenuChange={onMenuChange} />;
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

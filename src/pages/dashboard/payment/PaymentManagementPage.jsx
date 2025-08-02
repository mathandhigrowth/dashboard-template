import React, { useState } from "react";
import { Button, Card, Input, Row, Col, Typography, Select, DatePicker } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { CalendarDays, AlarmClock, BadgeIndianRupee, AlertTriangle } from "lucide-react";
import PaymentTable from "./PaymentTable";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const stats = [
  {
    title: "Total Received",
    value: "₹2,45,000",
    icon: BadgeIndianRupee,
    iconColor: "text-green-700",
    iconBg: "bg-green-100",
    subtitle: "+12% from last month",
    subtitleColor: "text-green-600",
  },
  {
    title: "Pending Amount",
    value: "₹35,000",
    icon: AlarmClock,
    iconColor: "text-orange-700",
    iconBg: "bg-orange-100",
    subtitle: "8 customers",
    subtitleColor: "text-orange-600",
  },
  {
    title: "This Month",
    value: "₹42,000",
    icon: CalendarDays,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
    subtitle: "18 payments",
    subtitleColor: "text-blue-600",
  },
  {
    title: "Overdue",
    value: "₹8,500",
    icon: AlertTriangle,
    iconColor: "text-red-700",
    iconBg: "bg-red-100",
    subtitle: "3 customers",
    subtitleColor: "text-red-600",
  },
];

const paymentData = [
  {
    customer: "Rahul Sharma",
    room: "Room A-101",
    amount: 12000,
    method: "UPI",
    status: "Paid",
    dueDate: "Jan 31, 2024",
    paidDate: "Jan 29, 2024",
  },
  {
    customer: "Priya Patel",
    room: "Room B-205",
    amount: 15000,
    method: "Bank Transfer",
    status: "Pending",
    dueDate: "Jan 31, 2024",
  },
  {
    customer: "Amit Kumar",
    room: "Room A-103",
    amount: 8500,
    method: "Cash",
    status: "Overdue",
    dueDate: "Dec 31, 2023",
  },
];

const PaymentManagementPage = () => {
  return (
    <Card
      title={
        <Title level={4} className="pt-2">
          Payment Management
          <p style={{ fontSize: "12px", color: "#888" }}>Track and manage all customer payments</p>
        </Title>
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Add Payment
        </Button>
      }
      bordered={false}
    >
      <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className={`text-2xl font-bold ${item.iconColor}`}>{item.value}</p>
                <p className={`text-xs mt-1 ${item.subtitleColor}`}>{item.subtitle}</p>
              </div>
              <div className={`p-2 rounded-lg ${item.iconBg}`}>
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Input.Search placeholder="Search payments..." enterButton={<SearchOutlined />} allowClear />
        </Col>

        <Col xs={24} sm={12} md={18}>
          <Row gutter={[8, 8]} justify="end">
            <Col xs={24} sm={12} md={6}>
              <Select style={{ width: "100%" }} placeholder="All Status" defaultValue="all">
                <Option value="all">All Status</Option>
                <Option value="paid">Paid</Option>
                <Option value="pending">Pending</Option>
                <Option value="overdue">Overdue</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select style={{ width: "100%" }} placeholder="Payment Method" defaultValue="all">
                <Option value="all">All Methods</Option>
                <Option value="cash">Cash</Option>
                <Option value="upi">UPI</Option>
                <Option value="bank">Bank Transfer</Option>
                <Option value="card">Card</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <RangePicker style={{ width: "100%" }} placeholder={["Start Date", "End Date"]} />
            </Col>
          </Row>
        </Col>
      </Row>

      <PaymentTable
        payments={paymentData}
        loading={false}
        onEdit={(record) => console.log("Edit:", record)}
        onView={(record) => console.log("View:", record)}
        pagination={{
          currentPage: 1,
          limit: 10,
          totalCustomers: paymentData.length,
        }}
        handleTableChange={(pagination) => console.log("Table change:", pagination)}
      />
    </Card>
  );
};

export default PaymentManagementPage;

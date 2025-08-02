import CustomerTable from "./CustomerTable";
import React, { useState } from "react";
import { Button, Card, Input, Row, Col, Typography, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import CustomerFormModal from "./CategoryFormModal";
import DeleteConfirmModal from "../../../components/Modals/DeleteConfirmModal";
import UserViewModal from "./components/UserViewModal";

const { Title } = Typography;
const { Option } = Select;

const customers = [
  {
    _id: "1",
    name: "John Smith",
    email: "john@email.com",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    roomNumber: "Block A - 201",
    roomType: "Single AC",
    status: "Active",
    phone: "1234567890",
    amount: 12000,
    paymentStatus: "Paid",
  },
  {
    _id: "2",
    name: "Sarah Wilson",
    email: "sarah@email.com",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    roomNumber: "Block B - 105",
    roomType: "Shared",
    status: "Active",
    phone: "9876543210",
    amount: 8000,
    paymentStatus: "Overdue",
  },
];

const CustomerPage = () => {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsFormModalVisible(true);
  };
  const handleEdit = (record) => {
    setSelectedCustomer(record);
    setIsFormModalVisible(true);
  };
  const handleDelete = (record) => {
    setSelectedCustomer(record);
    setIsDeleteModalVisible(true);
  };
  const handleView = (record) => {
    setSelectedCustomer(record);
    setIsViewModalVisible(true);
  };
  const handleCancel = () => {
    setIsFormModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsViewModalVisible(false);
    setSelectedCustomer(null);
  };
  const handleSubmit = (values) => {
    console.log("Submitted:", values);
    setIsFormModalVisible(false);
    setSelectedCustomer(null);
  };
  const handleConfirmDelete = () => {
    console.log("Delete confirmed for:", selectedCustomer);
    setIsDeleteModalVisible(false);
    setSelectedCustomer(null);
  };

  return (
    <Card
      title={
        <Title level={4} className="pt-2">
          Customer Management
          <p style={{ fontSize: "12px", color: "#888" }}>Manage customer profiles and information</p>
        </Title>
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Customer
        </Button>
      }
      bordered={false}
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input.Search placeholder="Search customers..." enterButton={<SearchOutlined />} allowClear />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <Row gutter={[8, 8]} justify="end">
            <Col>
              <Select defaultValue="All Status" style={{ width: 140 }}>
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col>
              <Select defaultValue="All Rooms" style={{ width: 140 }}>
                <Option value="all">All Rooms</Option>
                <Option value="single-ac">Single AC</Option>
                <Option value="shared">Shared</Option>
              </Select>
            </Col>
            <Col>
              <Select defaultValue="All Blocks" style={{ width: 140 }}>
                <Option value="all">All Blocks</Option>
                <Option value="block-a">Block A</Option>
                <Option value="block-b">Block B</Option>
                <Option value="block-c">Block C</Option>
              </Select>
            </Col>
            <Col>
              <Select defaultValue="Payment Status" style={{ width: 160 }}>
                <Option value="all">Payment Status</Option>
                <Option value="paid">Paid</Option>
                <Option value="overdue">Overdue</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>

      <CustomerTable
        customers={customers}
        loading={false}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        pagination={{ currentPage: 1, limit: 10, totalCustomers: customers.length }}
        handleTableChange={(pagination) => console.log("Table changed", pagination)}
      />

      <CustomerFormModal customer={selectedCustomer} visible={isFormModalVisible} onCancel={handleCancel} onSubmit={handleSubmit} />

      <UserViewModal visible={isViewModalVisible} onCancel={handleCancel} customer={selectedCustomer} />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this item? This action cannot be undone."
      />
    </Card>
  );
};

export default CustomerPage;

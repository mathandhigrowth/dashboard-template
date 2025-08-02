import React from "react";
import { Table, Button, Tag, Space, Tooltip, Avatar } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const CustomerTable = ({ customers, loading, onEdit, onView, pagination, handleTableChange }) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <Space>
          <Avatar src={record.profileImage} alt={record.name} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (_, record) => (
        <>
          <div>{record.roomNumber}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>{record.roomType}</div>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (_, record) => (
        <div>
          <div>₹{record.amount.toLocaleString()}</div>
          <Tag color={record.paymentStatus === "Paid" ? "green" : "red"}>{record.paymentStatus}</Tag>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button icon={<EyeOutlined />} onClick={() => onView(record)} size="small" />
          </Tooltip>
          <Tooltip title="Edit Customer">
            <Button icon={<EditOutlined />} type="primary" onClick={() => onEdit(record)} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={customers}
      loading={loading}
      rowKey="_id"
      pagination={{
        current: pagination.currentPage,
        pageSize: pagination.limit,
        total: pagination.totalCustomers,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
      }}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
      bordered
    />
  );
};

export default CustomerTable;

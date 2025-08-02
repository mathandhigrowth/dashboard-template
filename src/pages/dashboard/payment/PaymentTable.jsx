import React from "react";
import { Table, Button, Tag, Space, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const PaymentTable = ({ payments, loading, onEdit, onView, pagination, handleTableChange }) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => <div style={{ fontWeight: 500 }}>{customer}</div>,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹${amount.toLocaleString()}`,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Paid" ? "green" : status === "Pending" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Paid Date",
      dataIndex: "paidDate",
      key: "paidDate",
      render: (paidDate) => paidDate || <Tag color="default">Not Paid Yet</Tag>,
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
          <Tooltip title="Edit Payment">
            <Button icon={<EditOutlined />} type="primary" onClick={() => onEdit(record)} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={payments}
      loading={loading}
      rowKey={(record, index) => index}
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

export default PaymentTable;

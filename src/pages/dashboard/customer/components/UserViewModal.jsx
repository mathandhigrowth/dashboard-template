import React from "react";
import { Modal, Descriptions, Tag, Typography, Avatar, Space } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const UserViewModal = ({ visible, onCancel, customer }) => {
  if (!customer) return null;

  return (
    <Modal title={<Title level={4}>Customer Details: {customer.name}</Title>} open={visible} onCancel={onCancel} footer={null} width={600} centered>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar src={customer.profileImage} icon={<UserOutlined />} size={100} />
      </div>
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item
          label={
            <Space>
              <UserOutlined /> Name
            </Space>
          }
        >
          <Text strong>{customer.name}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <MailOutlined /> Email
            </Space>
          }
        >
          {customer.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <PhoneOutlined /> Phone
            </Space>
          }
        >
          {customer.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Room Number">{customer.roomNumber}</Descriptions.Item>
        <Descriptions.Item label="Room Type">{customer.roomType}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={customer.status === "Active" ? "green" : "red"}>{customer.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          <Text strong>₹{customer.amount}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          <Tag color={customer.paymentStatus === "Paid" ? "green" : "red"}>{customer.paymentStatus}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserViewModal;

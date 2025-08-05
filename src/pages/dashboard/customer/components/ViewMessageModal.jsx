import React from 'react';
import { Modal, Descriptions, Typography, Divider, Space, Tag } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const ViewMessageModal = ({ visible, onCancel, contact }) => {
  if (!contact) return null;

  return (
    <Modal
      title="Message Details"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Space key="footer" size="middle" style={{ float: 'right' }}>
          <Tag icon={<ClockCircleOutlined />}>
            {moment(contact.createdAt).format('MMM D, YYYY h:mm A')}
          </Tag>
        </Space>
      ]}
      width={700}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label={
          <Space>
            <UserOutlined />
            <span>Name</span>
          </Space>
        }>
          {contact.name}
        </Descriptions.Item>
        
        <Descriptions.Item label={
          <Space>
            <MailOutlined />
            <span>Email</span>
          </Space>
        }>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </Descriptions.Item>
        
        <Descriptions.Item label={
          <Space>
            <PhoneOutlined />
            <span>Phone</span>
          </Space>
        }>
          {contact.phone || 'N/A'}
        </Descriptions.Item>
        
        <Descriptions.Item label="Message">
          <Paragraph style={{ whiteSpace: 'pre-line', margin: 0 }}>
            {contact.message}
          </Paragraph>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ViewMessageModal;

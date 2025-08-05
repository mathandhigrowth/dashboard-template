import React from 'react';
import { Table, Space, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const BookingTable = ({ bookings, loading, onView, onDelete, pagination, handleTableChange }) => {
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Program',
      dataIndex: 'selectedProgram',
      key: 'selectedProgram',
      render: (text) => (
        <div style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Pricing',
      dataIndex: 'selectedPricing',
      key: 'selectedPricing',
    },
    {
      title: 'Preferred Date',
      dataIndex: 'preferredDate',
      key: 'preferredDate',
      render: (date) => moment(date).format('MMM D, YYYY'),
    },
    {
      title: 'Booked On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('MMM D, YYYY h:mm A'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(record)} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={bookings}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange}
      scroll={{ x: true }}
    />
  );
};

export default BookingTable;

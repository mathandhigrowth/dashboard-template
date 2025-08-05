    import React from 'react';
    import { Table, Space, Button } from 'antd';
    import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
    import moment from 'moment';

    const ContactTable = ({ contacts, loading, onView, onDelete, pagination, handleTableChange }) => {
    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
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
        render: (phone) => phone || 'N/A',
        },
        {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        render: (text) => (
            <div style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
            </div>
        ),
        },
        {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'date',
        render: (date) => moment(date).format('MMM D, YYYY h:mm A'),
        sorter: true,
        },
        {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
            <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={() => onView(record)}
                title="View Details"
            />
            <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => onDelete(record)}
                title="Delete"
            />
            </Space>
        ),
        },
    ];

    return (
        <Table
        columns={columns}
        dataSource={contacts}
        rowKey="_id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        />
    );
    };

    export default ContactTable;

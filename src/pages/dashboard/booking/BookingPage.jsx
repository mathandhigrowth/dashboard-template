import React, { useState, useEffect, useMemo } from 'react';
import {
  Button, message, Space, Tag, Input, Card, Row, Col, Typography, Modal
} from 'antd';
import {
  PlusOutlined, ReloadOutlined, EyeOutlined, DeleteOutlined, SearchOutlined
} from '@ant-design/icons';
import demoBookings from './demoBookings.json';

const { Title } = Typography;

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    setLoading(true);
    try {
      const initialBookings = JSON.parse(JSON.stringify(demoBookings.bookings));
      setBookings(initialBookings);
      setPagination(prev => ({
        ...prev,
        total: initialBookings.length
      }));
    } catch (error) {
      console.error('Error loading demo bookings:', error);
      message.error('Failed to load demo bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return bookings;
    const searchLower = searchText.toLowerCase();
    return bookings.filter((booking) =>
      booking.fullName?.toLowerCase().includes(searchLower) ||
      booking.email?.toLowerCase().includes(searchLower) ||
      booking.phone?.includes(searchText) ||
      booking.program?.toLowerCase().includes(searchLower) ||
      booking.status?.toLowerCase().includes(searchLower)
    );
  }, [searchText, bookings]);

  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination.current, pagination.pageSize]);

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredData.length,
      current: Math.min(prev.current, Math.ceil(filteredData.length / prev.pageSize) || 1)
    }));
  }, [filteredData]);

  const handleDelete = (booking) => {
    Modal.confirm({
      title: 'Delete Booking',
      content: `Are you sure you want to delete the booking for ${booking.fullName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        const updatedBookings = bookings.filter(b => b._id !== booking._id);
        setBookings(updatedBookings);
        message.success(`Booking for ${booking.fullName} has been deleted.`);

        const filtered = searchText.trim()
          ? updatedBookings.filter(b =>
              Object.values(b).some(
                val => val && val.toString().toLowerCase().includes(searchText.toLowerCase().trim())
              )
            )
          : updatedBookings;

        const maxPage = Math.ceil(filtered.length / pagination.pageSize) || 1;
        const currentPage = Math.min(pagination.current, maxPage);

        setPagination(prev => ({
          ...prev,
          total: filtered.length,
          current: currentPage
        }));
      }
    });
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setSelectedBooking(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination(prev => ({
      ...prev,
      current: 1,
      total: bookings.filter(b =>
        Object.values(b).some(
          val => val && val.toString().toLowerCase().includes(value.toLowerCase().trim())
        )
      ).length
    }));
  };

  const renderStatusBadge = (status) => {
    const statusColors = {
      'Confirmed': { color: 'success', text: 'Confirmed' },
      'Pending': { color: 'warning', text: 'Pending' },
      'Cancelled': { color: 'error', text: 'Cancelled' },
      'Completed': { color: 'processing', text: 'Completed' }
    };
    const statusInfo = statusColors[status] || { color: 'default', text: status || 'Pending' };

    return (
      <Tag color={statusInfo.color}>
        {statusInfo.text}
      </Tag>
    );
  };

  return (
    <Card
      title={
        <Title level={4} className="pt-2">
          Booking Management
          <p style={{ fontSize: "12px", color: "#888" }}>
            Manage all your bookings in one place
          </p>
        </Title>
      }
      bordered={false}
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input.Search
            placeholder="Search bookings..."
            enterButton={<SearchOutlined />}
            allowClear
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              handleSearch(value);
            }}
          />
        </Col>
        <Col>
          <Button
            loading={loading}
            onClick={() => window.location.reload()}
            icon={<ReloadOutlined />}
            style={{ marginRight: 8 }}
          >
            Refresh
          </Button>
          {/* <Button type="primary" icon={<PlusOutlined />}>
            New Booking
          </Button> */}
        </Col>
      </Row>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading bookings...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.program}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.age}</td>
                  <td className="px-6 py-4">{renderStatusBadge(booking.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <Space>
                      <Button 
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(booking)}
                        title="View Details"
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(booking)}
                        title="Delete"
                      />
                    </Space>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">
              {Math.min((pagination.current - 1) * pagination.pageSize + 1, pagination.total)}
            </span> to <span className="font-medium">
              {Math.min(pagination.current * pagination.pageSize, pagination.total)}
            </span> of <span className="font-medium">{pagination.total}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                setPagination(prev => ({
                  ...prev,
                  current: Math.max(prev.current - 1, 1)
                }))
              }
              disabled={pagination.current === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPagination(prev => ({
                  ...prev,
                  current: prev.current + 1
                }))
              }
              disabled={pagination.current * pagination.pageSize >= pagination.total}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        title="Booking Details"
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {selectedBooking.fullName}</p>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Phone:</strong> {selectedBooking.phone}</p>
            <p><strong>Program:</strong> {selectedBooking.program}</p>
            <p><strong>Age:</strong> {selectedBooking.age}</p>
            <p><strong>Status:</strong> {renderStatusBadge(selectedBooking.status)}</p>
            {selectedBooking.message && (
              <div className="mt-4">
                <p className="font-medium">Message:</p>
                <p className="mt-1 p-3 bg-gray-50 rounded">{selectedBooking.message}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default BookingsPage;

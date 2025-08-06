import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  message,
  Input,
  Card,
  Row,
  Col,
  Typography,
  Select,
  Modal,
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  removeBooking,
  selectAllBookings,
  selectBookingsStatus,
} from "../../../redux/booking/bookingSlice";
import BookingTable from "./BookingTable";
import DeleteConfirmModal from "../../../components/Modals/DeleteConfirmModal";

const { Title } = Typography;
const { Option } = Select;

const BookingsPage = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookings);
  const status = useSelector(selectBookingsStatus);

  const [searchText, setSearchText] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState({});

  const loading = status === "loading";

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    let data = bookings;

    if (searchText) {
      const lower = searchText.toLowerCase();
      data = data.filter((b) =>
        Object.values(b).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
    }

    if (programFilter) {
      data = data.filter((b) => b.selectedProgram === programFilter);
    }

    if (statusFilter) {
      data = data.filter((b) => (b.status || "Pending") === statusFilter);
    }

    if (sorter && sorter.field) {
      const { field, order } = sorter;
      data = [...data].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (typeof aVal === "string") {
          return order === "ascend"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return order === "ascend" ? aVal - bVal : bVal - aVal;
      });
    }

    return data;
  }, [bookings, searchText, programFilter, statusFilter, sorter]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredData.length,
    }));
  }, [filteredData]);

  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalVisible(true);
  };

  const handleCancelModals = () => {
    setSelectedBooking(null);
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBooking) return;
    try {
      await dispatch(removeBooking(selectedBooking._id)).unwrap();
      message.success("Booking deleted successfully");
    } catch (err) {
      message.error("Failed to delete booking");
    } finally {
      handleCancelModals();
    }
  };

  const handleTableChange = (paginationObj, filters, sorterObj) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationObj.current,
      pageSize: paginationObj.pageSize,
    }));

    if (sorterObj.order) {
      setSorter({
        field: sorterObj.field,
        order: sorterObj.order,
      });
    } else {
      setSorter({});
    }
  };

  const uniquePrograms = [...new Set(bookings.map((b) => b.selectedProgram))];
  const uniqueStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];

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
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Search bookings..."
            allowClear
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={5}>
          <Select
            allowClear
            placeholder="Filter by Program"
            value={programFilter || undefined}
            onChange={(value) => setProgramFilter(value || "")}
            style={{ width: "100%" }}
          >
            {uniquePrograms.map((program) => (
              <Option key={program} value={program}>
                {program}
              </Option>
            ))}
          </Select>
        </Col>
        {/* <Col xs={12} sm={6} md={5}>
          <Select
            allowClear
            placeholder="Filter by Status"
            value={statusFilter || undefined}
            onChange={(value) => setStatusFilter(value || "")}
            style={{ width: "100%" }}
          >
            {uniqueStatuses.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Col> */}
        <Col>
          <Button
            loading={loading}
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchBookings())}
          >
            Refresh
          </Button>
        </Col>
      </Row>

      <BookingTable
        bookings={paginatedData}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} bookings`,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        handleTableChange={handleTableChange}
      />

      <Modal
        title="Booking Details"
        open={isViewModalVisible}
        onCancel={handleCancelModals}
        footer={[
          <Button key="close" onClick={handleCancelModals}>
            Close
          </Button>,
        ]}
      >
        {selectedBooking && (
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {selectedBooking.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedBooking.phone}
            </p>
            <p>
              <strong>Program:</strong> {selectedBooking.selectedProgram}
            </p>
            <p>
              <strong>Pricing:</strong> {selectedBooking.selectedPricing}
            </p>
            <p>
              <strong>Preferred Date:</strong>{" "}
              {new Date(selectedBooking.preferredDate).toLocaleDateString()}
            </p>
            {selectedBooking.notes && (
              <>
                <p className="font-medium">Notes:</p>
                <p className="bg-gray-100 p-2 rounded">
                  {selectedBooking.notes}
                </p>
              </>
            )}
          </div>
        )}
      </Modal>

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={handleCancelModals}
        onConfirm={handleConfirmDelete}
        title="Delete Booking"
        content="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </Card>
  );
};

export default BookingsPage;

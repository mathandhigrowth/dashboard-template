import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  removeContact,
  selectContacts,
  selectContactsStatus,
} from "../../../redux/contact/contactSlice";

import DeleteConfirmModal from "../../../components/Modals/DeleteConfirmModal";
import ViewMessageModal from "./components/ViewMessageModal";
import ContactTable from "./ContactTable";

const { Title } = Typography;

const ContactPage = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const status = useSelector(selectContactsStatus);

  const [searchText, setSearchText] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loading = status === "loading";

  const filteredData = useMemo(() => {
    if (!searchText) return contacts;
    const searchLower = searchText.toLowerCase();
    return contacts.filter((contact) => {
      return (
        contact.name?.toLowerCase().includes(searchLower) ||
        contact.email?.toLowerCase().includes(searchLower) ||
        contact.phone?.includes(searchText) ||
        contact.message?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchText, contacts]);

  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination.current, pagination.pageSize]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredData.length,
    }));
  }, [filteredData]);

  const handleDelete = (record) => {
    setSelectedContact(record);
    setIsDeleteModalVisible(true);
  };

  const handleView = (record) => {
    setSelectedContact(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsViewModalVisible(false);
    setSelectedContact(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedContact) return;

    try {
      await dispatch(removeContact(selectedContact)).unwrap();
      message.success("Contact deleted successfully");
    } catch (err) {
      console.error("Error deleting contact:", err);
      message.error("Failed to delete contact");
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedContact(null);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleTableChange = (newPagination) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize || prev.pageSize,
    }));
  };

  return (
    <Card
      title={
        <Title level={4} className="pt-2">
          Contact Messages
          <p style={{ fontSize: "12px", color: "#888" }}>
            Manage contact form submissions
          </p>
        </Title>
      }
      bordered={false}
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input.Search
            placeholder="Search messages..."
            enterButton={<SearchOutlined />}
            allowClear
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </Col>
      </Row>

      <ContactTable
        contacts={paginatedData}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} messages`,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        handleTableChange={handleTableChange}
      />

      <ViewMessageModal
        visible={isViewModalVisible}
        onCancel={handleCancel}
        contact={selectedContact}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        title="Delete Message"
        content="Are you sure you want to delete this message? This action cannot be undone."
      />
    </Card>
  );
};

export default ContactPage;

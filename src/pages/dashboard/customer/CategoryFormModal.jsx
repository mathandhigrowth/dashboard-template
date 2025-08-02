import React, { useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Select, Upload, Checkbox, Spin, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const CustomerFormModal = ({ visible, onCancel, customer, onSubmit, loading, error }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (customer) {
        form.setFieldsValue({
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          dob: customer.dob ? dayjs(customer.dob) : null,
          gender: customer.gender,
          occupation: customer.occupation,
          address: customer.address,
          emergencyContactName: customer.emergencyContactName,
          emergencyContactNumber: customer.emergencyContactNumber,
          agree: true,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ agree: true });
      }
    }
  }, [customer, visible, form]);

  const handleFinish = (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "dob" && value) {
        formData.append("dob", value.format("YYYY-MM-DD"));
      } else if (key === "idProofFile" && value?.file?.originFileObj) {
        formData.append("idProofFile", value.file.originFileObj);
      } else if (key !== "agree") {
        formData.append(key, value);
      }
    });

    if (customer && customer._id) {
      formData.append("_id", customer._id);
    }

    onSubmit(formData);
  };

  const validateFile = (file) => {
    const isAllowedType = ["image/jpeg", "image/png", "application/pdf"].includes(file.type);
    const isAllowedSize = file.size / 1024 / 1024 < 10;

    if (!isAllowedType) {
      return Upload.LIST_IGNORE;
    }
    if (!isAllowedSize) {
      return Upload.LIST_IGNORE;
    }
    return false; 
  };

  return (
    <Modal centered title={customer ? "Edit Customer" : "Add New Customer"} open={visible} onCancel={onCancel} footer={null} maskClosable={false}>
      <Form form={form} layout="vertical" onFinish={handleFinish} encType="multipart/form-data">
        {error && <Alert message={error} type="error" showIcon closable className="mb-4" />}

        <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: "Please enter full name" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please enter phone number" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Date of Birth">
          <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select placeholder="Select Gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="occupation" label="Occupation">
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="emergencyContactName" label="Emergency Contact Name">
          <Input />
        </Form.Item>

        <Form.Item name="emergencyContactNumber" label="Emergency Contact Number">
          <Input />
        </Form.Item>

        <Form.Item name="idProofFile" label="ID Proof Document">
          <Upload beforeUpload={validateFile} maxCount={1} accept=".png,.jpg,.jpeg,.pdf">
            <Button icon={<UploadOutlined />}>Click to Upload or Drag & Drop</Button>
          </Upload>
          <div style={{ fontSize: "12px", color: "#888", marginTop: 4 }}>PNG, JPG, PDF up to 10MB</div>
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject("You must agree to terms")),
            },
          ]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? <Spin /> : customer ? "Update Customer" : "Add Customer"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerFormModal;

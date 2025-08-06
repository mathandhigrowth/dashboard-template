import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthStatus, selectAuthError, selectIsAuthenticated } from "../../redux/auth/authSlice";
import { Button, Form, Input, Alert, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form] = Form.useForm();
  const isLoading = authStatus === "loading";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full mx-auto border rounded-lg shadow-xl bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">RUTS N RIDES - Admin Login</h1>
        <Form form={form} name="login" onFinish={onFinish} layout="vertical" requiredMark="optional">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spin size="small" /> : "Log in"}
            </Button>
          </Form.Item>
        </Form>

        {authError && <Alert message={typeof authError === "string" ? authError : "Login failed"} type="error" showIcon className="mb-4" />}
      </div>
    </div>
  );
};

export default LoginPage;

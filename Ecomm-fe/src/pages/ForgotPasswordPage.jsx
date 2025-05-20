import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Steps,
  Card,
  message,
  Row,
  Col,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { forgotPassword, resetPassword } from "../services/user.service";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [note, contextHolder] = notification.useNotification();
  const [otpSent, setOtpSent] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStep1 = async (values) => {
    setLoading(true);
    try {
      const response = await forgotPassword(values.email, values.username);
      if (response.data) {
        setOtpSent(response.data.otp);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserData({
          ...userData,
          email: values.email,
          username: values.username,
        });
        nextStep();
      } else {
        note.error({
          message: "Thông báo",
          description: response.message,
        });
      }
    } catch (error) {
      message.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle step 2: OTP verification
  const handleStep2 = async (values) => {
    setLoading(true);
    try {
      if (values.otp === otpSent) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserData({
          ...userData,
          otp: values.otp,
        });
        nextStep();
      } else {
        note.error({
          message: "Thông báo",
          description: "OTP không chính xác",
        });
      }
    } catch (error) {
      message.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle step 3: Reset password
  const handleStep3 = async (values) => {
    setLoading(true);
    try {
      const response = await resetPassword(
        userData.username,
        values.newPassword
      );
      if (response.data) {
        note.success({
          message: "Thông báo",
          description: "Đặt lại mật khẩu thành công",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        note.error({
          message: "Thông báo",
          description: response.message,
        });
      }
    } catch (error) {
      message.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Email and Username form
  const renderStep1 = () => {
    return (
      <Form
        form={form}
        name="forgot_password_step1"
        onFinish={handleStep1}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // Step 2: OTP verification form
  const renderStep2 = () => {
    return (
      <Form
        form={form}
        name="forgot_password_step2"
        onFinish={handleStep2}
        layout="vertical"
      >
        <Form.Item
          label="OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input the OTP sent to your email!",
            },
            {
              pattern: /^\d{6}$/,
              message: "OTP must be 6 digits!",
            },
          ]}
        >
          <Input
            prefix={<KeyOutlined />}
            placeholder="Enter 6-digit OTP"
            size="large"
            maxLength={6}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Verify OTP
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" size="large" block onClick={prevStep}>
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // Step 3: New password form
  const renderStep3 = () => {
    return (
      <Form
        form={form}
        name="forgot_password_step3"
        onFinish={handleStep3}
        layout="vertical"
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="New Password"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xác nhận lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Reset Password
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" size="large" block onClick={prevStep}>
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // Render the current step form
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Col xs={22} sm={18} md={12} lg={10} xl={8}>
        <Card
          title="Forgot Password"
          bordered={false}
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Steps current={currentStep} style={{ marginBottom: 40 }}>
            <Step title="Verify Account" description="Email & Username" />
            <Step title="OTP Verification" description="Enter 6-digit code" />
            <Step title="Reset Password" description="Create new password" />
          </Steps>

          {renderStepContent()}
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;

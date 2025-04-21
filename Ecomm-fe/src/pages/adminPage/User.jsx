import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const User = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values:", values);


    message.success("User created successfully!");
    navigate("/admin/users");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Create User</h2>
      <Form
        name="create_user"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          role: "USER", 
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="USER">USER</Option>
            <Option value="ADMIN">ADMIN</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default User;

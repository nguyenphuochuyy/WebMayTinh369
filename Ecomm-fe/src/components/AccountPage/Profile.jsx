import React, { use, useContext, useEffect } from "react";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";
import "../../styles/AccountPage/Profile.scss";
import { Form, Input, Button, Row, Col, message } from "antd";
import { AuthContext } from "../context/auth.context";

const Profile = () => {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    console.log("profile page running");
    console.log("user", user);
    if (user) {
      setUsername(user.username || ""); 
      setEmail(user.email || ""); 
    }
  },[user])
 




 
  const handleCancel = () => {
    form.resetFields();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
  };

  return (
    <div className="account-page">
      <AccountSidebar />
      <div className="profile-container">
        <Form
          form={form}
          layout="vertical"
          // onFinish={handleFinish}
          className="profile-form"
          initialValues={{
            username: user.username || "",
            email: user.email || "",
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12} span={24}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              >
                <Input
                  name="username"
                  style={{ width: "100%" }}
                  // onChange={handleInputChange}  
                  value=""abc// Cập nhật formData khi người dùng thay đổi giá trị
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  name="email"
                  style={{ width: "100%" }}
                  // onChange={handleInputChange} 
                  value="abc" // Cập nhật formData khi người dùng thay đổi giá trị
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="action-buttons">
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
              <Button htmlType="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;

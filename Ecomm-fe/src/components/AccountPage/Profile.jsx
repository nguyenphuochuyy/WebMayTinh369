import React, { useContext, useEffect, useState } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Row, 
  Col, 
  Card, 
  Typography, 
  Divider, 
  Avatar, 
  message, 
  Upload, 
  Space,
  Skeleton
} from "antd";
import { 
  UserOutlined, 
  MailOutlined, 
  SaveOutlined, 
  CloseOutlined,
  EditOutlined,
  UploadOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";
import { AuthContext } from "../context/auth.context";
import "../../styles/AccountPage/Profile.scss"

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        website: user.website || ""
      });
      setAvatarUrl(user.avatar);
    }
  }, [user, form]);

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      website: user.website || ""
    });
    setEditing(false);
  };

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser((prevUser) => ({
        ...prevUser,
        ...values,
        avatar: avatarUrl
      }));
      
      setLoading(false);
      setEditing(false);
      message.success("Thông tin cá nhân đã được cập nhật thành công!");
    }, 1000);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Normally you would get the URL from the server response
      // Here we simulate it with a fake URL
      const fakeImageUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(fakeImageUrl);
      message.success(`${info.file.name} đã được tải lên thành công`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  // For demo purpose, create a fake upload request
  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  if (!user) {
    return (
      <div className="account-page">
        <AccountSidebar />
        <Card className="profile-card">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  return (
    <div className="account-page">
      <AccountSidebar />

      <div className="profile-content">
        <Card
          className="profile-card"
          bordered={false}
          title={
            <Title level={3}>
              <UserOutlined /> Thông tin cá nhân
            </Title>
          }
          extra={
            !editing ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={handleStartEditing}
              >
                Chỉnh sửa
              </Button>
            ) : null
          }
        >
          <Row gutter={32}>
            <Col xs={24} md={8} className="avatar-section">
              <div className="avatar-container">
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />}
                  src={avatarUrl}
                  className="user-avatar"
                />
                
                {editing && (
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    customRequest={customRequest}
                    onChange={handleAvatarChange}
                    className="avatar-uploader"
                  >
                    <Button icon={<UploadOutlined />} size="small">
                      Thay đổi ảnh
                    </Button>
                  </Upload>
                )}
              </div>
              
              {!editing && (
                <div className="user-info-display">
                  <Title level={4}>{user.username}</Title>
                  <Text type="secondary">{user.email}</Text>
                  
                  {user.phone && (
                    <div className="info-item">
                      <PhoneOutlined /> {user.phone}
                    </div>
                  )}
                  
                  {user.address && (
                    <div className="info-item">
                      <HomeOutlined /> {user.address}
                    </div>
                  )}
                  
                  {user.website && (
                    <div className="info-item">
                      <GlobalOutlined /> {user.website}
                    </div>
                  )}
                </div>
              )}
            </Col>
            
            <Col xs={24} md={16}>
              {editing ? (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  className="profile-form"
                  initialValues={{
                    username: user.username,
                    email: user.email,
                    phone: user.phone || "",
                    address: user.address || "",
                    website: user.website || ""
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
                      >
                        <Input 
                          prefix={<UserOutlined />} 
                          placeholder="Tên người dùng"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email" },
                          { type: "email", message: "Email không hợp lệ" }
                        ]}
                      >
                        <Input 
                          prefix={<MailOutlined />} 
                          placeholder="Email"
                          disabled  // Usually email is not easily changed
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                      >
                        <Input 
                          prefix={<PhoneOutlined />} 
                          placeholder="Số điện thoại"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Website"
                        name="website"
                      >
                        <Input 
                          prefix={<GlobalOutlined />} 
                          placeholder="Website"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                  >
                    <Input.TextArea 
                      placeholder="Địa chỉ của bạn"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  
                  <Divider />
                  
                  <Form.Item>
                    <Space>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<SaveOutlined />}
                        loading={loading}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button 
                        onClick={handleCancelEdit}
                        icon={<CloseOutlined />}
                      >
                        Hủy
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              ) : (
                <div className="user-profile-details">
                  <Divider orientation="left">Thông tin chi tiết</Divider>
                  
                  <Row gutter={[16, 24]}>
                    <Col span={24}>
                      <Card
                        className="info-card"
                        size="small"
                        title="Thông tin liên hệ"
                      >
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
                            <div className="detail-item">
                              <Text type="secondary">Email:</Text>
                              <Text strong>{user.email}</Text>
                            </div>
                          </Col>
                          
                          <Col xs={24} sm={12}>
                            <div className="detail-item">
                              <Text type="secondary">Số điện thoại:</Text>
                              <Text strong>{user.phone || "Chưa cập nhật"}</Text>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    
                    <Col span={24}>
                      <Card
                        className="info-card"
                        size="small"
                        title="Địa chỉ"
                      >
                        <div className="detail-item">
                          <Text strong>{user.address || "Chưa cập nhật địa chỉ"}</Text>
                        </div>
                      </Card>
                    </Col>
                    
                    <Col span={24}>
                      <Card
                        className="info-card"
                        size="small"
                        title="Thông tin khác"
                      >
                        <div className="detail-item">
                          <Text type="secondary">Website:</Text>
                          <Text strong>{user.website || "Chưa cập nhật"}</Text>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </div>
      
    </div>
  );
};

export default Profile;
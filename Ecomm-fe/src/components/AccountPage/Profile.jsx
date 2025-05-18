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
  Skeleton,
  List
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
  GlobalOutlined,
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";
import { AuthContext } from "../context/auth.context";
import "../../styles/AccountPage/Profile.scss"
import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const [addresses, setAddresses] = useState(user?.addresses || [{ city: "", street: "" }]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phone: user.phone || "",
      });
      setAvatarUrl(user.avatar);
      setAddresses(user.addresses && user.addresses.length > 0 ? user.addresses : [{ city: "", street: "" }]);
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
    });
    setAddresses(user.addresses && user.addresses.length > 0 ? user.addresses : [{ city: "", street: "" }]);
    setEditing(false);
  };

  const handleFinish = (values) => {
    setLoading(true);
    console.log(values);
    
    // Create a copy of values to avoid mutating the parameter
    const updatedValues = { ...values };
    
    // Add addresses array to updatedValues
    updatedValues.addresses = addresses.filter(addr => addr.city || addr.street);
    
    // Simulate API call
    setTimeout(() => {
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedValues,
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

  // Handle changes to address fields
  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddresses(newAddresses);
  };


  // Remove an address
  const removeAddress = (index) => {
    if (addresses.length > 1) {
      const newAddresses = [...addresses];
      newAddresses.splice(index, 1);
      setAddresses(newAddresses);
    } else {
      message.info("Cần giữ lại ít nhất một địa chỉ");
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
                  
                  {user.addresses && user.addresses.length > 0 && (
                    <div className="info-item">
                      <HomeOutlined /> {user.addresses[0].city && user.addresses[0].street ? 
                        `${user.addresses[0].street}, ${user.addresses[0].city}` : 
                        (user.addresses[0].street || user.addresses[0].city || "Chưa cập nhật địa chỉ")}
                      {user.addresses.length > 1 && (
                        <Text type="secondary"> (+{user.addresses.length - 1} địa chỉ khác)</Text>
                      )}
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
                          readOnly
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
                          readOnly 
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
                    
                  
                  </Row>
                  
                  <Divider orientation="left">
                    Địa chỉ
                    <Button 
                      type="link" 
                      icon={<PlusOutlined />} 
                      onClick={() => navigate("/account/addresses")}
                      style={{ marginLeft: 8 }}
                    >
                      Quản lý địa chỉ
                    </Button>
                  </Divider>
                  
                  {addresses.map((address, index) => (
                    <div key={index} className="address-item">
                      {index > 0 && <Divider dashed />}
                      <Row gutter={16} align="middle">

                         
                      <Col xs={24} md={11}>
                          <Form.Item label="Đường/Số nhà">
                            <Input 
                              value={address.street} 
                              readOnly
                              onChange={e => handleAddressChange(index, 'street', e.target.value)}
                              placeholder="Đường/Số nhà "
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={11}>
                          <Form.Item label="Thành phố ">
                            <Input 
                              value={address.city} 
                              readOnly
                              onChange={e => handleAddressChange(index, 'city', e.target.value)}
                              placeholder="Thành phố "
                            />
                          </Form.Item>
                        </Col>
                       
                        
                        <Col xs={24} md={2} style={{ textAlign: 'center' }}>
                          {/* <Button 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => removeAddress(index)}
                            disabled={addresses.length <= 1}
                          /> */}
                        </Col>
                      </Row>
                    </div>
                  ))}
                  
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
                        {user.addresses && user.addresses.length > 0 ? (
                          <List
                            dataSource={user.addresses}
                            renderItem={(address, index) => (
                              <List.Item className="address-list-item">
                                <div className="address-content">
                                  <Text strong>{`Địa chỉ ${index + 1}:`}</Text>
                                  <ul className="address-details">
                                  <li>
                                      <Text type="secondary">Đường/Số nhà: </Text>
                                      <Text>{address.street || "Chưa cập nhật"}</Text>
                                    </li>

                                    <li>
                                      <Text type="secondary">Thành phố: </Text>
                                      <Text>{address.city || "Chưa cập nhật"}</Text>
                                    </li>
                                   
                                  </ul>
                                </div>
                              </List.Item>
                            )}
                          />
                        ) : (
                          <div className="detail-item">
                            <Text>Chưa cập nhật địa chỉ</Text>
                          </div>
                        )}
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
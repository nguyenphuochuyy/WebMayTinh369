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
  List,
  Modal,
  notification,
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
  PlusOutlined,
  DeleteOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";
import { AuthContext } from "../context/auth.context";
import "../../styles/AccountPage/Profile.scss";
import { useNavigate } from "react-router-dom";
import { changePassword, updateUser } from "../../services/user.service";
import { logoutAPI } from "../../services/api.service";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const [note, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const [file, setFile] = useState(null); // Lưu file ảnh
  const [previewUrl, setPreviewUrl] = useState(""); // URL preview ảnh (có thể bỏ nếu không cần preview riêng)
  const [addresses, setAddresses] = useState(
    user?.addresses || [{ city: "", street: "" }]
  );
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  console.log("user >>>>>>>>>>>>>>", user);

  // Cập nhật giá trị ban đầu khi user thay đổi
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
      });
      setAvatarUrl(user.avatar || null);
      setAddresses(
        user.addresses && user.addresses.length > 0
          ? user.addresses
          : [{ city: "", street: "" }]
      );
    }
  }, [user, form]);

  // Cleanup preview URL để tránh memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Hàm gọi API để cập nhật avatar
  const updateAvatar = async (id, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `http://localhost:8080/users/updateAvatar/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Lỗi khi cập nhật avatar");
    }
  };

  // Hàm xử lý upload tùy chỉnh
  const customRequest = ({ file, onSuccess, onError }) => {
    const url = URL.createObjectURL(file); // Tạo URL tạm để hiển thị ngay
    setAvatarUrl(url); // Cập nhật avatarUrl ngay khi chọn ảnh
    setFile(file); // Lưu file để gửi lên server
    setPreviewUrl(""); // Có thể bỏ preview riêng nếu dùng avatarUrl
    onSuccess();
  };

  // Xử lý khi thay đổi file (tùy chọn, có thể bỏ nếu không cần)
  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} đã được tải lên thành công!`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải lên thất bại!`);
    }
  };

  // Xử lý lưu ảnh
  const handleSave = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh trước khi lưu!");
      return;
    }

    if (!user?.id) {
      message.error("Không tìm thấy thông tin người dùng!");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateAvatar(user.id, file);
      setUser(updatedUser); // Cập nhật user trong context
      setAvatarUrl(updatedUser.avatar); // Cập nhật avatarUrl từ server
      message.success("Cập nhật avatar thành công!");
      setFile(null);
    } catch (error) {
      message.error(error.message);
      // Nếu lưu thất bại, khôi phục avatarUrl cũ
      setAvatarUrl(user.avatar || null);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý hủy bỏ
  const handleCancel = () => {
    setFile(null);
    setAvatarUrl(user.avatar || null); // Khôi phục avatarUrl cũ khi hủy
    setPreviewUrl("");
    message.info("Hủy bỏ thay đổi ảnh!");
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
    });
    setAddresses(
      user.addresses && user.addresses.length > 0
        ? user.addresses
        : [{ city: "", street: "" }]
    );
    setEditing(false);
  };

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdateUser = async (values) => {
    try {
      const updatedValues = {
        ...values,
        addresses: addresses.filter((addr) => addr.city || addr.street),
      };
      const res = await updateUser(updatedValues);
      if (res) {
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedValues,
          avatar: avatarUrl,
          refresh: !prevUser.refresh,
        }));
        message.success("Cập nhật thông tin thành công");
        setEditing(false);
      } else {
        message.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      message.error("Cập nhật thông tin thất bại: " + error.message);
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    await handleUpdateUser(values);
    setLoading(false);
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

  // Hiển thị modal đổi mật khẩu
  const showPasswordModal = () => {
    passwordForm.resetFields();
    setPasswordModalVisible(true);
  };

  // Đóng modal đổi mật khẩu
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = async (values) => {
    setPasswordLoading(true);
    const response = await changePassword(values);
    console.log("response >>>>>", response);
    if(response.data && response.data.status === "success") {
      note.success({
          message: "Thông báo",
          description: response.data.message,
      });
      closePasswordModal();
      setTimeout( async () => {
         await logoutAPI();
              localStorage.removeItem("access_token");
              localStorage.removeItem("role");
              navigate("/login");
      }, 1000);
    } else {
      note.error({
        message: "Thông báo",
        description: response.message,
      });
    }
    setPasswordLoading(false);
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
      {contextHolder}
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
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleStartEditing}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  icon={<LockOutlined />}
                  onClick={showPasswordModal}
                >
                  Đổi mật khẩu
                </Button>
              </Space>
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
              </div>

              <div>
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
                {file && (
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      type="primary"
                      onClick={handleSave}
                      loading={loading}
                      style={{ marginRight: "10px" }}
                    >
                      Lưu
                    </Button>
                    <Button onClick={handleCancel} disabled={loading}>
                      Hủy bỏ
                    </Button>
                  </div>
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
                      <HomeOutlined />{" "}
                      {user.addresses[0].city && user.addresses[0].street
                        ? `${user.addresses[0].street}, ${user.addresses[0].city}`
                        : user.addresses[0].street ||
                          user.addresses[0].city ||
                          "Chưa cập nhật địa chỉ"}
                      {user.addresses.length > 1 && (
                        <Text type="secondary">
                          {" "}(+{user.addresses.length - 1} địa chỉ khác)
                        </Text>
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
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone || "",
                    role: user.role,
                  }}
                >
                  <Row gutter={16} style={{ display: "none" }}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Id" name="id">
                        <Input
                          prefix={<UserOutlined />}
                          readOnly
                          placeholder=""
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ display: "none" }}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Role" name="role">
                        <Input
                          prefix={<UserOutlined />}
                          readOnly
                          placeholder=""
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên người dùng",
                          },
                        ]}
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
                          { type: "email", message: "Email không hợp lệ" },
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
                      <Form.Item label="Số điện thoại" name="phone">
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
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "street",
                                  e.target.value
                                )
                              }
                              placeholder="Đường/Số nhà"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={11}>
                          <Form.Item label="Thành phố">
                            <Input
                              value={address.city}
                              onChange={(e) =>
                                handleAddressChange(index, "city", e.target.value)
                              }
                              placeholder="Thành phố"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={2} style={{ textAlign: "center" }}>
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeAddress(index)}
                            disabled={addresses.length <= 1}
                          />
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
                              <Text strong>
                                {user.phone || "Chưa cập nhật"}
                              </Text>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    <Col span={24}>
                      <Card className="info-card" size="small" title="Địa chỉ">
                        {user.addresses && user.addresses.length > 0 ? (
                          <List
                            dataSource={user.addresses}
                            renderItem={(address, index) => (
                              <List.Item className="address-list-item">
                                <div className="address-content">
                                  <Text strong>{`Địa chỉ ${index + 1}:`}</Text>
                                  <ul className="address-details">
                                    <li>
                                      <Text type="secondary">
                                        Đường/Số nhà:{" "}
                                      </Text>
                                      <Text>
                                        {address.street || "Chưa cập nhật"}
                                      </Text>
                                    </li>

                                    <li>
                                      <Text type="secondary">Thành phố: </Text>
                                      <Text>
                                        {address.city || "Chưa cập nhật"}
                                      </Text>
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

      {/* Modal đổi mật khẩu */}
      <Modal
        title={
          <div>
            <LockOutlined /> Đổi mật khẩu
          </div>
        }
        open={passwordModalVisible}
        onCancel={closePasswordModal}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
          scrollToFirstError
        >
          <Form.Item
            name="oldPassword"
            label="Mật khẩu hiện tại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu hiện tại"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
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
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu mới"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu mới!",
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
              placeholder="Xác nhận mật khẩu mới"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: "right" }}>
              <Button onClick={closePasswordModal}>Hủy</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
                icon={<LockOutlined />}
              >
                Đổi mật khẩu
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Spin,
  Table,
  Space,
  Layout,
  List,
  Modal,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { addUser, getListUser, updateUser } from "../../services/user.service";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
const { Option } = Select;

const User = () => {
  // State quản lý loading danh sách người dùng
  const [loading, setLoading] = useState(false);
  // State quản lý danh sách người dùng
  const [users, setUsers] = useState([]);
  // state quản lý modal thêm người dùng
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // State quản lý modal sửa người dùng
  const [isVisible, setIsVisible] = useState(false);
  // State quản lý người dùng được chọn
  const [selectedUser, setSelectedUser] = useState(null);
  // State quản lý giá trị tìm kiếm
  const [searchText, setSearchText] = useState("");
  // State quản lý danh sách người dùng đã lọc (cho tìm kiếm)
  const [filteredUsers, setFilteredUsers] = useState([]);
  // state quản lý form
  const [form] = Form.useForm();
  // state quản lý form thêm người dùng
  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    message.success("Tạo người dùng thành công!");
    navigate("/admin/users");
  };

  // Xử lý hiển thị modal chỉnh sửa
  const handleEdit = (record) => {
    setSelectedUser(record);
    form.setFieldsValue({
      id: record.id,
      username: record.username,
      role: record.role,
      name: record.name,
      email: record.email,
      phone: record.phone,
    });
    setIsVisible(true);
  };
  // Hàm xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchText(value);
    if (value == null || value === "") {
      setFilteredUsers(users); // Nếu không có giá trị tìm kiếm, hiển thị tất cả người dùng
      return;
    }
    const lowerCaseSearch = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username?.toLowerCase().includes(lowerCaseSearch) ||
        user.name?.toLowerCase().includes(lowerCaseSearch) ||
        user.email?.toLowerCase().includes(lowerCaseSearch) ||
        user.phone?.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredUsers(filtered);
  };
  // Hàm xử lý sửa người dùng
  const handleEditUser = async (values) => {
    const userData = {
      id: selectedUser?.id?.toString(),
      username: values.username,
      name: values.name,
      role: values.role,
      email: values.email,
      phone: values.phone,
    };
    if (values.password) {
      userData.password = values.password;
    }
    const response = await updateUser(userData);
    if (response.status === "success") {
      message.success("Cập nhật thông tin người dùng thành công!");
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      );
      setFilteredUsers(updatedUsers);
      setIsVisible(false);
    } else {
      message.error(
        response.message || "Cập nhật thông tin người dùng thất bại!"
      );
    }
  };
  // Hàm xử lý thêm mới người dùng
  const handleAddUser = async (values) => {
    try {
      setLoading(true);
      const userData = {
        username: values.username,
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      const response = await addUser(userData);
      if (!response) {
        throw new Error("Thêm người dùng không thành công");
      }
      message.success("Thêm người dùng thành công!");
      setFilteredUsers((prevUsers) => [...prevUsers, response.data]);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      // Reset form sau khi thêm người dùng
      addForm.resetFields();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error(error.message || "Thêm người dùng thất bại!");
    } finally {
      setLoading(false);
    }
  };
  // Hàm xử lý xóa người dùng
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?"
    );
    if (!confirmDelete) return;
     // hiển thị modal xác nhận xóa
        if (!userId) return;
        try {
          const response = await fetch(
            `http://localhost:8080/users/delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Xóa người dùng không thành công");
        }
        const data = await response.json();
        if(!data){
          throw new Error("Xóa người dùng không thành công");
        }
        message.success("Xóa người dùng thành công!");
        // Cập nhật danh sách người dùng sau khi xóa
        const updatedUsers = users.filter((user) => user.id !== userId);
        setFilteredUsers(updatedUsers);
        setUsers(updatedUsers);
      } catch (error) {
        message.error("Lỗi khi xóa người dùng", error);
      } 
    
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "addresses",
      key: "address",
      render: (addresses) => (
        <List
          dataSource={addresses}
          renderItem={(item) => (
            <List.Item>
              {item.street}, {item.city}
            </List.Item>
          )}
        />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Hàm gọi API lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const listUser = await getListUser();
      if (listUser) {
        setUsers(listUser.data);
        setFilteredUsers(listUser.data);
        setLoading(false);
      } else {
        message.error("Lỗi khi lấy danh sách người dùng", listUser.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
      <div style={{ padding: 20 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Title level={2}>Quản lý người dùng</Title>
            <div>
              <Input
                placeholder="Tìm kiếm người dùng"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 250, marginRight: 16 }}
              />
              <Button
                onClick={() => setIsAddModalVisible(true)}
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginRight: 8 }}
              >
                Thêm người dùng
              </Button>
            </div>
          </div>
        </Content>
        {loading ? (
          <Spin tip="Đang tải danh sách người dùng" />
        ) : (
          
          <Table columns={columns} dataSource={filteredUsers} pagination={{ pageSize: 10 }} rowKey="id" />
        )}
      </div>
      {/* Modal sửa người dùng */}
      <Modal
        width={800}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        title={
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            Chỉnh sửa thông tin người dùng
          </span>
        }
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
        centered
        bodyStyle={{ padding: "24px" }}
      >
        <Form
          form={form}
          name="editUser"
          layout="vertical"
          onFinish={handleEditUser}
          style={{ marginTop: "16px" }}
        >
          <Row gutter={[16, 16]}>
            <Form.Item name={"id"} style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <span style={{ fontWeight: "500" }}>Tên người dùng</span>
                }
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên người dùng" },
                ]}
              >
                <Input
                  placeholder="Nhập tên người dùng"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Vai trò</span>}
                name="role"
                rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
              >
                <Select
                  placeholder="Chọn vai trò"
                  style={{ height: "40px", borderRadius: "6px" }}
                >
                  <Option value="ADMIN">ADMIN</Option>
                  <Option value="USER">USER</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Họ và tên</span>}
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Email</span>}
                name="email"
                rules={[
                  { type: "email", message: "Email không hợp lệ" },
                  { required: true, message: "Vui lòng nhập email" },
                ]}
              >
                <Input
                  placeholder="Nhập email"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Số điện thoại</span>}
                name="phone"
                rules={[
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Mật khẩu</span>}
                name="password"
                rules={[
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu mới (nếu muốn thay đổi)"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => setIsVisible(false)}
                style={{ height: "40px", borderRadius: "6px" }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                Lưu thay đổi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal thêm người dùng */}
      {/* Modal thêm mới người dùng */}
      <Modal
        width={800}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        title={
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            Thêm mới người dùng
          </span>
        }
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        centered
        bodyStyle={{ padding: "24px" }}
      >
        <Form
          form={addForm}
          name="addUser"
          layout="vertical"
          onFinish={handleAddUser}
          style={{ marginTop: "16px" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <span style={{ fontWeight: "500" }}>Tên người dùng</span>
                }
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên người dùng" },
                ]}
              >
                <Input
                  placeholder="Nhập tên người dùng"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Họ và tên</span>}
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Email</span>}
                name="email"
                rules={[
                  { type: "email", message: "Email không hợp lệ" },
                  { required: true, message: "Vui lòng nhập email" },
                ]}
              >
                <Input
                  placeholder="Nhập email"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Số điện thoại</span>}
                name="phone"
                rules={[
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={{ fontWeight: "500" }}>Mật khẩu</span>}
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  style={{ height: "40px", borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => setIsAddModalVisible(false)}
                style={{ height: "40px", borderRadius: "6px" }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                Thêm người dùng
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default User;

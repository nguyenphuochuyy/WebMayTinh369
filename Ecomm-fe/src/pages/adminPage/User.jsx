import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  Modal, 
  Form, 
  Select, 
  Popconfirm, 
  message 
} from 'antd';
import { 
  SearchOutlined, 
  UserAddOutlined, 
  EditOutlined, 
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Users = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  
  // Dữ liệu giả lập cho danh sách người dùng
  const [users, setUsers] = useState([
    {
      key: '1',
      id: '001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '29/04/2025 09:23',
    },
    {
      key: '2',
      id: '002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'Active',
      lastLogin: '28/04/2025 15:45',
    },
    {
      key: '3',
      id: '003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '25/04/2025 11:30',
    },
    {
      key: '4',
      id: '004',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '27/04/2025 08:15',
    },
    {
      key: '5',
      id: '005',
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Editor',
      status: 'Blocked',
      lastLogin: '20/04/2025 16:10',
    },
  ]);

  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // Cập nhật người dùng hiện có
        setUsers(prev => 
          prev.map(user => 
            user.id === editingUser.id ? { ...user, ...values } : user
          )
        );
        message.success('Người dùng đã được cập nhật!');
      } else {
        // Thêm người dùng mới
        const newUser = {
          key: Date.now().toString(),
          id: `00${users.length + 1}`,
          ...values,
          lastLogin: 'Chưa đăng nhập'
        };
        setUsers(prev => [...prev, newUser]);
        message.success('Người dùng mới đã được thêm!');
      }
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    message.success('Người dùng đã được xóa!');
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 
                     (user.status === 'Inactive' ? 'Active' : 'Active');
    
    setUsers(prev => 
      prev.map(item => 
        item.id === user.id ? { ...item, status: newStatus } : item
      )
    );
    
    message.success(`Trạng thái người dùng đã chuyển thành ${newStatus}!`);
  };

  // Lọc người dùng dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Editor', value: 'Editor' },
        { text: 'User', value: 'User' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = '';
        if (role === 'Admin') color = 'red';
        else if (role === 'Editor') color = 'blue';
        else color = 'green';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Blocked', value: 'Blocked' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = '';
        if (status === 'Active') color = 'green';
        else if (status === 'Inactive') color = 'orange';
        else if (status === 'Blocked') color = 'red';
        
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => new Date(a.lastLogin.split(' ')[0].split('/').reverse().join('-')) - 
                        new Date(b.lastLogin.split(' ')[0].split('/').reverse().join('-')),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
          <Button
            type={record.status === 'Active' ? 'default' : 'primary'}
            size="small"
            icon={record.status === 'Active' ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handleToggleStatus(record)}
          >
            {record.status === 'Active' ? 'Khóa' : 'Mở khóa'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Title level={2}>Quản lý người dùng</Title>
            <div>
              <Input
                placeholder="Tìm kiếm người dùng..."
                prefix={<SearchOutlined />}
                style={{ width: 250, marginRight: 16 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button 
                type="primary" 
                icon={<UserAddOutlined />} 
                onClick={() => showModal()}
              >
                Thêm người dùng
              </Button>
            </div>
          </div>
          
          <Table
            columns={columns}
            dataSource={filteredUsers}
            pagination={{ pageSize: 10 }}
            bordered
          />

          <Modal
            title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={editingUser ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
          >
            <Form
              form={form}
              layout="vertical"
              name="user_form"
            >
              <Form.Item
                name="name"
                label="Tên"
                rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
              >
                <Input placeholder="Nhập tên người dùng" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
              >
                <Select placeholder="Chọn vai trò">
                  <Option value="Admin">Admin</Option>
                  <Option value="Editor">Editor</Option>
                  <Option value="User">User</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Blocked">Blocked</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Users;
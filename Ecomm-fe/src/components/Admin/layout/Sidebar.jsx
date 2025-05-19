import React, { useContext, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Divider } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  ShoppingOutlined, 
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  BellOutlined,
  MessageOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { logoutAPI } from '../../../services/api.service';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Giả lập dữ liệu người dùng
  const userInfo = {
    name: user.username,
    email: user.email,
    role: 'Admin',
    avatar: user.avatar // Đặt URL hình avatar ở đây nếu có
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      navigate("/login");

      setUser({
        avatar: "",
        email: "",
        fullName: "",
        id: "",
        phone: "",
        role: "",
        username: "",
        sum: 0,
        cartDetails: [],
        refresh: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
    // {
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   label: <Link to="/settings">Settings</Link>,
    // },
  ];

  // Menu dropdown cho tài khoản
  const userMenu = (
    <Menu
      items={[
        // {
        //   key: '1',
        //   icon: <UserOutlined />,
        //   label: 'Thông tin tài khoản',
        // },
        // {
        //   key: '2',
        //   icon: <EditOutlined />,
        //   label: 'Chỉnh sửa hồ sơ',
        // },
        // {
        //   key: '3',
        //   icon: <SettingOutlined />,
        //   label: 'Cài đặt tài khoản',
        // },
        // {
        //   type: 'divider',
        // },
        {
          key: '4',
          icon: <LogoutOutlined />,
          label: 'Đăng xuất',
          danger: true,
          onClick: handleLogout,
        },
      ]}
    />
  );

  // Menu thông báo
  const notificationMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>Người dùng mới đăng ký</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>5 phút trước</p>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>Đơn hàng mới #1234</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>30 phút trước</p>
            </div>
          ),
        },
        {
          key: '3',
          label: (
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>Cập nhật hệ thống</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>2 giờ trước</p>
            </div>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '4',
          label: 'Xem tất cả thông báo',
        },
      ]}
    />
  );

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      theme="dark"
      // width={260}
    >
      <div className="logo" style={{ 
        height: '64px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <h1 style={{ 
          color: 'white', 
          margin: 0, 
          fontSize: collapsed ? '14px' : '18px', 
          overflow: 'hidden' 
        }}>
          {collapsed ? 'AP' : 'Admin Panel'}
        </h1>
      </div>

      {/* User info section */}
      <div style={{ 
        padding: collapsed ? '8px' : '16px',
        textAlign: collapsed ? 'center' : 'left',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '12px',
      }}>
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <div style={{ cursor: 'pointer' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: collapsed ? 'center' : 'flex-start' 
            }}>
              <Avatar 
                size={collapsed ? 32 : 40} 
                icon={<UserOutlined />} 
                src={userInfo.avatar} 
                style={{ backgroundColor: '#1890ff' }}
              />
              {!collapsed && (
                <div style={{ marginLeft: '12px', color: 'white' }}>
                  <div style={{ fontWeight: 'bold' }}>{userInfo.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{userInfo.role}</div>
                </div>
              )}
            </div>
          </div>
        </Dropdown>
        
        {/* {!collapsed && (
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-around' }}>
            <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
              <div style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}>
                <Space>
                  <BellOutlined />
                  <span>3</span>
                </Space>
              </div>
            </Dropdown>
            
            <div style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}>
              <Space>
                <MessageOutlined />
                <span>5</span>
              </Space>
            </div>
          </div>
        )} */}
      </div>
      
      {/* Menu items */}
      <Menu 
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
      />
      
      {/* Footer - only shown when not collapsed */}
      {!collapsed && (
        <div style={{
          position: 'absolute',
          bottom: '50px',
          width: '100%',
          padding: '0 16px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '12px'
        }}>
          <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '12px 0' }} />
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
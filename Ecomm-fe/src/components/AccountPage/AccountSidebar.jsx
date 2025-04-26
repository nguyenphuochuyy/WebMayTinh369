import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Card, Avatar, Typography, Divider } from "antd";
import "../../styles/AccountPage/AccountSidebar.scss";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Title, Text } = Typography;

const AccountSidebar = ({ user }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Get current active path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes("/account/profile")) return "profile";
    if (path.includes("/account/addresses")) return "addresses";
    if (path.includes("/account/payment")) return "payment";
    if (path.includes("/account/orders/completed")) return "completed-orders";
    if (path.includes("/account/orders/cancelled")) return "cancelled-orders";
    if (path.includes("/account/orders")) return "orders";
    if (path.includes("/account/wishlist")) return "wishlist";
    return "profile"; // Default
  };

  return (
    <div className="account-sidebar">
      <Card 
        className="user-card" 
        bordered={false}
      >
        
        <Divider className="divider" />
        
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={["account", "orders"]}
          className="account-menu"
          inlineCollapsed={collapsed}
          inlineIndent={16}
        >
          <SubMenu 
            key="account" 
            icon={<SettingOutlined />} 
            title="Quản lý tài khoản"
          >
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/account/profile">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="addresses" icon={<EnvironmentOutlined />}>
              <Link to="/account/addresses">Địa chỉ giao hàng</Link>
            </Menu.Item>
            <Menu.Item key="payment" icon={<CreditCardOutlined />}>
              <Link to="/account/payment">Phương thức thanh toán</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu 
            key="orders" 
            icon={<ShoppingOutlined />} 
            title="Đơn hàng"
          >
            <Menu.Item key="all-orders">
              <Link to="/account/orders">Tất cả đơn hàng</Link>
            </Menu.Item>
            <Menu.Item key="completed-orders" icon={<CheckCircleOutlined />}>
              <Link to="/account/orders/completed">Đã hoàn thành</Link>
            </Menu.Item>
            <Menu.Item key="cancelled-orders" icon={<CloseCircleOutlined />}>
              <Link to="/account/orders/cancelled">Đã hủy</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="wishlist" icon={<HeartOutlined />}>
            <Link to="/account/wishlist">Sản phẩm yêu thích</Link>
          </Menu.Item>
          
          <Divider className="menu-divider" />
          
        </Menu>
      </Card>
      
    </div>
  );
};

export default AccountSidebar;
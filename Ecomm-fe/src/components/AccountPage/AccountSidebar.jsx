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
  LogoutOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const AccountSidebar = ({ user }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Get current active path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes("/account/profile")) return "profile";
    if (path.includes("/account/addresses")) return "addresses";
    if (path.includes("/account/myOrder")) return "myOrder";
    if (path.includes("/account/payment")) return "payment";
    if (path.includes("/account/orders/completed")) return "completed-orders";
    if (path.includes("/account/orders/cancelled")) return "cancelled-orders";

    if (path.includes("/account/wishlist")) return "wishlist";
    return "profile"; // Default
  };

  return (
    <div className="account-sidebar">
      <Card
        className="user-card"
        variant="bordered" // Updated to use 'variant' instead of 'bordered'
      >
        <Divider className="divider" />

        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={["account", "orders"]}
          className="account-menu"
          inlineCollapsed={collapsed}
          inlineIndent={16}
          items={[
            {
              key: "account",
              icon: <SettingOutlined />,
              label: "Quản lý tài khoản", // Changed 'title' to 'label'
              children: [
                {
                  key: "profile",
                  icon: <UserOutlined />,
                  label: <Link to="/account/profile">Thông tin cá nhân</Link>,
                },
                {
                  key: "addresses",
                  icon: <EnvironmentOutlined />,
                  label: <Link to="/account/addresses">Địa chỉ giao hàng</Link>,
                },
                // {
                //   key: "payment",
                //   icon: <CreditCardOutlined />,
                //   label: (
                //     <Link to="/account/payment">Phương thức thanh toán</Link>
                //   ),
                // },
              ],
            },
            {
              key: "orders",
              icon: <ShoppingOutlined />,
              label: "Đơn hàng", // Use 'label' instead of 'title'
              children: [
                {
                  key: "all-orders",
                  label: <Link to="/account/myOrder">Tất cả đơn hàng</Link>,
                },
                // {
                //   key: "completed-orders",
                //   icon: <CheckCircleOutlined />,
                //   label: (
                //     <Link to="/account/orders/completed">Đã hoàn thành</Link>
                //   ),
                // },
                // {
                //   key: "cancelled-orders",
                //   icon: <CloseCircleOutlined />,
                //   label: <Link to="/account/orders/cancelled">Đã hủy</Link>,
                // },
              ],
            },
            // {
            //   key: "wishlist",
            //   icon: <HeartOutlined />,
            //   label: <Link to="/account/wishlist">Sản phẩm yêu thích</Link>,
            // },
          ]}
        />
      </Card>
    </div>
  );
};

export default AccountSidebar;

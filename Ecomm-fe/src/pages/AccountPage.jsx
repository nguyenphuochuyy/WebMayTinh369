import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Typography, Row, Col, Card, Skeleton } from "antd";
import { 
  HomeOutlined, 
  UserOutlined, 
  EnvironmentOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Profile from "../components/AccountPage/Profile";
import Addresses from "../components/AccountPage/Addresses";
import { AuthContext } from "../components/context/auth.context";
import MyOrder from "../components/AccountPage/MyOrder";

const { Content } = Layout;
const { Title, Text } = Typography;

const AccountPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // To determine the current path

  const isProfilePage = location.pathname === "/account/profile"; // Determines if we're on the Profile page
  const isAddressesPage = location.pathname === "/account/addresses"; // Determines if we're on the Addresses page
  const isMyOrderPage = location.pathname === "/account/myOrder"; // Determines if we're on the My Order page

  return (
    <Layout className="account-page-layout">
      
      <Content className="account-page-content">
        <div className="account-page-container">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="account-breadcrumb" items={[
            { title: <Link to="/"><HomeOutlined /> Trang chủ</Link> },
            { title: <Link to="/account/profile"><UserOutlined /> Tài khoản</Link> },
            isAddressesPage && {
              title: <Link to="/account/addresses"><EnvironmentOutlined /> Địa chỉ</Link>
            },
            isMyOrderPage && {
              title: <Link to="/account/myOrder"><ShoppingCartOutlined /> Đơn hàng</Link>
            }
          ]} />
          
          {/* Welcome Section */}
          <Card
            className="welcome-section"
            variant="bordered"
          >
            <Row gutter={16} align="middle">
              <Col>
                <UserOutlined className="welcome-icon" />
              </Col>
              <Col>
                <Title level={3} className="welcome-text">
                  Xin chào, {user ? (user.fullName || user.username) : <Skeleton.Button active size="small" />}!
                </Title>
                <Text className="welcome-subtext">
                  Chào mừng bạn đến với trang quản lý tài khoản
                </Text>
              </Col>
            </Row>
          </Card>
          
          {/* Profile or Addresses Section */}
          <div className="section">
            {isProfilePage && <Profile />}
            {isAddressesPage && <Addresses />}
            {isMyOrderPage && <MyOrder />}
          </div>
        </div>
      </Content>
      
      
      <style>{`
        .account-page-layout {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        .account-page-content {
          padding: 0 0 40px 0;
        }
        
        .account-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        
        .account-breadcrumb {
          margin-bottom: 16px;
          padding: 8px 16px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .welcome-section {
          margin-bottom: 24px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
          background: linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%);
        }
        
        .welcome-icon {
          font-size: 32px;
          color: #1890ff;
          background: #e6f7ff;
          padding: 12px;
          border-radius: 50%;
        }
        
        .welcome-text {
          margin-bottom: 0 !important;
        }
        
        .welcome-subtext {
          color: rgba(0, 0, 0, 0.45);
        }
        
        .section {
          margin-top: 24px;
        }
        
        .account-page-footer {
          background-color: #001529;
          color: #fff;
          padding: 24px 0;
        }
        
        @media (max-width: 768px) {
          .account-page-container {
            padding: 16px;
          }
          
          .welcome-section {
            padding: 16px;
          }
          
          .welcome-icon {
            font-size: 24px;
            padding: 8px;
          }
          
          .welcome-text {
            font-size: 18px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AccountPage;

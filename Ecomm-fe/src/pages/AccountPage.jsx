import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Typography, Row, Col, Card, Skeleton } from "antd";
import { 
  HomeOutlined, 
  UserOutlined, 
  SmileOutlined 
} from "@ant-design/icons";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Profile from "../components/AccountPage/Profile";
import { AuthContext } from "../components/context/auth.context";

const { Content } = Layout;
const { Title, Text } = Typography;

const AccountPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout className="account-page-layout">
      <Navbar />
      
      <Content className="account-page-content">
        <div className="account-page-container">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="account-breadcrumb">
            <Breadcrumb.Item>
              <Link to="/">
                <HomeOutlined /> Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/accountPage">
                <UserOutlined /> Tài khoản
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          
          {/* Welcome Section */}
          <Card 
            className="welcome-section"
            bordered={false}
          >
            <Row gutter={16} align="middle">
              <Col>
                <SmileOutlined className="welcome-icon" />
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
          
          {/* Profile Section */}
          <div className="profile-section">
            <Profile />
          </div>
        </div>
      </Content>
      
      <Footer className="account-page-footer" />
      
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
        
        .profile-section {
          border-radius: 8px;
          overflow: hidden;
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
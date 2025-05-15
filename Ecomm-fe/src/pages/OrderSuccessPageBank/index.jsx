import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Steps,
  Button,
  Divider,
  Result,
  List,
  Space,
  Tag
} from "antd";
import {
  CheckCircleOutlined,
  ShoppingOutlined,
  HomeOutlined,
  CreditCardOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined
} from "@ant-design/icons";
import Navbar from "../components/layout/Navbar"; 
import Footer from "../components/layout/Footer"; 
import { useNavigate, useLocation } from "react-router-dom";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const amount = params.get("vnp_Amount");
  const bankCode = params.get("vnp_BankCode");
  const vnp_OrderInfo = params.get("vnp_OrderInfo");
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
   
  

  
  // Giả lập thời gian giao hàng dự kiến (3-5 ngày từ hiện tại)
  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    return deliveryDate.toLocaleDateString("vi-VN");
  };
  
  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);
   
  }, [cartItems, navigate]);

  // Hàm chuyển hướng về trang chủ
  const goToHome = () => {
    navigate("/");
  };

  // Hàm chuyển hướng đến trang đơn hàng của tôi
  const goToMyOrders = () => {
    navigate("/account/myOrder");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 24, marginBottom: 24 }}>
        <Row gutter={24} justify="center">
          <Col xs={24} lg={20}>
            <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title={
                <Title level={2} style={{ color: "#52c41a" }}>
                  Đặt hàng thành công!
                </Title>
              }
              subTitle={
                <Paragraph style={{ fontSize: 16 }}>
                  Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và
                  đang được xử lý.
                </Paragraph>
              }
            />

            <Card 
              style={{ marginBottom: 24, borderRadius: 8 }}
              headStyle={{ backgroundColor: "#f0f7ff" }}
              title={
                <Space>
                  <ShoppingOutlined />
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    Thông tin đơn hàng
                  </span>
                </Space>
              }
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>Mã đơn hàng:</Text>
                      <Tag color="blue" style={{ marginLeft: 8, padding: "4px 8px", fontSize: 14 }}>
                        {orderId}
                      </Tag>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>Ngày đặt hàng:</Text>
                      <Text style={{ marginLeft: 8, fontSize: 14 }}>{orderDate}</Text>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Phương thức thanh toán:
                      </Text>
                      <Tag color="green" style={{ marginLeft: 8, fontSize: 14 }}>
                        {orderInfo?.paymentMethod === "bank" 
                          ? "Chuyển khoản ngân hàng" 
                          : "Thanh toán khi nhận hàng (COD)"}
                      </Tag>
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>Trạng thái:</Text>
                      <Tag color="processing" style={{ marginLeft: 8, padding: "4px 8px", fontSize: 14 }}>
                        Đang xử lý
                      </Tag>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Giao hàng dự kiến:
                      </Text>
                      <Text style={{ marginLeft: 8, fontSize: 14 }}>{getEstimatedDelivery()}</Text>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Tổng tiền:
                      </Text>
                      <Text style={{ marginLeft: 8, fontSize: 16, color: "#f5222d", fontWeight: "bold" }}>
                        {(total || 0).toLocaleString()} VND
                      </Text>
                    </div>
                  </Space>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <UserOutlined />
                        <span>Thông tin khách hàng</span>
                      </Space>
                    }
                    style={{ height: "100%" }}
                  >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <div>
                        <UserOutlined style={{ marginRight: 8 }} />
                        <Text>{user?.fullName || user?.username}</Text>
                      </div>
                      <div>
                        <PhoneOutlined style={{ marginRight: 8 }} />
                        <Text>{user?.phone}</Text>
                      </div>
                      <div>
                        <MailOutlined style={{ marginRight: 8 }} />
                        <Text>{user?.email}</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <EnvironmentOutlined />
                        <span>Địa chỉ giao hàng</span>
                      </Space>
                    }
                    style={{ height: "100%" }}
                  >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <div>
                        <HomeOutlined style={{ marginRight: 8 }} />
                        <Text>
                          {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : 
                            user?.addresses && user?.addresses[0] ? 
                            `${user.addresses[0].street}, ${user.addresses[0].city}` : 
                            "Không có địa chỉ"}
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>

              <Divider />

              <Card
                type="inner"
                title={
                  <Space>
                    <ShoppingCartOutlined />
                    <span>Sản phẩm đã đặt</span>
                  </Space>
                }
                style={{ marginBottom: 16 }}
              >
                <List
                  dataSource={cartItems || []}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      style={{ padding: "16px 0" }}
                    >
                      <List.Item.Meta
                        avatar={
                          <div style={{ width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", borderRadius: 4 }}>
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.productName}
                                style={{ maxWidth: 50, maxHeight: 50 }}
                              />
                            ) : (
                              <ShoppingOutlined style={{ fontSize: 24 }} />
                            )}
                          </div>
                        }
                        title={<Text strong>{item.productName}</Text>}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text type="secondary">Số lượng: {item.quantity}</Text>
                            <Text type="secondary">Đơn giá: {item.price.toLocaleString()} VND</Text>
                          </Space>
                        }
                      />
                      <div>
                        <Text strong style={{ fontSize: 16 }}>
                          {item.totalPrice.toLocaleString()} VND
                        </Text>
                      </div>
                    </List.Item>
                  )}
                />
                
                <Divider />
                
                <Row justify="end">
                  <Col>
                    <Space direction="vertical" align="end" style={{ width: "100%" }}>
                      <div>
                        <Text>Tạm tính:</Text>
                        <Text strong style={{ marginLeft: 16, width: 120, display: "inline-block", textAlign: "right" }}>
                          {cartItems ? cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString() : 0} VND
                        </Text>
                      </div>
                      <div>
                        <Text>Phí vận chuyển:</Text>
                        <Text strong style={{ marginLeft: 16, width: 120, display: "inline-block", textAlign: "right", color: "#52c41a" }}>
                          Miễn phí
                        </Text>
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 16 }}>Tổng cộng:</Text>
                        <Text strong style={{ marginLeft: 16, fontSize: 16, color: "#f5222d", width: 120, display: "inline-block", textAlign: "right" }}>
                          {(total || 0).toLocaleString()} VND
                        </Text>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Card>

            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              bodyStyle={{ backgroundColor: "#f6ffed", padding: 16 }}
            >
              <Steps
                progressDot
                current={1}
                direction="horizontal"
                items={[
                  {
                    title: "Đặt hàng",
                    description: "Hoàn thành",
                    icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                  },
                  {
                    title: "Xác nhận",
                    description: "Đang xử lý",
                  },
                  {
                    title: "Đóng gói",
                    description: "Chờ xử lý",
                  },
                  {
                    title: "Vận chuyển",
                    description: "Chờ xử lý",
                  },
                  {
                    title: "Giao hàng",
                    description: "Chờ xử lý",
                  },
                ]}
              />
            </Card>

            <Row justify="center" gutter={16}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  onClick={goToHome}
                  style={{ marginRight: 16 }}
                >
                  Tiếp tục mua sắm
                </Button>
              </Col>
              <Col>
                <Button
                  icon={<CreditCardOutlined />}
                  size="large"
                  onClick={goToMyOrders}
                >
                  Xem đơn hàng của tôi
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default OrderSuccess;
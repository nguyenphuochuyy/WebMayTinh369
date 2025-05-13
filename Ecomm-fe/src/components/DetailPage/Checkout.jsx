import React, { use, useContext, useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Radio,
  Card,
  Divider,
  Space,
  message,
  Steps,
  Table,
  Select
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  CreditCardOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import Navbar from "../layout/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Footer from "../layout/Footer";
import { createPaymentAPI , placeOrderAPI} from "../../services/api.service";
import axios from "axios";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const [coupon, setCoupon] = useState("");
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log("cartItems", cartItems);
  const [products, setProducts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  console.log("user", user);

  // 👉 Tính tổng tiền từ cartItems
  const subtotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;
  

  // lấy trạng thái thanh toán chuyển khoản 
  useEffect(() => {
    const handleVNPayCallback = async () => {
      try {
          // Gửi yêu cầu đến backend để kiểm tra trạng thái thanh toán
          const response = await axios.get('http://localhost:8088/vnpay-return', {
              params: new URLSearchParams(location.search),
          });

          // Lấy thông tin từ localStorage (được lưu trước khi thanh toán)
          const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder')) || {};
          if(response.ok){
            console.log("response", response.data);
            
          }
           else {
              // Thanh toán thất bại
              message.error(response.data.message || 'Thanh toán thất bại.');
              // navigate('/orderFailed');
          }
      } catch (error) {
          console.error('Lỗi khi xử lý thanh toán:', error);
          message.error('Lỗi khi xử lý thanh toán.');
          // navigate('/orderFailed');
      } finally {
          setIsProcessing(false);
      }
  };

  handleVNPayCallback();
}, [location, navigate]);
  
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const mappedProducts = cartItems.map(item => ({
        id: item.productId,     // backend cần id
        quantity: item.quantity // số lượng
      }));
      setProducts(mappedProducts);
    }
  }, [cartItems]);

  // console.log("products", products);
  

  useEffect(() => {
    if (user) {
      // Nếu có địa chỉ, chọn địa chỉ đầu tiên làm mặc định
      if (user.addresses && user.addresses.length > 0) {
        setSelectedAddress(user.addresses[0]);
        
        // Tạo địa chỉ đầy đủ từ địa chỉ được chọn
        const fullAddress = `${user.addresses[0].street}, ${user.addresses[0].city}`;
        
        form.setFieldsValue({
          fullName: user.fullName || user.username || "",
          address: fullAddress,
          addressId: user.addresses[0].id || 123,
          phone: user.phone || "",
          email: user.email || "",
        });
      } else {
        form.setFieldsValue({
          fullName: user.fullName || user.username || "",
          phone: user.phone || "",
          email: user.email || "",
        });
      }
    }
  }, [user, form]);

  // Hàm xử lý khi thay đổi địa chỉ
  const handleAddressChange = (addressId) => {
    if (user.addresses && user.addresses.length > 0) {
      const address = user.addresses.find(addr => addr.id === addressId);
      if (address) {
        setSelectedAddress(address);
        
        // Tạo địa chỉ đầy đủ từ địa chỉ được chọn
        const fullAddress = `${address.street}, ${address.city}`;
        
        form.setFieldsValue({
          address: fullAddress,
          addressId: addressId
        });
      }
    }
  };

  // Định nghĩa cột với kích thước lớn hơn
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      ellipsis: false, // Cho phép hiển thị đầy đủ tên sản phẩm
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      align: "center",
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "right",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 170,
      align: "right",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
  ];

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (coupon.trim()) {
      message.info("Đang kiểm tra mã giảm giá...");
      setTimeout(() => {
        message.warning("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      }, 1000);
    } else {
      message.error("Vui lòng nhập mã giảm giá");
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);


  const onFinish = async () => {
    try {
      setIsProcessing(true);
      
      // Tạo object chứa thông tin đơn hàng để chuyển sang trang thành công
      const orderInfo = {
        id: `ORD${Math.floor(Math.random() * 1000000)}`,
        paymentMethod: paymentMethod,
        status: "processing"
      };

      if (paymentMethod === "bank") {
        // Xử lý thanh toán ngân hàng
        // tạo mã thanh toán random
        const paymentId = `PAY${Math.floor(Math.random() * 1000000)}`;
        const resCreatePayment = await createPaymentAPI(paymentId, total, "pending" , products);
        if (resCreatePayment && resCreatePayment.data && resCreatePayment.data.url) {
          // Lưu thông tin thanh toán vào orderInfo
          orderInfo.paymentUrl = resCreatePayment.data.url;
          orderInfo.paymentStatus = "pending";
          console.log(resCreatePayment.data.url);
          
          
          // Chuyển hướng đến trang thành công
          // navigate("/orderSuccess", {
          //   state: {
          //     orderInfo,
          //     cartItems,
          //     user,
          //     selectedAddress,
          //     total
          //   }
          // });
          
          // Mở tab mới cho thanh toán
          window.open(resCreatePayment.data.url, "_blank");
        } else {
          message.error("Không lấy được link thanh toán.");
          setIsProcessing(false);
        }
      } else if (paymentMethod === "cod") {
        // Gọi API tạo đơn hàng
        const res = await placeOrderAPI(products, 2, `${selectedAddress.street}, ${selectedAddress.city}`);
        
        if (res && res.data) {
          // Nếu có API response, cập nhật orderInfo
          if (res.data.id) {
            orderInfo.id = res.data.id;
          }
          
          // Chuyển hướng đến trang thành công
          navigate("/orderSuccess", {
            state: {
              orderInfo,
              cartItems,
              user,
              selectedAddress,
              total
            }
          });
          
          message.success("Đặt hàng thành công!");
        } else if (res && res.error) {
          message.error("Đặt hàng thất bại!");
          setIsProcessing(false);
        }
      } else {
        message.warning("Vui lòng chọn phương thức thanh toán.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      message.error("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại sau.");
      setIsProcessing(false);
    }
  };
  
  // Render các options địa chỉ
  const renderAddressOptions = () => {
    if (!user || !user.addresses || user.addresses.length === 0) {
      return <Option value="0">Chưa có địa chỉ nào</Option>;
    }

    return user.addresses.map((address, index) => (
      <Option key={address.id} value={address.id}>
        {address.street}, {address.city}
      </Option>
    ));
  };

  const steps = [
    {
      title: "Thông tin",
      content: (
        <Form form={form} layout="vertical" requiredMark="optional">
          <Row gutter={24}>
            <Col xs={24}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ tên của bạn"
                  disabled
                  style={{ backgroundColor: "#fff", color: "#000", opacity: 1 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24}>
              <Form.Item
                label="Chọn địa chỉ giao hàng"
                name="addressId"
                rules={[{ required: true, message: "Vui lòng chọn địa chỉ giao hàng" }]}
              >
                <Select
                  placeholder="Chọn địa chỉ giao hàng"
                  onChange={handleAddressChange}
                  style={{ width: '100%' }}
                  disabled={!user || !user.addresses || user.addresses.length === 0}
                  suffixIcon={<EnvironmentOutlined />}
                >
                  {renderAddressOptions()}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24}>
              <Form.Item
                label="Địa chỉ chi tiết"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input
                  prefix={<HomeOutlined />}
                  placeholder="Địa chỉ giao hàng"
                  disabled
                  style={{ backgroundColor: "#fff", color: "#000", opacity: 1 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Nhập số điện thoại"
                  disabled
                  style={{ backgroundColor: "#fff", color: "#000", opacity: 1 }}
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
                  placeholder="Nhập email"
                  disabled
                  style={{ backgroundColor: "#fff", color: "#000", opacity: 1 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Thanh toán",
      content: (
        <Card title="Phương thức thanh toán" bordered={false}>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Space direction="vertical">
              <Radio value="bank">
                <Space>
                  <CreditCardOutlined />
                  <span>Chuyển khoản ngân hàng</span>
                </Space>
              </Radio>
              <Radio value="cod">
                <Space>
                  <ShoppingCartOutlined />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </Space>
              </Radio>
            </Space>
          </Radio.Group>

          {paymentMethod === "bank" && (
            <div
              style={{
                marginTop: 16,
                background: "#f9f9f9",
                padding: 16,
                borderRadius: 8,
              }}
            >
              {/* <Text>Thông tin tài khoản:</Text>
              <ul>
                <li>Ngân hàng: VCB - Vietcombank</li>
                <li>Số tài khoản: 1234567890</li>
                <li>Chủ tài khoản: CÔNG TY ABC</li>
                <li>Nội dung chuyển khoản: [Mã đơn hàng] - [Họ tên]</li>
              </ul> */}
            </div>
          )}
        </Card>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <Card title="Xác nhận đơn hàng" bordered={false}>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 16 }}>
              Vui lòng xác nhận đơn hàng của bạn
            </Title>
            <Text>
              Kiểm tra lại thông tin đơn hàng và nhấn Đặt hàng để hoàn tất.
            </Text>
          </div>

          {selectedAddress && (
            <div style={{ marginTop: 24, padding: 16, background: "#f0f7ff", borderRadius: 8 }}>
              <Title level={5}><EnvironmentOutlined /> Địa chỉ giao hàng</Title>
              <Text>{selectedAddress.street}, {selectedAddress.city}</Text>
              <Title level={5}><PhoneOutlined /> Số điện thoại</Title>
              <Text>{user.phone}</Text>
            </div>
            
          )}
        </Card>
      ),
    },
  ];

  // Phần render thông tin đơn hàng với kích thước lớn hơn
  const renderOrderSummary = () => (
    <Card
      title={
        <Title level={4}>
          <ShoppingCartOutlined /> Thông tin đơn hàng
        </Title>
      }
      style={{ marginBottom: 24 }}
      className="order-summary-card"
      bodyStyle={{ padding: "12px 16px" }}
    >
      {/* Bảng thông tin sản phẩm với kích thước lớn hơn */}
      <div style={{ overflow: "auto" }}>
        <Table
          dataSource={cartItems}
          columns={columns}
          pagination={false}
          size="middle" // Thay đổi từ small sang middle để tăng kích thước
          bordered
          style={{ marginBottom: 16 }}
          rowKey={(record) => record.id || record.key}
          className="product-info-table"
          rowClassName="product-table-row"
          // Tăng kích thước cho hàng
          components={{
            body: {
              row: (props) => <tr {...props} style={{ height: "60px" }} />,
            },
          }}
        />
      </div>

      {/* Phần tổng tiền với font size lớn hơn */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
            fontSize: "16px",
          }}
        >
          <Text strong>Tạm tính:</Text>
          <Text strong>{subtotal.toLocaleString()} VND</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
            fontSize: "16px",
          }}
        >
          <Text strong>Phí vận chuyển:</Text>
          <Text type="success" strong>
            Miễn phí
          </Text>
        </div>
        <Divider style={{ margin: "16px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <Title level={4}>Tổng cộng:</Title>
          <Title level={4} style={{ color: "#f5222d" }}>
            {total.toLocaleString()} VND
          </Title>
        </div>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      {/* Phần mã giảm giá */}
      <Input.Group compact style={{ marginBottom: 8 }}>
        <Input
          style={{ width: "calc(100% - 110px)" }}
          prefix={<TagOutlined />}
          placeholder="Nhập mã giảm giá"
          value={coupon}
          onChange={handleCouponChange}
          size="large" // Tăng kích thước input
        />
        <Button
          type="primary"
          onClick={applyCoupon}
          size="large" // Tăng kích thước button
          style={{ width: "110px" }}
        >
          Áp dụng
        </Button>
      </Input.Group>
    </Card>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 24 }}>
        <Card>
          <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
            Thanh toán đơn hàng
          </Title>

          <Steps
            current={currentStep}
            items={steps.map((item) => ({
              key: item.title,
              title: item.title,
            }))}
            style={{ marginBottom: 32 }}
          />

          <Row gutter={24}>
            <Col xs={24} lg={14}>
              <div style={{ padding: "0 16px" }}>
                {steps[currentStep].content}
              </div>
            </Col>

            <Col xs={24} lg={10}>
              {renderOrderSummary()}
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: "right" }}>
            {currentStep > 0 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={prevStep}
                size="large"
              >
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={nextStep} size="large">
                Tiếp tục
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={onFinish} size="large">
                Đặt hàng
              </Button>
            )}
          </div>
        </Card>
      </Content>


      <style>{`
        .order-summary-card .ant-card-head {
          background-color: #f0f7ff;
          padding: 12px 16px;
        }
        
        .product-info-table .ant-table-thead > tr > th {
          background-color: #f0f7ff;
          font-weight: bold;
          font-size: 15px;
          padding: 12px 16px;
        }
        
        .product-info-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          font-size: 15px;
        }
        
        .product-table-row:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </Layout>
  );
};

export default Checkout;
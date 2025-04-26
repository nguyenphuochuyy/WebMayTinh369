import React, { useContext, useEffect, useState } from "react";
import { 
  Table, 
  InputNumber, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Space, 
  Popconfirm, 
  message, 
  Empty 
} from "antd";
import { 
  DeleteOutlined, 
  HomeOutlined, 
  ShoppingCartOutlined, 
  SyncOutlined, 
  CreditCardOutlined 
} from "@ant-design/icons";
import { removeProductFromCart } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";
import "../../styles/CartPage/CartItems.scss";

const { Title, Text } = Typography;

const CartItems = () => {
  const { user, setUser } = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user && user.cartDetails) {
      setCartItems(user.cartDetails.map(item => ({
        ...item,
        key: item.id || item.productId, // Ensure each item has a unique key
        totalPrice: item.price * item.quantity
      })));
      
      const total = calculateTotalAmount(user.cartDetails);
      setTotalAmount(total);
    }
  }, [user]);

  const calculateTotalAmount = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (record, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCartItems = cartItems.map(item => {
      if (item.key === record.key) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    const newTotal = calculateTotalAmount(updatedCartItems);
    setTotalAmount(newTotal);
  };

  const handleUpdateCart = () => {
    message.success("Giỏ hàng đã được cập nhật thành công!");
  };

  const handleRemoveProductFromCart = async (cartDetailId) => {
    try {
      setLoading(true);
      const res = await removeProductFromCart(cartDetailId);
      
      if (res) {
        const updatedItems = cartItems.filter(item => item.id !== cartDetailId);
        setCartItems(updatedItems);
        
        const newTotal = calculateTotalAmount(updatedItems);
        setTotalAmount(newTotal);
        
        setUser((prevUser) => ({
          ...prevUser,
          refresh: !prevUser.refresh,
          cartDetails: updatedItems
        }));
        
        message.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record, value)}
          style={{ width: 70 }}
        />
      ),
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      align: "right",
      render: (record) => 
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: "Xóa",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?"
          onConfirm={() => handleRemoveProductFromCart(record.id)}
          okText="Có"
          cancelText="Không"
          okButtonProps={{ danger: true }}
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            loading={loading}
          />
        </Popconfirm>
      ),
    },
  ];

  if (!cartItems || cartItems.length === 0) {
    return (
      <Card className="cart-empty-container">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Giỏ hàng của bạn đang trống"
        >
          <Button 
            type="primary" 
            icon={<ShoppingCartOutlined />} 
            onClick={() => window.location.href = "/"}
          >
            Tiếp tục mua sắm
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div className="cart-container">
      <Title level={2}>
        <ShoppingCartOutlined /> Giỏ hàng của bạn
      </Title>
      
      <Card variant="outlined" className="cart-table-container">
        <Table
          columns={columns}
          dataSource={cartItems}
          pagination={false}
          rowKey="key"
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
        
        <div className="cart-actions">
          <Space>
            <Button 
              icon={<HomeOutlined />} 
              onClick={() => window.location.href = "/"}
            >
              Tiếp tục mua sắm
            </Button>
            
            <Button 
              type="primary" 
              ghost
              icon={<SyncOutlined />} 
              onClick={handleUpdateCart}
            >
              Cập nhật giỏ hàng
            </Button>
          </Space>
        </div>
      </Card>
      
      <Card 
        title="Tổng đơn hàng" 
        variant="outlined" 
        className="cart-summary-container"
      >
        <div className="summary-item">
          <Text>Tạm tính:</Text>
          <Text>{totalAmount.toLocaleString()} VND</Text>
        </div>
        
        <div className="summary-item">
          <Text>Phí vận chuyển:</Text>
          <Text type="success">Miễn phí</Text>
        </div>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <div className="summary-item total">
          <Title level={4}>Tổng cộng:</Title>
          <Title level={4} type="danger">{totalAmount.toLocaleString()} VND</Title>
        </div>
        
        <Button 
          type="primary" 
          size="large" 
          block 
          icon={<CreditCardOutlined />}
          className="checkout-button"
          onClick={() => window.location.href = "/checkout"}
        >
          Thanh toán
        </Button>
      </Card>
    </div>
  );
};

export default CartItems;

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
  Empty,
  Checkbox,
  notification,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { checkProductQuantityAPI, removeProductFromCart } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";
import "../../styles/CartPage/CartItems.scss";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartItems = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [note, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (user && user.cartDetails) {
      const items = user.cartDetails.map((item) => ({
        ...item,
        key: item.id || item.productId, // Ensure each item has a unique key
        totalPrice: item.price * item.quantity,
      }));

      setCartItems(items);

      const total = calculateTotalAmount(user.cartDetails);
      setTotalAmount(total);
    }
  }, [user]);

  // Effect để theo dõi và tính lại tổng tiền dựa trên các mục đã chọn
  useEffect(() => {
    const selectedItemsData = cartItems.filter((item) =>
      selectedItems.includes(item.key)
    );

    const total = calculateTotalAmount(selectedItemsData);
    setTotalAmount(total);
  }, [selectedItems, cartItems]);

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (record, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCartItems = cartItems.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    // Cập nhật tổng tiền dựa trên các mục đã chọn
    const selectedItemsData = updatedCartItems.filter((item) =>
      selectedItems.includes(item.key)
    );
    const newTotal = calculateTotalAmount(selectedItemsData);
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
        const updatedItems = cartItems.filter(
          (item) => item.id !== cartDetailId
        );
        setCartItems(updatedItems);

        // Xóa mục đã chọn nếu nó đã bị xóa khỏi giỏ hàng
        setSelectedItems((prev) =>
          prev.filter((key) => {
            const item = updatedItems.find((item) => item.key === key);
            return item !== undefined;
          })
        );

        setUser((prevUser) => ({
          ...prevUser,
          refresh: !prevUser.refresh,
          cartDetails: updatedItems,
        }));

        message.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (key) => {
    setSelectedItems((prev) => {
      if (prev.includes(key)) {
        const newSelected = prev.filter((k) => k !== key);
        // Cập nhật trạng thái selectAll khi người dùng bỏ chọn một mục
        if (newSelected.length === 0) {
          setSelectAll(false);
        }
        return newSelected;
      } else {
        const newSelected = [...prev, key];
        // Cập nhật trạng thái selectAll nếu tất cả các mục đều được chọn
        if (newSelected.length === cartItems.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.key));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckout = async ()  => {
    if (selectedItems.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
  
    if (!user.phone || user.phone.trim() === "" || !user.addresses || user.addresses.length === 0) {
      note.warning({
        message: "Thiếu thông tin cá nhân",
        description: (
          <div>
            <p>Vui lòng cập nhật số điện thoại và địa chỉ trước khi thanh toán.</p>
            <Button
              type="primary"
              size="small"
              onClick={() => navigate("/account/profile")}
              style={{ marginTop: 8 }}
            >
              Cập nhật ngay
            </Button>
          </div>
        ),
        duration: 0,
      });
      return;
    }

   
  
    const itemsToCheckout = cartItems.filter(item =>
      selectedItems.includes(item.key)
    );

    const itemsToCheckoutWithQuantity = itemsToCheckout.map(item => ({
      id:  item.productId,
      quantity: item.quantity,
    }));

    console.log("itemsToCheckoutWithQuantity", itemsToCheckoutWithQuantity);

    const isCheckQuantityProduct = await checkProductQuantityAPI(itemsToCheckoutWithQuantity);
    if(isCheckQuantityProduct.data.data === false){
      note.warning({
        message: isCheckQuantityProduct.data.message,
        description: "Vui lòng kiểm tra lại số lượng sản phẩm trong giỏ hàng",
      });
      return;
    }
    console.log("isCheckQuantityProduct", isCheckQuantityProduct);

  
    navigate("/checkout", { state: { cartItems: itemsToCheckout } });
  };


  const columns = [
    {
      title: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      key: "selection",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.includes(record.key)}
          onChange={() => handleSelectItem(record.key)}
        />
      ),
    },
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
            onClick={() => (window.location.href = "/")}
          >
            Tiếp tục mua sắm
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div className="cart-container">
       {contextHolder}
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
          scroll={{ x: "max-content" }}
        />

        <div className="cart-actions">
          <Space>
            <Button
              icon={<HomeOutlined />}
              onClick={() => (window.location.href = "/")}
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
          <Text>Số sản phẩm đã chọn:</Text>
          <Text>{selectedItems.length}</Text>
        </div>

        <div className="summary-item">
          <Text>Tạm tính:</Text>
          <Text>{totalAmount.toLocaleString()} VND</Text>
        </div>

        <div className="summary-item">
          <Text>Phí vận chuyển:</Text>
          <Text type="success">Miễn phí</Text>
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <div className="summary-item total">
          <Title level={4}>Tổng cộng:</Title>
          <Title level={4} type="danger">
            {totalAmount.toLocaleString()} VND
          </Title>
        </div>

        <Button
          type="primary"
          size="large"
          block
          icon={<CreditCardOutlined />}
          className="checkout-button"
          onClick={handleCheckout}
          disabled={selectedItems.length === 0}
        >
          Thanh toán ({selectedItems.length} sản phẩm)
        </Button>
      </Card>
    </div>
  );
};

export default CartItems;

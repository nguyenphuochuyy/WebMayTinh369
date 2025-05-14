import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Rate, Row, Col, message, notification } from "antd";
import axios from "axios";
import "./BestSellingProduct.css";
import { AuthContext } from "../../context/auth.context";
import { addProductToCart } from "../../../services/api.service";
import { useNavigate } from "react-router-dom";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [displayAll, setDisplayAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [note, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  // Số lượng sản phẩm hiển thị ban đầu
  const initialDisplayCount = 4;

  // Hàm định dạng giá tiền thành VND
  const formatPrice = (price) => {
    return `${Math.round(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫`;
  };

  // Gọi API để lấy danh sách sản phẩm bán chạy
  const fetchBestSellingProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8090/api/recommendations/product-sales"
      );
      if (response.data.code === 200 && response.data.data) {
        const validProducts = response.data.data.filter(
          (product) =>
            product.id &&
            product.name &&
            product.image &&
            product.price &&
            product.originalPrice &&
            product.rating &&
            product.reviews
        );
        if (validProducts.length === 0) {
          message.error("Dữ liệu sản phẩm không đầy đủ để hiển thị");
        } else {
          setProducts(validProducts);
        }
      } else {
        message.error("Không tìm thấy dữ liệu sản phẩm bán chạy");
      }
    } catch (error) {
      message.error("Lỗi khi lấy danh sách sản phẩm bán chạy");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchBestSellingProducts();
  }, []);

  // Xử lý nút "Xem tất cả"
  const handleViewAll = () => {
    setDisplayAll(true);
  };

  // Xử lý nút "Thu gọn"
  const handleCollapse = () => {
    setDisplayAll(false);
  };

  // Xử lý thêm sản phẩm vào giỏ hàng

  const handleAddProductToCart = async (productId, quantity) => {
    const res = await addProductToCart(productId, quantity);
    if (res) {
      setUser((prevUser) => ({
        ...prevUser,
        refresh: !prevUser.refresh,
      }));
      note.info({
        message: `Notification`,
        description: "Thêm sản phẩm vào giỏ hàng thành công",
        type: "success",
      });
    } else {
      note.info({
        message: `Notification`,
        description: "Thêm sản phẩm vào giỏ hàng thất bại",
        type: "error",
      });
    }
  };

  // Lấy danh sách sản phẩm để hiển thị
  const displayedProducts = displayAll
    ? products
    : products.slice(0, initialDisplayCount);

  return (
    <div className="best-selling-container">
      {contextHolder}
      <div className="best-selling-header">
        <div className="best-selling-title">
          <span className="red-bar"></span>
          <span>Sản phẩm bán chạy</span>
        </div>
        <div className="best-selling-actions">
          {!displayAll && products.length > initialDisplayCount && (
            <Button
              type="primary"
              danger
              className="view-all-btn"
              onClick={handleViewAll}
            >
              Xem tất cả
            </Button>
          )}
          {displayAll && products.length > initialDisplayCount && (
            <Button
              type="primary"
              className="collapse-btn"
              onClick={handleCollapse}
            >
              Thu gọn
            </Button>
          )}
        </div>
      </div>
      <Row gutter={[16, 16]} className="product-list">
        {loading ? (
          <Col span={24}>
            <div>Đang tải...</div>
          </Col>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={6}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} onClick={() => navigate(`/detailPage/${product.id}`)}/>}
              >
                <h3>{product.name}</h3>
                <div className="price">
                  <span className="current-price">
                    {formatPrice(product.price)}
                  </span>
                  <span className="original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <Rate allowHalf defaultValue={product.rating} disabled />
                <span className="reviews">({product.reviews})</span>
                <Button
                  type="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                  onClick={() => handleAddProductToCart(product.id,1)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div>Không có sản phẩm bán chạy nào</div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BestSellingProducts;

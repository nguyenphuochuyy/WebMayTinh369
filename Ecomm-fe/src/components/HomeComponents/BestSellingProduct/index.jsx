import React, { useState, useEffect, useContext } from "react";
import { Card, Button, notification } from "antd";
import "./BestSellingProduct.css";
import { AuthContext } from "../../context/auth.context";
import { addProductToCart, getProductSoldAPI } from "../../../services/api.service";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../../services/product.service";

const BestSellingProducts = () => {
  const [productsBestSelling, setProductsBestSelling] = useState([]);
  const [displayAll, setDisplayAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [note, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  // Số lượng sản phẩm hiển thị ban đầu
  const initialDisplayCount = 4;

  // Hàm định dạng giá tiền thành VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const fetchBestSellingProducts = async () => {
    setLoading(true);
    try {
      const products = await getProductSoldAPI();
      console.log("products", products.data.products);
      const sortedProducts = products.data.products.sort((a, b) => b.totalSold - a.totalSold);
      // Lấy 8 sản phẩm đầu (top 8)
      const top8Products = sortedProducts.slice(0, 8);
      const detailedProducts = await Promise.all(
        top8Products.map(async (prod) => {
          const detail = await getProductById(prod.id);
          return {...detail,  totalSold: prod.totalSold};
        })
      );
      setProductsBestSelling(detailedProducts);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm bán chạy:", error);
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
    if (user.id === "") {
      navigate("/login");
    } else {
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
    }
  };

  // Lấy danh sách sản phẩm để hiển thị
  const displayedProducts = displayAll
    ? productsBestSelling
    : productsBestSelling.slice(0, initialDisplayCount);

  return (
    <div className="best-selling-container">
      {contextHolder}
      <div className="best-selling-header">
        <div className="best-selling-title">
          <span className="red-bar"></span>
          <span>Sản phẩm bán chạy</span>
        </div>
        <div className="best-selling-actions">
          {!displayAll && productsBestSelling.length > initialDisplayCount && (
            <Button
              type="primary"
              danger
              className="view-all-btn"
              onClick={handleViewAll}
            >
              Xem tất cả
            </Button>
          )}
          {displayAll && productsBestSelling.length > initialDisplayCount && (
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
      <div className="custom-product-grid">
        {loading ? (
          <div className="loading-container">Đang tải...</div>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div key={product.id} className="product-grid-item">
              <Card
                hoverable
                cover={
                  <img 
                    alt={product.name} 
                    src={product.image} 
                    onClick={() => navigate(`/detailPage/${product.id}`)}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200';
                      console.log('Hình ảnh lỗi, sử dụng placeholder:', product.image);
                    }}
                  />
                }
              >
                <h3>{product.name}</h3>
                <h4 className="sold-count">Đã bán {product.totalSold}</h4>
                <div className="price">
                  <span className="current-price">
                    {formatPrice(product.priceAfterDiscount)}
                  </span>
                  {product.discount !== 0 && (
                    <>
                      <span className="original-price">
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className="discount-percent"
                        style={{
                          backgroundColor: '#e60023',
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                        }}
                      >
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>
                <Button
                  type="primary"
                  className="add-to-cart"
                  onClick={() => handleAddProductToCart(product.id, 1)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </div>
          ))
        ) : (
          <div className="error-container">Không có sản phẩm bán chạy nào</div>
        )}
      </div>
    </div>
  );
};

export default BestSellingProducts;
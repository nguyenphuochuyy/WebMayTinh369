import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Rate, Row, Col, Spin, notification } from 'antd';
import './OurProducts.css';
import { addProductToCart } from '../../../services/api.service';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';

const fetchAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

const formatVND = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const ExploreOurProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const initialVisibleCount = 8;
  const [note, contextHolder] = notification.useNotification();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllProducts();
        setAllProducts(data);
        setVisibleProducts(data.slice(0, initialVisibleCount));
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleViewAll = () => {
    setShowAll(true);
    setVisibleProducts(allProducts);
  };

  const handleCollapse = () => {
    setShowAll(false);
    setVisibleProducts(allProducts.slice(0, initialVisibleCount));
  };

  const handleAddProductToCart = async (productId, quantity) => {
    if (user.id === "") {
      navigate("/login");
    } else {
      const res = await addProductToCart(productId, quantity);
      if(res) {
        setUser((prevUser) => ({
          ...prevUser,
          refresh: !prevUser.refresh,
        }));
        note.info({
          message: `Notification`,
          description: "Thêm sản phẩm vào giỏ hàng thành công",
          type: "success",
        })} else {
        note.info({
          message: `Notification`,
          description: "Thêm sản phẩm vào giỏ hàng thất bại",
          type: "error",    
        });
      }
    }
  }


  return (
    <div className="explore-products-container">
      {contextHolder}
      <div className="explore-products-header">
        <div className="explore-products-title">
          <span className="red-bar"></span>
          <span>Tất cả sản phẩm</span>
        </div>
        <div className="explore-products-actions">
          {!showAll && allProducts.length > initialVisibleCount && (
            <Button type="primary" danger className="view-all-btn" onClick={handleViewAll}>
              Xem toàn bộ
            </Button>
          )}
          {showAll && allProducts.length > initialVisibleCount && (
            <Button type="primary" className="collapse-btn" onClick={handleCollapse}>
              Thu gọn
            </Button>
          )}
        </div>
      </div>
      <div className="custom-product-grid">
        {loading ? (
          <div className="loading-container">Đang tải sản phẩm...</div>
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : (
          visibleProducts.map((product) => (
            <div key={product.id} className="product-grid-item">
              <Card
                style={{ width: '100%', textAlign: 'center', height: '100%' }}
                hoverable
                cover={
                  product.image && (
                    <img
                      alt={product.name}
                      src={product.image}
                      onClick={() => navigate(`/detailPage/${product.id}`)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200';
                        console.log('Hình ảnh lỗi, sử dụng placeholder:', product.image);
                      }}
                    />
                  )
                }
              >
                <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <div className="price" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="current-price">{formatVND(product.priceAfterDiscount)}</span>
                  {product.discount !== 0 && (
                    <>
                      <span
                        className="original-price"
                        style={{ textDecoration: 'line-through', color: '#999' }}
                      >
                        {formatVND(product.price)}
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
                  block
                  className="add-to-cart"
                  onClick={() => handleAddProductToCart(product.id, 1)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExploreOurProducts;
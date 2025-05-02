import React, { useState, useEffect } from 'react';
import { Card, Button, Rate, Row, Col, Spin } from 'antd';
import './OurProducts.css'; // Đảm bảo file CSS này tồn tại

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

  return (
    <div className="explore-products-container">
      <div className="explore-products-header">
        <div className="explore-products-title">
          <span className="red-bar"></span>
          <span>Tất cả sản phẩm</span>
        </div>
      </div>
      {loading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>{error}</div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="product-list">
            {visibleProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  cover={product.image && <img alt={product.name} src={product.image} />}
                >
                  <h3>{product.name}</h3>
                  <div className="price">
                    <span className="current-price">{formatVND(product.price)}</span>
                  </div>
                  <div className="rating">
                    <Rate allowHalf defaultValue={product.rating || 0} disabled />
                    {product.reviews && <span className="reviews">({product.reviews})</span>}
                  </div>
                  <Button type="primary" block className="add-to-cart">
                    thêm vào giỏ hàng
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="view-all">
            {!showAll && allProducts.length > initialVisibleCount && (
              <Button type="primary" danger onClick={handleViewAll}>
                Xem toàn bộ
              </Button>
            )}
            {showAll && allProducts.length > initialVisibleCount && (
              <Button onClick={handleCollapse}>
                Thu gọn
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreOurProducts;
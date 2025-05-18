import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Rate, Row, Col, message, notification } from 'antd';
import './FlashSale.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { addProductToCart } from '../../../services/api.service';

const FlashSales = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [note, contextHolder] = notification.useNotification();
  const { user, setUser } = useContext(AuthContext);
  const [productSale, setProductSale] = useState([]);

  // const API_URL = 'http://localhost:8090/api/recommendations';
  const initialDisplayCount = 4; 

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

  // Hàm định dạng giá tiền thành VND
  const formatPrice = (price) => {
    return `${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllProducts();
        const discountedProducts = data.filter(product => product.discount && product.discount !== 0);
        setProductSale(discountedProducts);        
      } catch (err) {
        // setError(err.message || 'Có lỗi xảy ra khi tải sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCollapse = () => {
    setViewAll(false);
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleAddProductToCart = async (productId, quantity) => {
    if (user.id === "") {
      navigate("/login");
    } else{
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

  const displayedProducts = viewAll ? productSale : productSale.slice(0, initialDisplayCount);

  return (
    <div className="best-selling-container">
      {contextHolder}
      <div className="best-selling-header">
        <div className="best-selling-title">
          <span className="red-bar"></span>
          <span>Đang giảm giá</span>
        </div>
        <div className="best-selling-actions">
          {!viewAll && productSale.length > initialDisplayCount && (
            <Button type="primary" danger className="view-all-btn" onClick={handleViewAll}>
              Xem tất cả
            </Button>
          )}
          {viewAll && productSale.length > initialDisplayCount && (
            <Button type="primary" className="collapse-btn" onClick={handleCollapse}>
              Thu gọn
            </Button>
          )}
        </div>
      </div>
      <div className="custom-product-grid">
        {loading ? (
          <div className="loading-container">Đang tải sản phẩm...</div>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div key={product.id} className="product-grid-item">
              <Card
                style={{ width: '100%', textAlign: 'center', height: '100%' }}
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
                <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <div className="price">
                  <span className="current-price">{formatPrice(product.priceAfterDiscount)}</span>
                  <span className="original-price">{formatPrice(product.price)}</span>
                  <span
                    className="discount-percent"
                    style={{
                      backgroundColor: '#e60023',
                      color: '#fff',
                      padding: '2px 6px',
                      marginLeft: '8px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                    }}
                  >
                    -{product.discount}%
                  </span>
                </div>
                <Button
                  type="primary"
                  style={{ marginTop: '10px', width: '100%' }}
                  onClick={() => handleAddProductToCart(product.id,1)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </div>
          ))
        ) : (
          <div className="no-products-container">Hiện không có sản phẩm nào đang giảm giá</div>
        )}
      </div>
    </div>
  );
};

export default FlashSales;
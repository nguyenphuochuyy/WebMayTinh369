import React from 'react';
import { Card, Button, Rate, Row, Col } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import './BestSellingProduct.css';

const BestSellingProducts = () => {
  const products = [
    {
      image: 'https://phuongthanhcomputer.com/wp-content/uploads/2023/08/pc-gaming-luffy-gear-i5-10400f-6.jpg',
      name: 'The north coat',
      price: 260,
      originalPrice: 360,
      rating: 5,
      reviews: 65,
    },
    {
      image: 'https://m.media-amazon.com/images/I/815P1vN3HpL.jpg',
      name: 'Gucci duffle bag',
      price: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjrHwcYqWTW_m1EVEoqA8S3l2uKdDr0Nh9rUM1kBzvxOENgdxv1NX_L3qwbretu9av3LQ&usqp=CAU',
      name: 'RGB liquid CPU Cooler',
      price: 160,
      originalPrice: 170,
      rating: 4,
      reviews: 65,
    },
    {
      image: 'https://kenhtinhoc.vn/wp-content/uploads/2022/02/pc-gaming-g480-kenh-tin-hoc-core-i5-10400f-16gb-180gb-ssd-1tb-hdd-rtx3060-ti-8gb-1.jpg',
      name: 'Small BookSelf',
      price: 360,
      originalPrice: 400,
      rating: 5,
      reviews: 65,
    },
  ];

  return (
    <div className="best-selling-container">
      <div className="best-selling-header">
        <div className="best-selling-title">
          <span className="red-bar"></span>
          <span>Sản phẩm bán chạy</span>
        </div>
        <div className="best-selling-actions">
  
          <Button type="primary" danger className="view-all-btn">
            Xem tất cả
          </Button>
        </div>
      </div>
      <Row gutter={[16, 16]} className="product-list">
        {products.map((product, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
             
           
            >
              <h3>{product.name}</h3>
              <div className="price">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>
              <Rate allowHalf defaultValue={product.rating} disabled />
              <span className="reviews">({product.reviews})</span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BestSellingProducts;
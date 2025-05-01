import React from 'react';
import { Card, Button, Rate, Row, Col } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import './OurProducts.css';

const ExploreOurProducts = () => {
  const products = [
    {
      image: 'https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg',
      name: 'Breed Dry Dog Food',
      price: 100,
      rating: 3,
      reviews: 100,
      availability: 'available',
    },
    {
      image: 'https://logico.com.vn/images/products/2023/10/19/original/bo-may-choi-game-ps5-spider-man-2-le_1697685688.png',
      name: 'CANON EOS DSLR Camera',
      price: 360,
      rating: 4,
      reviews: 50,
      availability: 'available',
      showAddToCart: true,
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1_vxVMkR5x-6d_EN6gp9TihSTy0GPUmJUQ&s',
      name: 'ASUS FHD Gaming Laptop',
      price: 700,
      rating: 5,
      reviews: 65,
      availability: 'available',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1_vxVMkR5x-6d_EN6gp9TihSTy0GPUmJUQ&s',
      name: 'Curology Product Set',
      price: 500,
      rating: 4,
      reviews: 65,
      availability: 'out-of-stock',
    },
    {
      image: 'https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg',
      name: 'Kids Electric Car',
      price: 960,
      rating: 5,
      reviews: 65,
      availability: 'hot',
    },
    {
      image: 'https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg',
      name: 'Jr. Zoom Soccer Cleats',
      price: 1160,
      rating: 4,
      reviews: 65,
      availability: 'available',
    },
    {
      image: 'https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg',
      name: 'GP11 Shooter USB Gamepad',
      price: 660,
      rating: 4.5,
      reviews: 65,
      availability: 'hot',
    },
    {
      image: 'https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg',
      name: 'Quilted Satin Jacket',
      price: 660,
      rating: 4.5,
      reviews: 65,
      availability: 'available',
    },
  ];

  return (
    <div className="explore-products-container">
      <div className="explore-products-header">
        <div className="explore-products-title">
          <span className="red-bar"></span>
          <span>Tất cả sản phẩm</span>
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
              </div>
              <div className="rating">
                <Rate allowHalf defaultValue={product.rating} disabled />
                <span className="reviews">({product.reviews})</span>
              </div>
          
          
                <Button type="primary" block className="add-to-cart">
                  thêm vào giỏ hàng
                </Button>
         
            </Card>
          </Col>
        ))}
      </Row>
      <div className="view-all">
        <Button type="primary" danger>
          Xem toàn bộ
        </Button>
      </div>
    </div>
  );
};

export default ExploreOurProducts;
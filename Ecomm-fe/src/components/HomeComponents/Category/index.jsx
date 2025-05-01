import React from 'react';
import { Card, Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Category.css';

const Categories = () => {
  const categories = [
    { name: 'Phones', icon: '📱' },
    { name: 'Computers', icon: '🖥️' },
    { name: 'SmartWatch', icon: '⌚' },
    { name: 'Camera', icon: '📷', highlighted: true },
    { name: 'HeadPhones', icon: '🎧' },
    { name: 'Gaming', icon: '🎮' },
  ];

  return (
    <div className="categories-container">
      <div className="categories-header">
        <div className="categories-title">
          <span className="red-bar"></span>
          <span>Danh mục sản phẩm</span>
        </div>
    
      </div>
      <Carousel
        slidesToShow={5}
        slidesToScroll={1}
        arrows
        touchMove={true}
        // prevArrow={<Button icon={<LeftOutlined />} />}
        // nextArrow={<Button icon={<RightOutlined />} />}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {categories.map((category, index) => (
          <div key={index} className="category-slide">
            <Card
              hoverable
            >
              <div className="category-content">
                <span className="category-icon">{category.icon}</span>
                <p>{category.name}</p>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
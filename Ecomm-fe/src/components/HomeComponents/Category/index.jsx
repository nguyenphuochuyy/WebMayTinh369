// Categories/index.js
import React, { useState, useEffect } from 'react';
import { Card, Carousel, Spin } from 'antd';
import './Category.css';

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/categories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải danh mục.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <div className="categories-title">
          <span className="red-bar"></span>
          <span>Danh mục sản phẩm</span>
        </div>
      </div>
      {loading ? (
        <Spin size="small" style={{ display: 'block', textAlign: 'center', marginTop: 20 }} />
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</div>
      ) : (
        <Carousel
          slidesToShow={5}
          slidesToScroll={1}
          arrows
          touchMove={true}
          responsive={[
            {
              breakpoint: 768,
              settings: { slidesToShow: 3 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 2 },
            },
          ]}
        >
          {categories.map((category) => (
            <div key={category.id} className="category-slide" onClick={() => handleCategoryClick(category.id)}>
              <Card
                hoverable
                style={{ height: 160 }}
                cover={
                  <div style={{ height: 80, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      alt={category.name}
                      src={category.image}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', marginTop: '30px' }}
                    />
                  </div>
                }
              >
                <div className="category-content" style={{ height: 'auto', padding: '8px 0', marginTop: '10px' }}>
                  <p style={{ textAlign: 'center', margin: 0, fontSize: '12px' }}>{category.name}</p>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Categories;
import React from 'react';
import '../../styles/Wishlist_styles/Wishlist.scss';
import gucciBag from '../../images/gucci-bag.jpg';
import cpuCooler from '../../images/cpu-cooler.jpg';

const App = () => {
  // Sample product data - with placeholder colors instead of images
  const wishlistItems = [
    {
      id: 1,
      name: 'Gucci duffle bag',
      currentPrice: 960,
      originalPrice: 1160,
      discount: 35,
      bgColor: '#f0f0e9',
      image: gucciBag,
    },
    {
      id: 2,
      name: 'RGB liquid CPU Cooler',
      currentPrice: 1960,
      originalPrice: 1960,
      bgColor: '#f0f0e9',
      image: cpuCooler,
    },
    {
      id: 3,
      name: 'GP11 Shooter USB Gamepad',
      currentPrice: 550,
      originalPrice: 550,
      bgColor: '#f0f0e9'
    },
    {
      id: 4,
      name: 'Quilted Satin Jacket',
      currentPrice: 750,
      originalPrice: 750,
      bgColor: '#f0f0e9'
    }
  ];

  const recommendedItems = [
    {
      id: 5,
      name: 'ASUS FHD Gaming Laptop',
      currentPrice: 960,
      originalPrice: 1160,
      discount: 35,
      bgColor: '#f0f0e9',
      rating: 5,
      reviewCount: 65
    },
    {
      id: 6,
      name: 'IPS LCD Gaming Monitor',
      currentPrice: 1160,
      originalPrice: 1160,
      bgColor: '#f0f0e9',
      rating: 5,
      reviewCount: 65
    },
    {
      id: 7,
      name: 'HAVIT HV-G92 Gamepad',
      currentPrice: 560,
      originalPrice: 560,
      isNew: true,
      bgColor: '#f0f0e9',
      rating: 5,
      reviewCount: 65
    },
    {
      id: 8,
      name: 'AK-900 Wired Keyboard',
      currentPrice: 200,
      originalPrice: 200,
      bgColor: '#f0f0e9',
      rating: 5,
      reviewCount: 65
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
      );
    }
    return stars;
  };

  const ProductCard = ({ product, showRating = false }) => (
    <div className="product-card">
      <div className="product-image" style={{ backgroundColor: product.bgColor }}>
                  	{product.image ? <img src={product.image} alt={product.name} /> : null}
        <div className="placeholder-text">{product.name.substring(0, 2)}</div>
        {product.discount && <span className="discount-tag">-{product.discount}%</span>}
        {product.isNew && <span className="new-tag">NEW</span>}
        <button className="remove-btn">🗑️</button>
      </div>
      
      {showRating && (
        <div className="quick-view">
          <button className="view-btn">👁️</button>
        </div>
      )}
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="current-price">${product.currentPrice}</span>
          {product.currentPrice !== product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
        
        {showRating && (
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="review-count">({product.reviewCount})</span>
          </div>
        )}
      </div>
      
      <button className="add-to-cart">
        🛒 Add To Cart
      </button>
    </div>
  );

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="section-title">Wishlist ({wishlistItems.length})</h1>
        <button className="move-all-btn">Move All To Bag</button>
      </div>
      
      <div className="products-grid">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="recommendations-section">
        <div className="section-header">
          <div className="title-container">
            <div className="title-indicator"></div>
            <h2 className="section-title">Just For You</h2>
          </div>
          <button className="see-all-btn">See All</button>
        </div>
        
        <div className="products-grid">
          {recommendedItems.map(product => (
            <ProductCard key={product.id} product={product} showRating={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
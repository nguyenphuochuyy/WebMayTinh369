import React from "react";
import "../../styles/HomeStyles/FlashSalesProduct.scss";

const FlashSalesProduct = ({ image, name, price, discount }) => {
  // Tính giá giảm giá dựa trên phần trăm discount
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div className="flash-sales-product">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <p className="product-name">{name}</p>
      <div className="product-price">
        <span className="discount-price">
          {discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </span>
        {discount > 0 && (
          <span className="original-price">
            {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
        )}
      </div>
      {discount > 0 && <span className="discount-tag">{discount}% OFF</span>}
    </div>
  );
};

export default FlashSalesProduct;
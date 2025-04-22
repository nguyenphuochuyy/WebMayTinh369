import React from "react";
import "../../styles/HomeStyles/OurProducts.scss";

const OurProducts = ({ image, name, price, discount }) => {
  // Hàm định dạng số thành tiền tệ VND
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const discountedPrice = price - discount;

  return (
    <div className="our-ProductSales-product">
      <img src={image} alt={name} className="product-image" />
      <p className="product-name">{name}</p>
      <div className="product-price">
        <span className="discount-price">{formatVND(discountedPrice)}</span>
        <span className="original-price">{formatVND(price)}</span>
      </div>
    </div>
  );
};

export default OurProducts;
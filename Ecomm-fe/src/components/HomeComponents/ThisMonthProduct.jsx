import React from "react";
import "../../styles/HomeStyles/ThisMonthProduct.scss";

const ThisMonthProduct = ({ image, name, price, discount }) => {
  // Hàm định dạng số thành tiền tệ VND
  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const discountedPrice = price - discount;

  return (
    <div className="this-month-product">
      <img src={image} alt={name} className="product-imageMonth" />
      <p className="product-nameMonth">{name}</p>
      <div className="product-priceMonth">
        <span className="discountMonth-price">
          {formatVND(discountedPrice)}
        </span>
        <span className="originalMonth-price">{formatVND(price)}</span>
      </div>
    </div>
  );
};

export default ThisMonthProduct;
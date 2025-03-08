import React from "react";
import "../styles/ThisMonthProduct.scss";

const ThisMonthProduct = ({ image, name, price, discount }) => {
  return (
    <div className="this-month-product">
      <img src={image} alt={name} className="product-imageMonth" />
      <p className="product-nameMonth">{name}</p>
      <div className="product-priceMonth">
        <span className="discountMonth-price">${(price - discount).toFixed(2)}</span>
        <span className="originalMonth-price">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ThisMonthProduct;

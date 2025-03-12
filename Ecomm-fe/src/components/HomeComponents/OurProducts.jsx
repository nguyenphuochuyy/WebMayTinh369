import React from "react";
import "../../styles/HomeStyles/OurProducts.scss";

const OurProducts = ({ image, name, price, discount }) => {
  return (
    <div className="our-ProductSales-product">
      <img src={image} alt={name} className="product-image" />
      <p className="product-name">{name}</p>
      <div className="product-price">
        <span className="discount-price">${(price - discount).toFixed(2)}</span>
        <span className="original-price">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OurProducts;
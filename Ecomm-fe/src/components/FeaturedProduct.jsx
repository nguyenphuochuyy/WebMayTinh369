import React from "react";
import "../styles/FeaturedProduct.scss";

const FeaturedProduct = ({ image, name, description }) => {
  return (
    <div className="featured-product">
      <img src={image} alt={name} className="featured-image" />
      <div className="featured-details">
        <h3 className="featured-name">{name}</h3>
        <p className="featured-description">{description}</p>
        <button className="featured-button">Shop Now</button>
      </div>
    </div>
  );
};

export default FeaturedProduct;


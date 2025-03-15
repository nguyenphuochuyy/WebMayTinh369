import React from 'react';
import "../../styles/HomeStyles/FeaturedService.scss"; // Import file SCSS cho phần này
import Delivery from "../../images/delivery.png";
import Support from "../../images/headphones(2).png";
import Tick from "../../images/check-mark.png";

const FeaturedService = () => {
  return (
    <div className="featured-service-container">
      <div className="service-item">
        <div className="icon-container">
          <img src={Delivery} alt="Delivery Icon" className="service-icon"/>
        </div>
        <div className="service-text">
          <h4>FREE AND FAST DELIVERY</h4>
          <p>Free delivery for all orders over $140</p>
        </div>
      </div>

      <div className="service-item">
        <div className="icon-container">
          <img src={Support} alt="Customer Service Icon" className="service-icon"/>
        </div>
        <div className="service-text">
          <h4>24/7 CUSTOMER SERVICE</h4>
          <p>Friendly 24/7 customer support</p>
        </div>
      </div>

      <div className="service-item">
        <div className="icon-container">
          <img src={Tick} alt="Money Back Icon" className="service-icon"/>
        </div>
        <div className="service-text">
          <h4>MONEY BACK GUARANTEE</h4>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedService;

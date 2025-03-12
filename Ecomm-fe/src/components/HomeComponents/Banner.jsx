import React from "react";
import "../../styles/HomeStyles/Banner.scss";
import iphone14 from "../../images/iphone14.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h3>iPhone 14 Series</h3>
        <h2>Up to 10% off Voucher</h2>
        <button>Shop Now →</button>
      </div>

      <img src={iphone14} alt="iPhone 14" className="banner-image" />

      <div className="banner-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Banner;

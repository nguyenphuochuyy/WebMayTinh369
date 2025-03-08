import React from "react";
import "../styles/Banner2.scss";
import Loa from "../images/loa.png";
import CountdownTimerBanner  from "./CountdownTimerBanner "; // Đảm bảo bạn đã import đúng

const Banner2 = () => {
  const targetTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 ngày từ bây giờ

  return (
    <div className="banner2">
      <div className="banner2-content">
        <h3>Categories</h3>
        <h2>Enhance Your Music Experience</h2>
        <div className="banner2-timer">
            <CountdownTimerBanner targetTime={targetTime}/>
        </div>
        <button>Buy Now →</button>
      </div>

      <img src={Loa} alt="Loa" className="banner2-image" />
    </div>
  );
};

export default Banner2;

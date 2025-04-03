import React from "react";
import "../styles/DetailPage/DetailPage.scss"
import Checkout from "../components/DetailPage/Checkout";
import Footer from "../components/layout/Footer";

const DetailPage = () => {
  return (
    <div className="home-container">

          <div className="page-title">
              <a href="#">Home / </a>
              <a href="#">Cart / </a>
              <a href="#">Product / </a>
              <a href="#">View cart / </a>
              <a href="#">Checkout</a>
          </div>
          <Checkout />
          {/* <div className="footer">
              <Footer />
          </div> */}
          <div className="footer-detail">
              <Footer />
          </div>
    </div>
    
  );
};

export default DetailPage;

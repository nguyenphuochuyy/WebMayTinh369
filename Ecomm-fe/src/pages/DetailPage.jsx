import React from "react";
import NavbarDetail from "../components/DetailPage/NavbarDetail";
import "../styles/DetailPage/DetailPage.scss"
import Checkout from "../components/DetailPage/Checkout";
import Footer from "../components/DetailPage/Footer";

const DetailPage = () => {
  return (
    <div className="home-container">
          <NavbarDetail />
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

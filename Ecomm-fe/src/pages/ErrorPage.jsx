import React from "react";
import Navbar from "../components/layout/Navbar";
import "../styles/ErrorPage/ErrorPage.scss";
import Footer from "../components/layout/Footer";

const ErrorPage = () => {
  return (
    <div className="home-container">
        <div className="error-content">
          <div className="error-message">
            <h1>404 Not Found</h1>
            <p>Không tìm thấy trang bạn đã truy cập. Bạn có thể quay lại trang chủ.</p>
          </div>
          <button className="go-home-button">Trở về trang chủ</button>
        </div>
        <div className="error-footer">
            <Footer />  
        </div>
    </div>
  );
};

export default ErrorPage;

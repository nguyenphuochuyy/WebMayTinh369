import React from "react";
import "../../styles/PD_styles/NavbarStyle.scss";
import heartIcon from "../../images/heart.png";  
import searchIcon from "../../images/search-interface-symbol.png";
import cartIcon from "../../images/shopping-cart.png";



const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1 className="logo">369</h1>
        <ul className="nav-links">
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Liên hệ</a></li>
          <li><a href="#">Giới thiệu</a></li>
          <li><a href="#">Đăng kí</a></li>
        </ul>
        
      <div className="search-container">
        <input type="text" placeholder="Nhập từ khóa để tìm" />
        <button className="search-button">
          <img src={searchIcon} width="20" height="20" alt="Search" className="search-icon" />
        </button>
      </div>

      <div className="icons">
        <img src={heartIcon} width="20" height="20" alt="Search" className="search-icons" />
        <img src={cartIcon} width="20" height="20" alt="Cart"  className="search-icons"/>
      </div>
    </div>
  );
};

export default Navbar;

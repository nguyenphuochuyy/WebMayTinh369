import React from "react";
import "../../styles/Wishlist_styles/Footer.scss";

import QRCode from "../../images/QRCode.png";
import GGPlay from "../../images/google-play.png";
import AppStore from "../../images/app-store.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* Đăng ký */}
        <div className="footer-item">
          <h3>369</h3>
          <p>Giảm 10% cho đơn đầu tiên</p>
          <div className="email-input">
            <input type="email" placeholder="Enter your email" />
            <button>Đăng ký</button>
          </div>
        </div>

        {/* Hỗ trợ */}
        <div className="footer-item">
          <h4>Hỗ trợ</h4>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Tài khoản */}
        <div className="footer-item">
          <h4>Tài khoản</h4>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Login / Register</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="footer-item">
          <h4>Quick Link</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div className="footer-item">
            <h4>Download App</h4>
          <p>Save $3 with App New User Only</p>
          <div className="app-links">
            <img src={QRCode} alt="QR Code" />
            <img src={GGPlay} alt="Google Play" />
            <img src={AppStore} alt="App Store" />
          </div>
          <div className="social-media">
            <a href="#">QR Code</a>
            <a href="#">GG Play</a>
            <a href="#">App Store</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Rimel 2022. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

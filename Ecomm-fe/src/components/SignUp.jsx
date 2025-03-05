import React, { useState } from "react";
import "../styles/SignUp.scss"; // Đảm bảo đường dẫn đúng tới thư mục styles

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="sign-up-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>369</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/signup">Đăng ký</a></li>
          </ul>
        </nav>
      </header>

      {/* Sign Up Form */}
      <div className="sign-up-content">
        <div className="sign-up-image">
          <img
            src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fz4dd4zqCRtxG7pcsqCy3WanDrBEc0MNIuB1gAirt6zsSsTi-AqXWdA3Wv~f-TGqhG-fBkDZ6~Gzxjk4YGXuCTMg84eq8AhBoiNKBvNTIAIaM~EEmpJRXdMkv8EQSQux~uwl7EvTqwsHFjYwMpqhSGwQHoiP8UeTHoMFAsJcu~onCwbOpPm3Ru1yQI3Y4ARCH1q7L3o1JX9i3a5GEX4RnMq7WdQzbd083Jl2vulmD7OmD09R5GAwjnC8unc308T64npjIAHxK4qf3EFE5bAMghjXRsrRzfmngzvdN~xTnckZjxHAdASsPgbEU-~Ok2hUGVa6m6uyqPzge1j00ITOuA__" // Thay thế bằng hình ảnh thực tế
            alt="SignUp"
          />
        </div>
        <div className="sign-up-form">
          <h2>Tạo tài khoản</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Tên đăng nhập</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Số điện thoại hoặc email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Tạo tài khoản
            </button>
            <button className="google-btn">Đăng nhập bằng Google</button>
          </form>
          <div className="login-link">
            <p>
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* First Column: 369 */}
          <div className="footer-column">
            <h3>369</h3>
            <p>Giảm 10% cho đơn đầu tiên</p>
            <div className="newsletter">
              <input type="email" placeholder="Nhập email của bạn" />
              <button>Đăng ký</button>
            </div>
          </div>

          {/* Second Column: Support */}
          <div className="footer-column">
            <h3>Hỗ trợ</h3>
            <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Third Column: Account */}
          <div className="footer-column">
            <h3>Tài khoản</h3>
            <ul>
              <li><a href="/my-account">Tài khoản của tôi</a></li>
              <li><a href="/login">Đăng nhập / Đăng ký</a></li>
              <li><a href="/cart">Giỏ hàng</a></li>
              <li><a href="/wishlist">Danh sách yêu thích</a></li>
              <li><a href="/shop">Mua sắm</a></li>
            </ul>
          </div>

          {/* Fourth Column: Quick Link */}
          <div className="footer-column">
            <h3>Quick Link</h3>
            <ul>
              <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
              <li><a href="/terms-of-use">Điều khoản sử dụng</a></li>
              <li><a href="/faq">Câu hỏi thường gặp</a></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>

          {/* Fifth Column: Download App */}
          <div className="footer-column">
            <h3>Download App</h3>
            <p>Tiết kiệm $3 với App người dùng mới</p>
            <div className="social-media">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
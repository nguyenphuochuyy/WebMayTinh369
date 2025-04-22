import React from "react";
import "../../styles/Login_styles/LoginForm.scss";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg"
          alt="login"
        />
      </div>
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <p>Vui lòng nhập thông tin</p>

        <form>
          <div className="form-group">
            <label>Tên đăng nhập hoặc email</label>
            <input type="text" placeholder="Nhập tên đăng nhập hoặc email" />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>

          <button type="submit" className="btn-submit">
            Đăng nhập
          </button>

          <div className="google-login">
            <button className="google-btn">Đăng nhập bằng Google</button>
          </div>
        </form>

        <div className="signup-link">
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

import React from "react";
import "../../styles/SignUp_styles/SignupForm.scss";

function SignupForm() {
  return (
    <div className="signup-container">
      <div className="sign-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg"
          alt="signup"
        />
      </div>
      <div className="signup-form">
        <h2>Tạo tài khoản</h2>
        <p>Vui lòng nhập thông tin</p>

        <form>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" placeholder="Nhập tên đăng nhập" />
          </div>

          <div className="form-group">
            <label>Số điện thoại hoặc email</label>
            <input type="text" placeholder="Nhập số điện thoại hoặc email" />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>

          <button type="submit" className="btn-submit">
            Tạo tài khoản
          </button>

          <div className="google-login">
            <button className="google-btn">Đăng nhập bằng Google</button>
          </div>
        </form>

        <div className="login-link">
          <p>
            Đã có tài khoản? <a href="#">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

import React from "react";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";  // Import mới tạo
import "../../styles/AccountPage/Profile.scss";

const Profile = () => {
  return (
    <div className="account-page">
      <AccountSidebar />
      <div className="profile-container">
        <div className="form-section">
          <label htmlFor="first-name">Tên</label>
          <input type="text" id="first-name" placeholder="Nhập tên của bạn" />

          <label htmlFor="last-name">Họ</label>
          <input type="text" id="last-name" placeholder="Nhập họ của bạn" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Nhập email" />

          <label htmlFor="address">Địa chỉ</label>
          <input type="text" id="address" placeholder="Nhập địa chỉ" />
        </div>

        <div className="form-section">
          <label htmlFor="current-password">Mật khẩu hiện tại</label>
          <input
            type="password"
            id="current-password"
            placeholder="Nhập mật khẩu hiện tại"
          />

          <label htmlFor="new-password">Mật khẩu mới</label>
          <input
            type="password"
            id="new-password"
            placeholder="Nhập mật khẩu mới"
          />

          <label htmlFor="confirm-password">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Xác nhận mật khẩu"
          />
        </div>

        <div className="action-buttons">
          <button>Lưu thay đổi</button>
          <button>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

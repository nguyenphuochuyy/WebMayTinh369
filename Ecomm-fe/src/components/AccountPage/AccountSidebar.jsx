import React from "react";
import "../../styles/AccountPage/AccountSidebar.scss";

const AccountSidebar = () => {
  return (
    <div className="account-sidebar">
      <ul>
        <li>
          <a href="#">Quản lý tài khoản</a>
          <ul>
            <li><a href="#">Thông tin cá nhân</a></li>
            <li><a href="#">Địa chỉ giao hàng</a></li>
            <li><a href="#">Phương thức thanh toán</a></li>
          </ul>
        </li>

        <li>
          <a href="#">Đơn hàng</a>
          <ul>
            <li><a href="#">Đã hoàn</a></li>
            <li><a href="#">Đã hủy</a></li>
          </ul>
        </li>

        <li>
          <a href="#">My Wishlist</a>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;


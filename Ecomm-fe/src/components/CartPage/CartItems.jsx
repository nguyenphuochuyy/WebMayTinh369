import React from "react";
import "../../styles/CartPage/CartItems.scss";

const CartItems = () => {
  return (
    <div className="cart-items">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LCD Monitor</td>
            <td>$650</td>
            <td><input type="number" min="1" defaultValue="1" /></td>
            <td>$650</td>
          </tr>
          <tr>
            <td>H1 Gamepad</td>
            <td>$550</td>
            <td><input type="number" min="1" defaultValue="2" /></td>
            <td>$1100</td>
          </tr>
        </tbody>
      </table>
      <div className="cart-buttons">
            <button>Trở về trang chủ</button>
            <button>Cập nhật giỏ hàng</button>
      </div>
    </div>
  );
};

export default CartItems;

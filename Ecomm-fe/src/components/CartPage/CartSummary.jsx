import React from "react";
import "../../styles/CartPage/CartSummary.scss";

const CartSummary = () => {
  return (
    <div className="cart-summary">
      <h3>Tổng đơn hàng</h3>
      <p>Tổng tiền: $1750</p>
      <p>Shipping: Free</p>
      <p>Total: $1750</p>
      <button className="checkout-button">Thanh toán</button>
    </div>
  );
};

export default CartSummary;

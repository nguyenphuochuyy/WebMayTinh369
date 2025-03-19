import React from "react";
import "../../styles/CartPage/CartSales.scss";

const CartSales = () => {
  return (
    <div className="cart-sales">
        <input type="text" placeholder="Mã Khuyến Mãi" />
        <button>Áp dụng mã</button>
    </div>
  );
};

export default CartSales;

import React from "react";
import Navbar from "../components/CartPage/Navbar";
import CartItems from "../components/CartPage/CartItems";
import CartSummary from "../components/CartPage/CartSummary";
import CartSales from "../components/CartPage/CartSales";
import "../styles/CartPage/CartPage.scss";
import Footer from "../components/CartPage/Footer";

const CartPage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="cart-title">
          <a href="#">Home /</a>
          <a href="#">Cart</a>
      </div>
      <div className="cart-container">
        <CartItems />
        <CartSummary />
      </div>
      
      <div className="cart-containerSales">
        <CartSales />
      </div>

      <div className="footer-cartPage">
        <Footer/>
      </div>
    </div>
    
  );
};

export default CartPage;


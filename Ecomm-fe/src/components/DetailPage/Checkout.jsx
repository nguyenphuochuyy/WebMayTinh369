import React, { useState } from 'react';
import "../../styles/DetailPage/Checkout.scss";

const Checkout = () => {
  const [coupon, setCoupon] = useState('');

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleSubmit = () => {
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="checkout-container">
      <h2>Chi tiết đơn hàng</h2>
      <div className="form-container">
        <form className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Họ và tên*</label>
            <input type="text" id="name" placeholder="Nhập họ tên của bạn" required />
          </div>
          <div className="form-group">
            <label htmlFor="company">Tên công ty</label>
            <input type="text" id="company" placeholder="Nhập tên công ty" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa chỉ*</label>
            <input type="text" id="address" placeholder="Nhập địa chỉ" required />
          </div>
          <div className="form-group">
            <label htmlFor="city">Thành phố*</label>
            <input type="text" id="city" placeholder="Nhập thành phố" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại*</label>
            <input type="text" id="phone" placeholder="Nhập số điện thoại" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" placeholder="Nhập email" required />
          </div>
        </form>
      </div>
      
      <div className="order-summary">
        <h3>Thông tin đơn hàng</h3>
        <div className="order-details">
          <div className="order-item">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="order-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="order-item total">
            <span>Total:</span>
            <span>$1750</span>
          </div>
        </div>

        <div className="payment-options">
          <h4>Phương thức thanh toán</h4>
          <label>
            <input type="radio" name="payment" /> Bank
          </label>
          <label>
            <input type="radio" name="payment" /> Cash on delivery
          </label>
        </div>

        <div className="coupon">
          <input 
            type="text" 
            placeholder="Mã giảm giá" 
            value={coupon} 
            onChange={handleCouponChange} 
          />
          <button>Áp dụng mã</button>
        </div>

        <button className="checkout-button" onClick={handleSubmit}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default Checkout;

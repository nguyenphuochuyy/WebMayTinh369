import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Divider } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Navbar from "../components/layout/Navbar";
import CartItems from "../components/CartPage/CartItems";
import Footer from "../components/layout/Footer";
import "../styles/CartPage/CartPage.scss";

const { Content } = Layout;

const CartPage = () => {
  return (
    <Layout className="cart-page-layout">
      
      <Content className="cart-page-content">
        <div className="cart-page-container">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="cart-breadcrumb" items={[
            { title: <Link to="/"><HomeOutlined /> Trang chủ</Link> },
            // { title: <ShoppingCartOutlined /> Giỏ hàng }
            { title: <Link to="/cartPage"><ShoppingCartOutlined /> Giỏ hàng</Link> },
          ]} />
          
          <Divider />
          
          {/* Cart Content */}
          <div className="cart-content">
            <CartItems />
          </div>
          
        </div>
      </Content>
      
      
    </Layout>
  );
};

export default CartPage;

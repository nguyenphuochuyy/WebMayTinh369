import React, { useContext, useEffect } from "react";
import Home from "./pages/Home.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import CartPage from "./pages/CartPage.jsx";
import { AuthContext } from "./components/context/auth.context.jsx";
import { getAccountAPI, getCartAPI } from "./services/api.service.js";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "../src/styles/Reset_CSS/style.css";
import ScrollToTop from "./components/ScrollToTop/index.jsx";
function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("home page running");
    fetchUserInfor();
    fetchCartInfor();
  }, [user.refresh]);

  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    console.log("res getaccount", res);
    if (res.data) {
      setUser((prevUser) => ({
        ...prevUser,
        ...res.data.user, // Chèn dữ liệu user từ response vào object user hiện tại
      }));

      console.log("user after set user", user);
    }
  };

  const fetchCartInfor = async () => {
    const res = await getCartAPI();
    console.log("res getcart", res);
    if (res.data) {
      setUser((prevUser) => ({
        ...prevUser,
        sum: res.data.sum, // newSumValue là giá trị bạn muốn cập nhật cho sum
        cartDetails: res.data.cartDetails, // newSumValue là giá trị bạn muốn cập nhật cho sum
      }));
      console.log("user after set cart", user);
    }
  };

  return (
    <div>
    
      <Layout>
        <Navbar />
        <Outlet />
        <Footer />
      </Layout>
   
     
    </div>
  );
}

export default App;

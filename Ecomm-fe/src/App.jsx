import React, { useContext, useEffect, useState, useCallback, Children } from "react";
import Home from "./pages/Home.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import CartPage from "./pages/CartPage.jsx";
import { AuthContext } from "./components/context/auth.context.jsx";
import { getAccountAPI, getCartAPI } from "./services/api.service.js";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "../src/styles/Reset_CSS/style.css";
import DetailPage from "./pages/DetailPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import Profile from "./components/AccountPage/Profile.jsx";
import Addresses from "./components/AccountPage/Addresses.jsx";
import MyOrder from "./components/AccountPage/MyOrder.jsx";
import ProductListPage from "./pages/ProductListPage/index.jsx";
function App() {

  const { user, setUser } = useContext(AuthContext);
  const [searchHandler, setSearchHandler] = useState(null);

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
        ...res.data.user,
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
        sum: res.data.sum,
        cartDetails: res.data.cartDetails,
      }));
      console.log("user after set cart", user);
    }
  };
  // Callback để nhận handleSearch từ Home
  const setSearchHandlerCallback = useCallback((handler) => {
    setSearchHandler(() => handler);
  }, []);

  return (
    <div>
      <Layout>
        <Navbar onSearch={searchHandler} />
        <Routes>
          <Route path="/" element={<Home onSearchHandler={setSearchHandlerCallback} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/detailPage/:productId" element = {<DetailPage/>}/>
          <Route path="/account" element= {<AccountPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="myOrder" element={<MyOrder />} />
          </Route>
          <Route path="/collection/:categoryId" element = {<ProductListPage/>}></Route>
        </Routes>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
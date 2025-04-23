import React, { useContext, useEffect } from "react";
import Home from "./pages/Home.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import CartPage from "./pages/CartPage.jsx";
import { AuthContext } from "./components/context/auth.context.jsx";
import { getAccountAPI } from "./services/api.service.js";
import Navbar from "./components/layout/Navbar.jsx";
import { Footer } from "antd/es/layout/layout.js";
import { Outlet } from "react-router-dom";

function App() {

  const {setUser} = useContext(AuthContext)

  useEffect(() => {
    console.log("home page running");
    fetchUserInfor();
  }, []);
  
  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    console.log("res", res);
    if(res.data){
      setUser(res.data.user);
      console.log("user", res.data);
    }
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
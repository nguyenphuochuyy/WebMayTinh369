import React, { useContext, useEffect } from "react";

import { AuthContext } from "./components/context/auth.context.jsx";
import { getAccountAPI } from "./services/api.service.js";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Sidebar from "./components/Admin/layout/Sidebar.jsx";

function Admin() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("home page running");
    fetchUserInfor();
  }, []);

  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    console.log("res", res);
    if (res.data) {
      setUser(res.data.user);
      console.log("user", res.data);
    }
  };

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Admin;

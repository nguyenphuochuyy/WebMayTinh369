import React, { useContext } from "react";
import Navbar from "../components/layout/Navbar";
import "../styles/AccountPage/AccountPage.scss"
import Footer from "../components/layout/Footer";
import Profile from "../components/AccountPage/Profile";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";

const AccountPage = () => {

  const { user, setUser } = useContext(AuthContext);
  return (
    console.log("account page username"),
    console.log("user", user),
    <div className="home-container">
          <div className="account-title">
              <div className="account-title-1">
                <Link to="/">Home / </Link>
                <Link to="/accountPage">My Account</Link>
              </div>
              <div className="account-title-2">
                <span>Welcome!</span>
                <span className="account-title-2a">{user.fullName || user.username}</span>
              </div>
          </div>
          <Profile />
          <div className="account-footer">
            <Footer />
          </div>
    </div>
  );
};

export default AccountPage;

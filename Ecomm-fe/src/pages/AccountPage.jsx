import React from "react";
import Navbar from "../components/AccountPage/Navbar";
import "../styles/AccountPage/AccountPage.scss"
import Footer from "../components/AccountPage/Footer";
import Profile from "../components/AccountPage/Profile";

const AccountPage = () => {
  return (
    <div className="home-container">
          <Navbar />
          <div className="account-title">
              <div className="account-title-1">
                <a href="#">Home / </a>
                <a href="#">My Account</a>
              </div>
              <div className="account-title-2">
                <span>Welcome!</span>
                <span className="account-title-2a">Md Rimel</span>
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

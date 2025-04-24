import React, { useContext, useState } from "react";
import "../../styles/LayoutStyle/NavbarStyle.scss";
import heartIcon from "../../images/heart.png";
import searchIcon from "../../images/search-interface-symbol.png";
import cartIcon from "../../images/shopping-cart.png";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { logoutAPI } from "../../services/api.service";

const Navbar = ({ onSearch }) => { // Nhận prop onSearch
  const { user, setUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    const res = await logoutAPI();
    console.log("res", res);
    localStorage.removeItem("access_token");
    navigate("/login");

    setUser({
      avatar: "",
      email: "",
      fullName: "",
      id: "",
      phone: "",
      role: "",
      username: "",
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm); // Gọi callback prop để truyền từ khóa lên Home
  };

  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "home",
    },
    {
      label: <Link to="/contactPage">Liên hệ</Link>,
      key: "contact",
    },
    {
      label: <Link to="/about">Giới thiệu</Link>,
      key: "about",
    },
    ...(!user.id
      ? [
          {
            label: <Link to="/login">Đăng nhập</Link>,
            key: "login",
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Welcome, ${user.fullName || user.username}`,
            key: "welcome",
            children: [
              {
                label: <span onClick={() => navigate("/accountPage")}>Thông tin cá nhân</span>,
                key: "info",
              },
              ...(user.role === "ADMIN"
                ? [
                    {
                      label: <span onClick={() => navigate("/admin")}>Trang quản lý</span>,
                      key: "admin", // Admin-specific page link
                    },
                  ]
                : []),
              {
                label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <div className="navbar-container">
      <h1 className="logo">
         <a href="/" style={{textDecoration : 'none' , color : 'black'}}>369</a>
        </h1>

      {/* Menu chính giữa */}
      <Menu
        mode="horizontal"
        items={items}
        theme="light"
      />

      {/* Tìm kiếm + icon bên phải */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Nhập từ khóa để tìm"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
          <button className="search-button" onClick={handleSearchSubmit}>
            <img
              src={searchIcon}
              width="20"
              height="20"
              alt="Search"
              className="search-icon"
            />
          </button>
        </div>

        <div className="icons">
          <img
            src={heartIcon}
            width="20"
            height="20"
            alt="Search"
            className="search-icons"
          />
          <img
            src={cartIcon}
            width="20"
            height="20"
            alt="Cart"
            className="search-icons"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
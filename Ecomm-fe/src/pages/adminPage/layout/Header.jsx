import { Link, useNavigate } from "react-router-dom";
import { Children, useContext, useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";

import { Menu, message } from "antd";
import { AuthContext } from "../../../components/context/auth.context";

const Header = () => {
    const [current, setCurrent] = useState("mail");
    const { user, setUser } = useContext(AuthContext);
    let navigate = useNavigate();
    console.log("user", user);
    const onClick = (e) => {
      console.log("click ", e);
      setCurrent(e.key);
    };
  
    const handleLogout = async () => {
    //   await logoutAPI();
    //   localStorage.removeItem("access_token");
    //   navigate("/login");
    //   message.success("Logout successfully");
    //   setUser({
    //     avatar: "",
    //     email: "",
    //     fullName: "",
    //     id: "",
    //     phone: "",
    //     role: "",
    //   });
    };
  
    const items = [
      {
        label: <Link to="/admin">Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Link to="/admin/users">Users</Link>,
        key: "users",
        icon: <UserOutlined />,
      },
      {
        label: <Link to="/admin/products">Products</Link>,
        key: "products",
        icon: <BookOutlined />,
      },
      ...(!user.id
        ? [
            {
              label: <Link to={"/login"}>Login</Link>,
              key: "login",
              icon: <LoginOutlined />,
            },
          ]
        : []),
  
      ...(user.id
        ? [
            {
              label: `Welcome ${user.username}`,
              key: "setting",
              icon: <AliwangwangOutlined />,
              children: [
                {
                  label: <span onClick={() => handleLogout()}> Logout</span>,
                  key: "logout",
                },
              ],
            },
          ]
        : []),
    ];
  
    return (
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    );
  };
  
  export default Header;
  

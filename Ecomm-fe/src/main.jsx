import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import CartPage from "./pages/CartPage.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LogIn from "./components/Login/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import Admin from "./Admin.jsx";
import Product from "./pages/adminPage/Product.jsx";
import User from "./pages/adminPage/User.jsx";
import NoTiVerifyPage from "../src/pages/NoTiVerifyPage/index.jsx"
import VerifyPage from "./pages/VerifyPage/index.jsx";
import Checkout from "./components/DetailPage/Checkout.jsx";
import Addresses from "./components/AccountPage/Addresses.jsx";
import Profile from "./components/AccountPage/Profile.jsx";
import OrderSuccess from "./pages/OrderSuccessPage.jsx";
import MyOrder from "./components/AccountPage/MyOrder.jsx";
import DashboardPage from "./pages/adminPage/DashboardPage.jsx";
import { Spin } from "antd";
import ProductListPage from "./pages/ProductListPage/index.jsx";
import Order from "./pages/adminPage/Order.jsx";
import OrderSuccessBank from "./pages/OrderSuccessPageBank/index.jsx";
import PrivateRoute from "./pages/private.route.jsx";
import AboutPage from "./components/About/Main.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token && allowedRoles.includes(role)) {
      setIsAuthorized(true);
    }

    setTokenChecked(true); // đã kiểm tra xong
  }, []);

  if (!tokenChecked) {
    return <Spin>
    </Spin> // hoặc spinner
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Unauthorized = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1>403 - Truy cập bị từ chối</h1>
    <p>Bạn không có quyền truy cập vào trang này.</p>
  </div>
);
  // Callback để nhận handleSearch từ Home
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cartPage", 
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        )},
      {
        path: "/account",
        element: <AccountPage />,
        children: [
          { index: true, element: <Profile /> },
          { path: "profile", element: <Profile /> },
          { path: "addresses", element: <Addresses /> },
          { path: "myOrder", element: <MyOrder /> },
        ],
      },
      { path: "/contactPage", element: <ContactPage /> },
      { path: "/detailPage/:productId", element: <DetailPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orderSuccess", element: <OrderSuccess /> }, 
      { path:"/payment-return" ,element : <OrderSuccessBank/> },
      { path:"/notiVerify" ,element : <NoTiVerifyPage/> },
      { path:"/verify" ,element : <VerifyPage/> },
      {path : "/collection/:categoryId", element : <ProductListPage />},
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Admin />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/admin/products", element: <Product /> },
      { path: "/admin/users", element: <User /> },
      { path: "/admin/dashboard", element: <DashboardPage /> },
      { path: "/admin/orders", element: <Order /> },
    ],
  },
  { path: "/login", element: <LogIn /> },
  { path: "/forgotPassword", element: <ForgotPasswordPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);

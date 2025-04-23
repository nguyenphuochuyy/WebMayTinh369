import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import CartPage from "./pages/CartPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LogIn from "./components/Login/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import HomeAdmin from "./pages/adminPage/HomeAdmin.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import Admin from "./Admin.jsx";
import Product from "./pages/adminPage/Product.jsx";
import User from "./pages/adminPage/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cartPage",
        element: <CartPage />,
      },
      {
        path: "/accountPage",
        element: <AccountPage />,
      },
      {
        path: "/contactPage",
        element: <ContactPage />,
      },
      {
        path: "/detailPage",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeAdmin />,
      },
      {
        path: "/admin/products",
        element: <Product />,
      },
      {
        path: "/admin/users",
        element: <User />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);

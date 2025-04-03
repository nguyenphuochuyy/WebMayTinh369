import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
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
import { AuthWrapper } from "./components/context/auth.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
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

    ]
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

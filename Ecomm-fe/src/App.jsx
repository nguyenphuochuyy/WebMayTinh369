import React from "react";
import Home from "./pages/Home.jsx";
import LogIn from "./components/Login/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<SignUp />} />

      {/* Catch-all route for 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </div>
  );
}

export default App;

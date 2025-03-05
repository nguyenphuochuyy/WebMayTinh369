import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../styles/Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <Sidebar /> 
      </div>
    </div>
  );
};

export default Home;


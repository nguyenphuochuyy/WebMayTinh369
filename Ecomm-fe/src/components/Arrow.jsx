import React from "react";
import "../styles/Arrow.scss";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";

const Arrow = () => {
  return (
    <div className="arrow-container">
      <img src={leftArrow} alt="Left Arrow" className="arrow left-arrow" />
      <img src={rightArrow} alt="Right Arrow" className="arrow right-arrow" />
    </div>
  );
};

export default Arrow;


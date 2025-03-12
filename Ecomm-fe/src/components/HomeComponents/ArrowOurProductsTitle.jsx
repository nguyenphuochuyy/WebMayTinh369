import React from "react";
import "../../styles/HomeStyles/ArrowOurProductsTitle.scss";
import leftArrow from "../../images/left-arrow.png";
import rightArrow from "../../images/right-arrow.png";

const ArrowOurProductsTitle = () => {
  return (
    <div className="arrowOurProductTitle-container">
      <img src={leftArrow} alt="Left Arrow" className="arrow left-arrow" />
      <img src={rightArrow} alt="Right Arrow" className="arrow right-arrow" />
    </div>
  );
};

export default ArrowOurProductsTitle;

import React from "react";
import "../../styles/HomeStyles/ArrowCategories.scss";
import leftArrow from "../../images/left-arrow.png";
import rightArrow from "../../images/right-arrow.png";

const ArrowCategories = () => {
  return (
    <div className="arrow-categories">
      <img src={leftArrow} alt="Left Arrow" className="arrow left-arrowCategories" />
      <img src={rightArrow} alt="Right Arrow" className="arrow right-arrowCategories" />
    </div>
  );
};

export default ArrowCategories;
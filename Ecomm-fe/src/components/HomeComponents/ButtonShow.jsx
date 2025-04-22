import React from "react";
import "../../styles/HomeStyles/ButtonShow.scss";

const ButtonShow = ({ onClick }) => {
  return (
    <div className="button-show">
      <button className="button" onClick={onClick}>
        View all products
      </button>
    </div>
  );
};

export default ButtonShow;


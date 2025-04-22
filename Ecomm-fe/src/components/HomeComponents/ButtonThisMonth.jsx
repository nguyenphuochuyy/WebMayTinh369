import React from "react";
import "../../styles/HomeStyles/ButtonThisMonth.scss";

const ButtonThisMonth = ({ onClick }) => {
  return (
    <div className="button-thisMonth">
      <button className="button" onClick={onClick}>
      View all products
      </button>
    </div>
  );
};

export default ButtonThisMonth;
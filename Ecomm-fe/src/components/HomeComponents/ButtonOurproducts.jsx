import React from "react";
import "../../styles/HomeStyles/ButtonOurproducts.scss";

const ButtonOurproducts = ({ onClick }) => {
  return (
    <div className="buttonButtonOurProducts-show">
      <button className="buttonButtonOurProducts" onClick={onClick}>
        View all products
      </button>
    </div>
  );
};

export default ButtonOurproducts;
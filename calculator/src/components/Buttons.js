import React from "react";
import "./Buttons.css";

const Buttons = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Buttons;

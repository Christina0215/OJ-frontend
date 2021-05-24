import React from "react";
import addButtonImg from "../resources/primaryButton.png";
import "./main.less";

export default ({ clickHandler }) => {
  return (
    <div className="create-button-container" onClick={clickHandler}>
      <div className="create-button-outter">
        <div className="create-button-inner">
          <img src={addButtonImg} alt="add" width="60%" height="60%" />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./Modal.scss";

const Modal = ({ active, children }) => {
  return (
    <div className={active ? "modal-wrap active" : "modal-wrap"}>
      <div
        className={active ? "modal active" : "modal"}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default Modal;

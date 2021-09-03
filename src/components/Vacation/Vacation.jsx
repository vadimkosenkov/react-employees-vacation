import React from "react";
import "./Vacation.scss";
import NarrowColumn from "./NarrowColumn/NarrowColumn.jsx";
import WideColumn from "./WideColumn/WideColumn.jsx";

const Vacation = () => {
  return (
    <div className="vacation-wrap">
      <div className="vacation">
        <NarrowColumn />
        <WideColumn />
      </div>
    </div>
  );
};
export default Vacation;

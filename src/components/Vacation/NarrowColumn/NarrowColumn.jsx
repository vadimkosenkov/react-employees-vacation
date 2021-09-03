import React from "react";
import "./NarrowColumn.scss";
import VacationDays from "./VacationDays/VacationDays.jsx";
import VacationLeave from "./VacationLeave/VacationLeave";

const NarrowColumn = () => {
  return (
    <div className="narrow-column">
      <VacationDays />
      <VacationLeave />
    </div>
  );
};
export default NarrowColumn;

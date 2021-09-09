import React from "react";
import { connect } from "react-redux";
import "./VacationDays.scss";

const VacationDays = (props) => {
  return (
    <div className="vacation-days-wrap">
      <div className="vacation-days">
        <div className="vacation-days-title"> Vacation Days</div>
        <div className="available">
          <div>Available</div>
          <div className="vacationAvailable">{props.vacationAvailable}</div>
        </div>
      </div>
      <div className="vacation-details">
        <img src="./assets/double-arrow-bottom.svg" alt="icon:double-arrow " />
        <span>more details</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vacationAvailable: state.vacation.vacationAvailable,
  };
};

export default connect(mapStateToProps)(VacationDays);

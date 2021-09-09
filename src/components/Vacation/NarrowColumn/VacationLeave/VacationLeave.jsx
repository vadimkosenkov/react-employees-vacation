import React from "react";
import { useSelector } from "react-redux";
import "./VacationLeave.scss";
import Form from "../../../../shared/Form/Form";

const VacationLeave = () => {
  const selectedLeave = useSelector((state) => state.vacation.selectedLeave);

  return (
    <div className="new-request-wrap">
      {getNewRequest(selectedLeave)}
      <div className="new-request-content">
        <div className="title">New Request </div>
        <Form />
        <div className="submitAndFaq">
          <button className="new-request-submit" form="data">
            Submit
          </button>
          <div className="faq">
            <div className="title">Have questions? </div>
            <div className="link">Read FAQ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaveImgCollection = [
  <img src="assets/vacation-leave.svg" alt="vacation-leave" />,
  <img src="assets/sick-leave.svg" alt="sick-leave" />,
  <img src="assets/own-expense-leave.svg" alt="own-expense-leave" />,
];

const getNewRequest = (option) => {
  switch (option) {
    case "vacationLeave":
      return LeaveImgCollection[0];
    case "sickLeave":
      return LeaveImgCollection[1];
    case "ownExpenseLeave":
      return LeaveImgCollection[2];
    default:
      alert("Something went wrong");
  }
};

export default VacationLeave;

import React from "react";
import "./Confirm.scss";

const Confirm = ({
  elem,
  confirmType,
  setConfirm,
  saveConfirm,
  editConfirm,
  isCreating,
}) => {
  const confirmButton = (text) => (
    <button
      type="button"
      onClick={() => {
        setConfirm(false);
        isCreating ? saveConfirm() : editConfirm();
      }}>
      {text}
    </button>
  );
  const closeButton = (text) => (
    <button
      type="button"
      onClick={() => {
        setConfirm(false);
      }}>
      {text}
    </button>
  );

  const confirmData = {
    default: {
      content: (
        <div className="confirm-data-black">
          {`Please confirm ${
            isCreating ? "creating a new" : "the changes to the"
          } vacation request:`}
        </div>
      ),
      buttons: (
        <div className="confirmButtons">
          {closeButton("cancel")} {confirmButton("confirm")}
        </div>
      ),
    },

    twoWeeksBefore: {
      content: (
        <div>
          <div className="confirm-data-red two-weeks-mb">
            Please submit your request at least two weeks before the desired
            start date.
          </div>
          <div className="confirm-data-black ">
            Would you like to confirm the request with the dates as suggested
            below?
          </div>
        </div>
      ),
      buttons: (
        <div className="confirmButtons">
          {confirmButton("Confirm anyway")} {closeButton("Change dates")}
        </div>
      ),
    },
    onlyHolidays: {
      content: (
        <div className="confirm-data-red">
          The selected interval includes only public holidays or weekend days.
          Please review the selected dates.
        </div>
      ),
      buttons: (
        <div className="confirmButtons">
          {confirmButton("Confirm anyway")} {closeButton("Change dates")}
        </div>
      ),
    },
    samePeriod: {
      content: (
        <div className="confirm-data-red">
          It looks like you already have a request for the same period. Please
          check the dates of your request.
        </div>
      ),
      buttons: (
        <div className="confirmButtons">{closeButton("Ok, got it")}</div>
      ),
    },
    shorterVacation: {
      content: (
        <div className="confirm-data-red">
          We know you must be tired. But please consider shorter vacation. How
          about 2 weeks?
        </div>
      ),
      buttons: (
        <div className="confirmButtons">
          {confirmButton("Confirm anyway")} {closeButton("Change dates")}
        </div>
      ),
    },
  };

  const getItemTitle = () => {
    const dayString = `(${elem?.diffDays} day${elem?.diffDays > 1 ? "s" : ""})`;
    const mainTitle = `${getDateCalendar(elem?.start)} - ${getDateCalendar(
      elem?.end
    )} `;
    const subTitle = elem?.selectedLeave === "vacationLeave" ? dayString : "";
    return mainTitle + subTitle;
  };

  const getDateCalendar = (data) => {
    const parseDate = data.split("-");
    return `${parseDate[2]}.${parseDate[1]}.${parseDate[0]}`;
  };

  return (
    <div className="confirm-wrap">
      <header className="modal-header">
        <span>Request a vacation</span>
      </header>
      <main className="confirm-main">
        <div>{confirmData[confirmType].content}</div>
        <div className="modal-item">
          {getItemSrc[elem.selectedLeave]}
          <div className="date">{getItemTitle()}</div>
        </div>
      </main>
      <footer className="modal-footer">
        {confirmData[confirmType].buttons}
      </footer>
    </div>
  );
};

const getItemSrc = {
  vacationLeave: <img src="assets/vacation-leave-icon.svg" alt="icon:palm" />,
  sickLeave: <img src="assets/sick-leave-icon.svg" alt="icon:sick" />,
  ownExpenseLeave: (
    <img src="assets/own-expense-leave-icon.svg" alt="icon:own-expense" />
  ),
};

export default Confirm;

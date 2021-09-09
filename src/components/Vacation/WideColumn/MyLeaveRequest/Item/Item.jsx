import React from "react";
import "./Item.scss";

const Item = ({ elem = "" }) => {
  const getItemTitle = () => {
    const dayString = `(${elem.diffDays} day${elem.diffDays > 1 ? "s" : ""})`;
    const mainTitle = `Vacation: ${getDateCalendar(
      elem.start
    )} - ${getDateCalendar(elem.end)} `;
    const subTitle = elem.selectedLeave === "vacationLeave" ? dayString : "";

    return mainTitle + subTitle;
  };

  const getDateCalendar = (data) => {
    const parseDate = data.split("-");
    return `${parseDate[2]}.${parseDate[1]}.${parseDate[0]}`;
  };

  const result = (
    <div className="item">
      {getItemSrc[elem.selectedLeave]}
      <div className="content">
        <div className="date-wrap">
          <div className="date">{getItemTitle()}</div>
          <div>
            <img src="assets/arrow-right.svg" alt="icon:arrow-right" />
          </div>
        </div>
        <div className="created">
          {elem.changeStatus}:&nbsp;
          {getDateString(elem.changedDate || elem.creationDate)}
        </div>
        <div className="status">Approved</div>
      </div>
    </div>
  );

  return result;
};

export function getDateString(data) {
  const date = new Date(data);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("en-EN", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return `${day} ${month} ${year}`;
}

const getItemSrc = {
  vacationLeave: <img src="assets/vacation-leave-icon.svg" alt="icon:palm" />,
  sickLeave: <img src="assets/sick-leave-icon.svg" alt="icon:sick" />,
  ownExpenseLeave: (
    <img src="assets/own-expense-leave-icon.svg" alt="icon:own-expense" />
  ),
};

export default Item;

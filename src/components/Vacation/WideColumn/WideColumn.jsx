import React from "react";
import { connect } from "react-redux";
import MyLeaveRequest from "./MyLeaveRequest/MyLeaveRequest";
import NoRequest from "./NoRequest/NoRequest";
import "./WideColumn.scss";

const WideColumn = (props) => {
  return (
    <div className="wide-column">
      <div className="wide-column-title">My Leave Requests</div>
      {getRequests(props)}
    </div>
  );
};

const checkYearTitle = (i, sortedLog) => {
  if (
    i === 0 ||
    new Date(sortedLog[i].start).getFullYear() !==
      new Date(sortedLog[i - 1].start).getFullYear()
  ) {
    return (
      <div className="year-title">
        {new Date(sortedLog[i].start).getFullYear()} Year
      </div>
    );
  }
  return "";
};

const getRequests = (props) => {
  if (props.log.length) {
    const sortedLog = props.log
      .slice()
      .sort((a, b) => (new Date(b.start) < new Date(a.start) ? 1 : -1));

    return sortedLog.map((elem, i) => (
      <div key={elem.id} className="item-section">
        {checkYearTitle(i, sortedLog)}
        <MyLeaveRequest elem={elem} />
      </div>
    ));
  }
  return <NoRequest />;
};

const mapStateToProps = (state) => {
  return {
    log: state.vacation.log,
  };
};
export default connect(mapStateToProps)(WideColumn);

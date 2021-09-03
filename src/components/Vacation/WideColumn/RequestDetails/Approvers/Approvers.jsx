import React from "react";
import "./Approvers.scss";

const Approvers = ({ setActive, setChangeMode, elem }) => {
  return (
    <div>
      <main className="modal-main">
        <div className="title">Already approved</div>
        <div className="approved">
          <img src="./assets/approved.svg" alt="icon:checked" />
          <div>
            <div className="name">John Smith</div>
            <div className="comment">Comments: Have a nice vacation!</div>
          </div>
        </div>
        <div className="approved">
          <img src="./assets/approved.svg" alt="user-avatar" />
          <div>
            <div className="name">John Smith</div>
            <div className="comment">Comments: Have a nice vacation!</div>
          </div>
        </div>
        <div className="title">Current approver(s)</div>
        <div className="row">
          <img src="./assets/avatar/user-1.png" alt="user-avatar" />
          <div className="name">Will McConnel</div>
        </div>
        <div className="title">Next approver(s)</div>
        <div className="row">
          <img src="./assets/avatar/user-2.png" alt="user-avatar" />
          <div className="name">John Smith</div>
        </div>
        <div className="row">
          <img src="./assets/avatar/user-3.png" alt="user-avatar" />
          <div className="name">Mike Smith</div>
        </div>
        <div className="title">Next approver(s)</div>
        <div className="row">
          <img src="./assets/avatar/user-4.png" alt="user-avatar" />
          <div className="name">Katrin Brown</div>
        </div>
      </main>
      <footer className="modal-footer">
        <button
          className="change-btn"
          onClick={() => setChangeMode(true)}
          disabled={new Date(elem.start) <= new Date()}>
          change
        </button>
        <button className="close-btn" onClick={() => setActive(false)}>
          close
        </button>
      </footer>
    </div>
  );
};

export default Approvers;

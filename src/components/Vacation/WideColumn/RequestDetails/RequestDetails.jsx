import React, { useState } from "react";
import Item from "../MyLeaveRequest/Item/Item";
import Approvers from "./Approvers/Approvers";
import "./RequestDetails.scss";
import RequestForm from "./RequestForm/RequestForm";

const RequestDetails = ({ elem, setActive }) => {
  const [isChangeMode, setChangeMode] = useState(false);
  return (
    <div className="request-details-wrap">
      <header className="modal-header">
        <span>{isChangeMode ? "Change request" : "Request for vacation"}</span>
        {isChangeMode ? (
          ""
        ) : (
          <img
            src="./assets/double-rectangle.svg"
            alt="icon:double-rectangle"
          />
        )}
      </header>
      <div className="selected-item">
        <Item elem={elem} />
      </div>
      {isChangeMode ? (
        <RequestForm
          setActive={setActive}
          setChangeMode={setChangeMode}
          elem={elem}
        />
      ) : (
        <Approvers
          setActive={setActive}
          setChangeMode={setChangeMode}
          elem={elem}
        />
      )}
    </div>
  );
};
export default RequestDetails;

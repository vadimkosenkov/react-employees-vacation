import React, { useRef } from "react";
import Form from "../../../../../shared/Form/Form";

const RequestForm = ({ setActive, setChangeMode, elem }) => {
  const childRef = useRef();
  return (
    <div>
      <div className="new-request-wrap">
        <div className="new-request-content">
          <Form
            isModalView={true}
            elem={elem}
            ref={childRef}
            setActive={setActive}
          />
        </div>
      </div>
      <footer className="details-footer">
        <button
          className="cancel-btn"
          onClick={() => {
            setActive(false);
            setChangeMode(false);
          }}>
          cancel
        </button>
        <button
          className="save-btn"
          onClick={() => childRef.current.openModal()}>
          save
        </button>
      </footer>
    </div>
  );
};

export default RequestForm;

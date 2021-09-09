import React, { useState } from "react";
import Modal from "./../../../../shared/Modal/Modal";
import RequestDetails from "../RequestDetails/RequestDetails";
import Item from "../MyLeaveRequest/Item/Item";

const MyLeaveRequest = ({ elem }) => {
  const [modalActive, setModalActive] = useState();

  return (
    <div>
      <div
        onClick={() => {
          setModalActive(true);
        }}>
        <Item elem={elem} />
      </div>
      <Modal active={modalActive}>
        <RequestDetails elem={elem} setActive={setModalActive} />
      </Modal>
    </div>
  );
};
export default MyLeaveRequest;

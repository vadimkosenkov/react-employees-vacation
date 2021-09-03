import React from "react";
import "./UserBar.scss";

const UserBar = () => {
  return (
    <div className="user-bar">
      <div className="user-bar-plane">
        <img src="./assets/plane.svg" alt="icon: plane" />
      </div>
      <div className="user-bar-info">
        <img src="./assets/userpic.png" alt="icon: user avatar" />
        Anna Smith
      </div>
      <div className="user-bar-turn-off">
        <img src="./assets/turn-off.svg" alt="icon: turn-off" />
      </div>
    </div>
  );
};
export default UserBar;

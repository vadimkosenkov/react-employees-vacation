import React from "react";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="nav-wrap">
      <div className="nav">
        <div>
          <a href="/#">Address Book</a>
        </div>
        <div>
          <a href="/#" className="active-nav">
            Leave Requests
          </a>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;

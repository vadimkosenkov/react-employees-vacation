import React from "react";
import "./Header.scss";
import Title from "./Title/Title.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import UserBar from "./UserBar/UserBar.jsx";

const Header = () => {
  return (
    <header className="header-wrap">
      <div className="header">
        <Title />
        <NavBar />
        <UserBar />
      </div>
    </header>
  );
};

export default Header;

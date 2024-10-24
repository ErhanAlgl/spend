import React from "react";
import "./Header.style.css";

const Header = ({ balance, animationDirection }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="person-info">
            <img className="person-image" src="/images/elon-musk-3.jpg" alt="" />
            <span className="person-name">Spend Elon Musk's Money</span>
          </div>
        </div>
      </header>
      <div className={`balance ${animationDirection}`}>
      ${balance.toLocaleString()}
      </div>
    </>
  );
};

export default Header;

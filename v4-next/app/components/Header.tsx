import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="header" data-header>
      <div className="container">
        <a href="/" className="logo">
          <img
            src="/images/tb_logo_brown.svg"
            width={40}
            height={40}
            alt="owner home"
          />
        </a>

        <button
          className="nav_open_btn"
          aria-label="open menu"
          data-nav-toggler
        >
          <img
            src="/images/menu.svg"
            width={17}
            height={17}
            alt="menu icon"
          />
        </button>

        <Navbar />

        <div className="overlay" data-nav-toggler data-overlay></div>
      </div>
    </header>
  );
}

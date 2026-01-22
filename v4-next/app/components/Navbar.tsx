import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar" data-navbar>
      <div className="navbar_top">
        <a href="/" className="logo">
          <img
            src="/images/nav_logoNew.svg"
            width={140}
            height={40}
            alt="owner home"
            className="img"
          />
        </a>

        <button
          className="nav_close_btn"
          aria-label="close menu"
          data-nav-toggler
        >
          <span className="span one"></span>
          <span className="span two"></span>
        </button>
      </div>

      <ul className="navbar_list">
        {[
          ["Home", "/"],
          ["Gallery", "/#gallery"],
          ["About", "/#about"],
          ["Services", "/#services"],
          ["Portfolio", "/#portfolio"],
        ].map(([label, href]) => (
          <li key={label} className="navbar_item">
            <a href={href} className="navbar_link" data-nav-link>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="contact_btn">
        <img
          src="/images/Phone.svg"
          width={21}
          height={21}
          alt="phone icon"
        />
        <span className="span">Contact Us</span>
      </a>

      <a className="navbar_title">
        <img
          src="/images/MapPin.svg"
          width={30}
          height={30}
          alt="address icon"
        />
        <span>My Address</span>
      </a>

      <address className="navbar_text">Ikeja, Lagos, Nigeria.</address>

      <p className="navbar_text">
        Would you like to book a session?{" "}
        <a href="tel:070-6114-7696" className="contact_link">
          070-6114-7696
        </a>
      </p>
    </nav>
  );
}

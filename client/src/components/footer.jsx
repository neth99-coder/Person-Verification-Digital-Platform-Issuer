import React from "react";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="py-3 mt-auto  border-top ">
      <div className="container d-flex align-items-center justify-content-center">
        <img
          src={logo}
          alt=""
          width="40"
          className="d-inline-block align-text-top rounded-circle"
        />
        <p className="mb-0 text-muted">© {process.env.REACT_APP_SITE_NAME}</p>
      </div>
    </footer>
  );
}

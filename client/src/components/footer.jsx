import React from "react";
import logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="py-3 mt-auto mb-4 border-top">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <p className="col-md-4 mb-0 text-muted">
          © {process.env.REACT_APP_SITE_NAME}
        </p>

        <img
          src={logo}
          alt=""
          width="40"
          className="d-inline-block align-text-top"
        />
      </div>
    </footer>
  );
}

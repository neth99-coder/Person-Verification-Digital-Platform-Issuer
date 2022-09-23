import React, { useState } from "react";
import { ImSun } from "react-icons/im";
import { MdManageAccounts, MdLogin, MdLogout } from "react-icons/md";
import { FaAddressBook, FaRegUser } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Collapse } from "bootstrap";

export default function NavBar({ theme, toggleTheme }) {
  const nextTheme = theme ? "light" : "dark";

  return (
    <nav className="navbar navbar-expand-lg navbar-custom mb-5">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand hover-focus">
          <img
            src="https://img.freepik.com/free-vector/qr-code-person-holding-smartphone_23-2148620753.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
            alt="icon1"
            height="24"
            className="d-inline-block align-text-top"
          />
          <span className="ms-2">
            {/* {process.env.REACT_APP_SITE_NAME} */}
            Person Verification Digital Platform
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav-body"
          aria-controls="nav-body"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <NavLink className="nav-link hover-focus" to="#">
                Add New Verifier Services
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link hover-focus" to="#">
                View Profile
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link hover-focus" to="#">
                Request Digital Identity
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link hover-focus" to="#">
                Contact Us
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* {!user && ( */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle hover-focus"
                role="button"
                id="registerDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="">
                  <FaAddressBook
                    size={30}
                    style={{ fill: "grey" }}
                  ></FaAddressBook>
                  <span className="ms-2">Register</span>
                </span>
              </span>
              <ul
                className="dropdown-menu collapsed"
                id="register-collapse"
                aria-labelledby="registerDropdown"
              >
                <li>
                  <NavLink
                    className="dropdown-item hover-focus"
                    to="/register-user/"
                  >
                    Register as User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item hover-focus"
                    to="/register-verifier/"
                  >
                    Register as Verifier
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* )}
            {!user && ( */}
            <li className="nav-item d-flex align-items-center">
              <NavLink className="nav-link hover-focus" to="/login">
                <span className="ms-2">
                  <MdLogin size={30} style={{ fill: "grey" }}></MdLogin>
                  <span className="ms-2">Login</span>
                </span>
              </NavLink>
            </li>
            {/* )}
            {user && ( */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle hover-focus"
                role="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <MdManageAccounts
                  size={30}
                  style={{ fill: "grey" }}
                ></MdManageAccounts>
              </span>
              <ul
                className="dropdown-menu collapsed"
                id="profile-collapse"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <span className="dropdown-item">
                    {/* {isAdmin
                      ? user.name
                      : `${user.first_name} ${user.last_name}`} */}
                  </span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* {user && !isAdmin && ( */}
                <li>
                  <NavLink
                    className="dropdown-item hover-focus"
                    // to={`/customers/${user.user_id}`}
                  >
                    <span>
                      <FaRegUser></FaRegUser>
                      <span className="ms-2">Profile</span>
                    </span>
                  </NavLink>
                </li>
                {/* )} */}
                {/* {user && ( */}
                <li>
                  <NavLink className="dropdown-item hover-focus" to="/logout">
                    <span>
                      <MdLogout></MdLogout>
                      <span className="ms-2">Logout</span>
                    </span>
                  </NavLink>
                </li>
                {/* )} */}
              </ul>
            </li>
            {/* )} */}
            <li className="nav-item d-flex align-items-center">
              <span
                className="ms-2 pointer nav-link"
                onClick={() => toggleTheme(!theme)}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={`Switch to ${nextTheme} theme`}
              >
                {theme && (
                  <ImSun className="text-warning h3 d-inline m-0 theme-toggle" />
                )}
                {!theme && (
                  <BsMoonStarsFill className="text-info h3 d-inline m-0 theme-toggle" />
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

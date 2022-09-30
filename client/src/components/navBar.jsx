import React, { useState } from "react";
import { ImSun } from "react-icons/im";
import { MdManageAccounts, MdLogin, MdLogout } from "react-icons/md";
import { FaAddressBook, FaRegUser } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function NavBar({ theme, toggleTheme, user }) {
  const nextTheme = theme ? "light" : "dark";
  const isAdmin = user && user.role === "admin";
  const isBank = user && user.role === "bank";
  const isWalletOwner = user && user.role === "wallet_owner";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom mb-5">
        <div className="container-fluid">
          {!user && (
            <a className="navbar-brand hover-focus" href="/">
              <img
                src={logo}
                alt="icon1"
                height="24"
                className="d-inline-block align-text-top"
              />

              <span className="ms-2">{process.env.REACT_APP_SITE_NAME}</span>
            </a>
          )}
          {isAdmin && (
            <a className="navbar-brand hover-focus" href="/issuer">
              <img
                src={logo}
                alt="icon1"
                height="24"
                className="d-inline-block align-text-top"
              />

              <span className="ms-2">{process.env.REACT_APP_SITE_NAME}</span>
            </a>
          )}
          {isBank && (
            <a className="navbar-brand hover-focus" href="/bank">
              <img
                src={logo}
                alt="icon1"
                height="24"
                className="d-inline-block align-text-top"
              />

              <span className="ms-2">{process.env.REACT_APP_SITE_NAME}</span>
            </a>
          )}
          {isWalletOwner && (
            <a className="navbar-brand hover-focus" href="/wallet_owner">
              <img
                src={logo}
                alt="icon1"
                height="24"
                className="d-inline-block align-text-top"
              />

              <span className="ms-2">{process.env.REACT_APP_SITE_NAME}</span>
            </a>
          )}
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
              {/* {!isAdmin && user && (
                <li className="nav-item">
                  <a className="nav-link hover-focus" href="#">
                    View Profile
                  </a>
                </li>
              )} */}

              {/* <li className="nav-item">
              <NavLink className="nav-link hover-focus" to="#">
                Request Digital Identity
              </NavLink>
            </li> */}
              <li className="nav-item">
                <a className="nav-link hover-focus" href="/contact-us">
                  Contact Us
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {!user && (
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
                      <a
                        className="dropdown-item hover-focus"
                        href="/register-user/"
                      >
                        Register as User
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item hover-focus"
                        href="/register-veri/"
                      >
                        Register as Verifier
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {!user && (
                <li className="nav-item d-flex align-items-center">
                  <a className="nav-link hover-focus" href="/login">
                    <span className="ms-2">
                      <MdLogin size={30} style={{ fill: "grey" }}></MdLogin>
                      <span className="ms-2">Login</span>
                    </span>
                  </a>
                </li>
              )}
              {user && (
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
                      <span className="dropdown-item">{`${user.email}`}</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {user && !isAdmin && (
                      <li>
                        <a
                          className="dropdown-item hover-focus"
                          // to={`/customers/${user._id}`}
                        >
                          <span>
                            <FaRegUser></FaRegUser>
                            <span className="ms-2">Profile</span>
                          </span>
                        </a>
                      </li>
                    )}
                    {user && (
                      <li>
                        <a className="dropdown-item hover-focus" href="\logout">
                          <span>
                            <MdLogout></MdLogout>
                            <span className="ms-2">Logout</span>
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              )}
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
      <Outlet></Outlet>
    </div>
  );
}

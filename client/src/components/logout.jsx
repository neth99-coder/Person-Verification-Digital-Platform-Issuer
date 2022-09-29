import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";

function Logout({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.getCurrentUser();

    auth.logoutUser();
    setUser(auth.getCurrentUser());
    navigate("/");
  }, []);
}

export default Logout;

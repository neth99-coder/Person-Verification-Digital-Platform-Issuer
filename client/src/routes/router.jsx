import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UsrReg from "../components/UsrReg";
import Home from "../views/Home/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

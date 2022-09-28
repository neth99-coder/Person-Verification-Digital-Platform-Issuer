import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UsrReg from "../views/Person/UsrReg";
import VerReg from "../views/Bank/VerReg";
import Home from "../views/Home/Home";
import IDListPage from "../views/Issuer/IDListPage";
import VerListPage from "../views/Issuer/VerListPage";
import IDReqViewPage from "../views/Issuer/IDReqViewPage";
import VerReqViewPage from "../views/Issuer/VerReqViewPage";
import IssuerDashboard from "../views/Issuer/IssuerDashboard";
import UserDashboard from "../views/Person/UserDashboard";
import VerifierDashboard from "../views/Bank/VerifierDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/id-requests" element={<IDListPage />}></Route>
        <Route path="/ver-requests" element={<VerListPage />}></Route>
        <Route path="/idreq" element={<IDReqViewPage />}></Route>
        <Route path="/verreq" element={<VerReqViewPage />}></Route>

        <Route path="/register-user" element={<UsrReg />}></Route>
        <Route path="/register-veri" element={<VerReg />}></Route>
        <Route path="/issuer" element={<IssuerDashboard />}></Route>
        <Route path="/user" element={<UserDashboard />}></Route>
        <Route path="/verifier" element={<VerifierDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

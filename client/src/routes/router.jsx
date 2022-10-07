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
import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import Login from "../components/login";
import Logout from "../components/logout";
import NavBar from "../components/navBar";
import ThemeSelector from "../components/themeSelector";
import { getTheme, saveTheme } from "../utils/theme";
import ROLE from "../utils/roles.json";
import ProtectedRoute from "../components/common/protectedRoute";
import NotFound from "../components/notFound";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ContactUs from "../components/ContactUs";

export default function AppRouter() {
  const [theme, setTheme] = useState(getTheme());
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getCurrentUser);
  }, []);
  return (
    <BrowserRouter>
      <ThemeSelector theme={theme} />
      <NavBar
        user={user}
        theme={theme}
        toggleTheme={(theme) => {
          setTheme(theme);
          saveTheme(theme);
        }}
      />
      <ToastContainer />
      <Routes>
        <Route path="/issuer">
          <Route
            index
            element={
              <ProtectedRoute permissions={[ROLE.ADMIN]}>
                <IssuerDashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="id-requests"
            element={
              <ProtectedRoute permissions={[ROLE.ADMIN]}>
                <IDListPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="id-requests/:id"
            element={
              <ProtectedRoute permissions={[ROLE.ADMIN]}>
                <IDReqViewPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="ver-requests"
            element={
              <ProtectedRoute permissions={[ROLE.ADMIN]}>
                <VerListPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="ver-requests/:id"
            element={
              <ProtectedRoute permissions={[ROLE.ADMIN]}>
                <VerReqViewPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="/wallet_owner">
          <Route
            index
            element={
              <ProtectedRoute permissions={[ROLE.WALLET_OWNER]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="/bank">
          <Route
            index
            element={
              <ProtectedRoute permissions={[ROLE.BANK]}>
                <VerifierDashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="/register-user" element={<UsrReg />}></Route>
        <Route path="/register-veri" element={<VerReg />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setUser={(user) => {
                setUser(user);
              }}
            />
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <Logout
              setUser={(user) => {
                setUser(user);
              }}
            />
          }
        ></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/router";
import { getTheme, saveTheme } from "./utils/theme";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Login from "./components/login";
import ThemeSelector from "./components/themeSelector";
import UsrReg from "./components/user/UsrReg";
import VerReg from "./components/verifier/VerReg";
import UserRequests from "./components/user/userRequests";
import VerifierRequests from "./components/verifier/verifierRequests";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from "./components/contactUs";

function App() {
  const [theme, setTheme] = useState(getTheme());
  const [user, setUser] = useState();

  useEffect(() => {
    // setUser(getCurrentUser());
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ThemeSelector theme={theme} />
      <NavBar
        theme={theme}
        toggleTheme={(theme) => {
          setTheme(theme);
          saveTheme(theme);
        }}
      />
      <ToastContainer />
      <Routes>
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/register-user" element={<UsrReg />}></Route>
        <Route path="/register-verifier" element={<VerReg />}></Route>
        <Route path="/requests-user" element={<UserRequests />}></Route>
        <Route path="/requests-verifier" element={<VerifierRequests />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
      </Routes>
    </div>
  );
}

export default App;

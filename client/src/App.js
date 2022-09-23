import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Login from "./components/login";
import ThemeSelector from "./components/themeSelector";
import AppRouter from "./routes/router";
import { getTheme, saveTheme } from "./utils/theme";
import { getCurrentUser } from "./services/authService";

function App() {
  const [theme, setTheme] = useState(getTheme());
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getCurrentUser());
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
      </Routes>
    </div>
  );
}

export default App;

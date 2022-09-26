import React, { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import ThemeSelector from "./components/themeSelector";
import AppRouter from "./routes/router";
import { getTheme, saveTheme } from "./utils/theme";

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
      <AppRouter />
    </div>
  );
}

export default App;

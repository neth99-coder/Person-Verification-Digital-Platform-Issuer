import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/navBar";
import Home from "./components/home";
import ThemeSelector from "./components/themeSelector";
import AppRouter from "./routes/router";
import { getTheme, saveTheme } from "./utils/theme";
import UsrReg from "./components/UsrReg";
import VerReg from "./components/VerReg";
import IssuerDashboard from "./components/IssuerDashboard";
import IDListPage from './components/IDListPage.jsx';
import VerListPage from './components/VerListPage.jsx';
import IDReqViewPage from "./components/IDReqViewPage";
import VerReqViewPage from "./components/VerReqViewPage";




function App() {
  const [theme, setTheme] = useState(getTheme());

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
        <Route path="/" element={<Home />}></Route>
        <Route path="/id-requests" element={<IDListPage />}></Route>
        <Route path="/ver-requests" element={<VerListPage />}></Route>
        <Route path="/idreq" element={<IDReqViewPage />}></Route>
        <Route path="/verreq" element={<VerReqViewPage />}></Route>



        <Route path="/register-user" element={<UsrReg />}></Route>
        <Route path="/register-veri" element={<VerReg />}></Route>
        <Route path="/issuer" element={<IssuerDashboard />}></Route>

      </Routes>
    </div>
  );
}

export default App;

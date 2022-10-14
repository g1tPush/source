import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import AccountActivationPage from "./pages/AccountActivationPage";
import LanguageSelector from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";
const logo = require("./assets/hoaxify.png");

const App = () => {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container pt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
        <LanguageSelector />
      </div>
    </BrowserRouter>
  );
};

export default App;

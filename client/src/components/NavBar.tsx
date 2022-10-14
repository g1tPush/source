import { useAppSelector, useAppDispatch } from "../features/hooks";
import { logout as logoutAct } from "../features/registration/registrationSlice";
import { Link } from "react-router-dom";
import { logout } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
const logo = require("../assets/hoaxify.png");

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  const onClickLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await logout();
      dispatch(logoutAct());
    } catch (e) {}
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/" title="Home">
          <img src={logo} alt="Hoaxify" width="60" />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" to="/signup">
                {t("signUp")}
              </Link>
              <Link className="nav-link" to="/login">
                {t("login")}
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <Link className="nav-link" to={`/user/${auth.id}`}>
                {t("myProfile")}
              </Link>
              <a href="/" className="nav-link" onClick={onClickLogout}>
                {t("logout")}
              </a>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

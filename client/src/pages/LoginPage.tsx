import { useState, useEffect } from "react";
import { login } from "../api/apiCalls";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import LanguageSelector from "../components/LanguageSelector";
import en from "../locale/en.json";
import tr from "../locale/tr.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useAppDispatch } from "../features/hooks";
import { login as loginAct } from "../features/registration/registrationSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  let disabled = !(email && password);
  const dispatch = useAppDispatch();

  const submit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setApiProgress(true);
    try {
      const response = await login({ email, password });
      navigate("/");
      dispatch(
        loginAct({ ...response.data, header: `Bearer ${response.data.token}` })
        // loginAct({ ...response.data })
      );
    } catch (e: any) {
      setFailMessage(e.response.data.message);
    }
    setApiProgress(false);
  };

  useEffect(() => {
    setFailMessage("");
  }, [email, password]);

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="login-page"
    >
      <form className="card">
        <div className="card-header">
          <h1 className="text-center">{t("login")}</h1>
        </div>
        <div className="card-body">
          <Input
            id="email"
            label={t("email")}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            label={t("password")}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {failMessage && <Alert type="danger">{failMessage}</Alert>}

          <div className="text-center">
            <ButtonWithProgress
              disabled={disabled}
              apiProgress={apiProgress}
              onClick={submit}
            >
              {t("login")}
            </ButtonWithProgress>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

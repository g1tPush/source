import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import { signUp } from "../api/apiCalls";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const SignUpPage = () => {
  const { t, i18n } = useTranslation();

  const [formState, setFormState] = useState({
    disabled: true,
    email: "",
    username: "",
    password: "",
    passwordRepeat: "",
    apiProgress: false,
    signUpSuccess: false,
    erros: {} as any,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorsCopy = { ...formState.erros };
    delete errorsCopy[name];

    setFormState({
      ...formState,
      [name]: value,
      erros: errorsCopy,
    });
  };

  useEffect(() => {
    const { password, passwordRepeat } = formState;
    if (password && passwordRepeat) {
      setFormState({
        ...formState,
        disabled: password !== passwordRepeat,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.password, formState.passwordRepeat]);

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { username, email, password } = formState;

    const body = {
      username,
      email,
      password,
    };

    setFormState({
      ...formState,
      apiProgress: true,
    });

    try {
      await signUp(body);
      setFormState({
        ...formState,
        signUpSuccess: true,
      });
    } catch (e: any) {
      if (e.response.status === 400) {
        setFormState({
          ...formState,
          erros: e.response.data.validationErrors,
          apiProgress: false,
        });
      }
    }
  };

  let errors = formState.erros;

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="signup-page"
    >
      {!formState.signUpSuccess && (
        <form className="card" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              onChange={changeHandler}
              help={errors.username}
            />
            <Input
              id="email"
              label={t("email")}
              onChange={changeHandler}
              help={errors.email}
            />
            <Input
              id="password"
              label={t("password")}
              onChange={changeHandler}
              help={errors.password}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              onChange={changeHandler}
              help={
                formState.password !== formState.passwordRepeat
                  ? t("passwordMismatchValidation")
                  : ""
              }
              type="password"
            />
            <div className="text-center">
              <button
                disabled={formState.disabled || formState.apiProgress}
                onClick={submit}
                className="btn btn-primary"
              >
                {formState.apiProgress && <Spinner />}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      )}
      {formState.signUpSuccess && (
        <Alert>Please check your e-mail to activate your account</Alert>
      )}
    </div>
  );
};

export default SignUpPage;

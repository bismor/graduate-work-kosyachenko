import React, { useEffect } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Login.css";
import Logo from "../ui/Logo/Logo";
import { Link } from "react-router-dom";

export default function Login({ signIn, errorRequest, setErrorRequest }) {
  const authEmailField = useFormWithValidation();
  const authPasswordField = useFormWithValidation();

  useEffect(() => {
    authEmailField.isValid
      ? authEmailField.setIsDirty(false)
      : authEmailField.setIsDirty(true);
  }, [authEmailField.value]);

  useEffect(() => {
    authPasswordField.isValid
      ? authPasswordField.setIsDirty(false)
      : authPasswordField.setIsDirty(true);
  }, [authPasswordField.value]);

  useEffect(() => {
    authEmailField.setIsDirty(false);
    authPasswordField.setIsDirty(false);
    setErrorRequest(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(authEmailField.value, authPasswordField.value);
  };

  return (
    <div className="login">
      <form className="login__form">
        <Logo />
        <h1 className="login__name">Рады видеть!</h1>
        <section className="login__section">
          <label className="login__label">
            E-mail
            <input
              name="email"
              type="email"
              placeholder="Введите Email"
              className={`login__input${
                authEmailField.isDirty ? " login__input_error" : ""
              }`}
              id="email"
              minLength="6"
              maxLength="30"
              onChange={(event) => {
                authEmailField.onChange(event, setErrorRequest);
              }}
            />
            <span
              className={`login__error${
                authEmailField.isDirty ? " login__error_active" : ""
              }`}
            >
              {authEmailField.isDirty ? authEmailField.isError : ""}
            </span>
          </label>
          <label className="login__label">
            Пароль
            <input
              name="password"
              type="password"
              placeholder="Введите пароль"
              id="password"
              minLength="6"
              maxLength="30"
              className={`login__input${
                authPasswordField.isDirty ? " login__input_error" : ""
              }`}
              onChange={(event) => {
                authPasswordField.onChange(event, setErrorRequest);
              }}
            />
            <span
              className={`login__error${
                authPasswordField.isDirty ? " login__error_active" : ""
              }`}
            >
              {authPasswordField.isDirty ? authPasswordField.isError : ""}
            </span>
          </label>
        </section>

        <div className="login__button-overlay">
          <span
            className={`login__error${
              errorRequest ? " login__error_active" : ""
            }`}
          >
            Ошибка при входе
          </span>
          <button
            className="login__submit"
            type="button"
            disabled={
              !(authEmailField.isValid && authPasswordField.isValid) ||
              errorRequest
            }
            onClick={handleSubmit}
          >
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

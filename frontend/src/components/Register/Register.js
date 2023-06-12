import React, { useEffect, useMemo } from "react";
import Logo from "../ui/Logo/Logo";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Register.css";

export default function Register({
  errorRequest,
  setErrorRequest,
  onRegister,
}) {
  const registerNameField = useFormWithValidation();
  const registerEmailField = useFormWithValidation();
  const registerPasswordField = useFormWithValidation();

  useEffect(() => {
    registerNameField.isValid
      ? registerNameField.setIsDirty(false)
      : registerNameField.setIsDirty(true);
  }, [registerNameField.value]);

  useEffect(() => {
    registerEmailField.isValid
      ? registerEmailField.setIsDirty(false)
      : registerEmailField.setIsDirty(true);
  }, [registerEmailField.value]);

  useEffect(() => {
    registerPasswordField.isValid
      ? registerPasswordField.setIsDirty(false)
      : registerPasswordField.setIsDirty(true);
  }, [registerPasswordField.value]);

  useEffect(() => {
    registerNameField.setIsDirty(false);
    registerEmailField.setIsDirty(false);
    registerPasswordField.setIsDirty(false);
    setErrorRequest(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(
      registerNameField.value,
      registerEmailField.value,
      registerPasswordField.value
    );
  };

  return (
    <div className="register">
      <form className="register__form">
        <Logo />
        <h1 className="register__name">Добро Пожаловать!</h1>
        <section className="register__section">
          <label className="register__label">
            {" "}
            Имя
            <input
              name="RegisterName"
              type="text"
              className={`register__input${
                registerNameField.isDirty ? " register__input_error" : ""
              }`}
              placeholder="Введите имя"
              required
              minLength="2"
              maxLength="30"
              autoComplete="new-password"
              onChange={(event) => {
                registerNameField.onChange(event, setErrorRequest);
              }}
            ></input>
            <span
              className={`register__error${
                registerNameField.isDirty ? " register__error_active" : ""
              }`}
            >
              {registerNameField.isDirty ? registerNameField.isError : ""}
            </span>
          </label>
          <label className="register__label">
            E-mail
            <input
              name="RegisterEmail"
              type="email"
              placeholder="Введите E-mail"
              id="email"
              required
              minLength="6"
              maxLength="30"
              className={`register__input${
                registerEmailField.isDirty ? " register__input_error" : ""
              }`}
              autoComplete="new-password"
              onChange={(event) => {
                registerEmailField.onChange(event, setErrorRequest);
              }}
            ></input>
            <span
              className={`register__error${
                registerEmailField.isDirty ? " register__error_active" : ""
              }`}
            >
              {registerEmailField.isDirty ? registerEmailField.isError : ""}
            </span>
          </label>
          <label className="register__label">
            Пароль
            <input
              name="RegisterPassword"
              type="password"
              placeholder="Введите пароль"
              id="password"
              required
              minLength="6"
              maxLength="30"
              autoComplete="new-password"
              className={`register__input${
                registerPasswordField.isDirty ? " register__input_error" : ""
              }`}
              onChange={(event) => {
                registerPasswordField.onChange(event, setErrorRequest);
              }}
            ></input>
            <span
              className={`register__error${
                registerPasswordField.isDirty ? " register__error_active" : ""
              }`}
            >
              {registerPasswordField.isDirty
                ? registerPasswordField.isError
                : ""}
            </span>
          </label>
        </section>

        <div className="register__button-overlay">
          <span
            className={`register__error${
              errorRequest ? " register__error_active" : ""
            }`}
          >
            Ошибка при регистрации
          </span>
          <button
            className="register__submit"
            type="button"
            aria-label="Авторизоваться"
            onClick={handleSubmit}
            disabled={
              !(
                registerNameField.isValid &&
                registerEmailField.isValid &&
                registerPasswordField.isValid
              ) || errorRequest
            }
          >
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрировались?{" "}
            <Link to="/signin" className="register__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

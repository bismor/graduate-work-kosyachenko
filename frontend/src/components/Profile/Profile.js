import "./Profile.css";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  loggedIn,
  onLogout,
  isHamburger,
  setIsHamburger,
  onHandleHamburger,
  errorRequest,
  successRequest,
  setErrorRequest,
  onUpdateProfile,
}) {
  let currentUser = React.useContext(CurrentUserContext);

  const profileNameField = useFormWithValidation();
  const profileEmailField = useFormWithValidation();
  const [dirtyBtn, setDirtyBtn] = useState(true);

  useEffect(() => {
    profileNameField.isValid
      ? profileNameField.setIsDirty(false)
      : profileNameField.setIsDirty(true);
  }, [profileNameField.isValid]);

  useEffect(() => {
    profileEmailField.isValid
      ? profileEmailField.setIsDirty(false)
      : profileEmailField.setIsDirty(true);
  }, [profileEmailField.isValid]);

  useEffect(() => {
    console.log("currentUser", currentUser);
    profileNameField.setValue(currentUser.name);
    profileEmailField.setValue(currentUser.email);
    profileNameField.setIsDirty(false);
    profileEmailField.setIsDirty(false);
    profileEmailField.setIsValid(true);
    profileNameField.setIsValid(true);
  }, []);

  function handleLogout() {
    onLogout();
  }

  function handleSubmit() {
    setDirtyBtn(true);

    onUpdateProfile(profileNameField.value, profileEmailField.value);
  }

  function validateBtn() {
    console.log(dirtyBtn);
    return (
      !(profileNameField.isValid && profileEmailField.isValid) ||
      errorRequest ||
      dirtyBtn ||
      (profileNameField.value === currentUser.name &&
        profileEmailField.value === currentUser.email) ||
      profileNameField.value === "" ||
      profileEmailField.value === ""
    );
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <div className="profile">
        <form className="prfile__form">
          <h2 className="profile__heading">{`Привет, ${currentUser.name}!`}</h2>
          <section>
            <label className="profile__info profile__info_underline">
              Имя
              <input
                value={profileNameField.value || ""}
                type="text"
                className={`profile__input form__input_type_profile${
                  profileNameField.isDirty ? " form__input_invalid" : ""
                }`}
                placeholder="Введите имя"
                id="name"
                minLength="2"
                maxLength="30"
                onChange={(event) => {
                  profileNameField.onChange(
                    event,
                    setErrorRequest,
                    setDirtyBtn(false)
                  );
                }}
              />
            </label>
            <label className="profile__info">
              E-mail
              <input
                type="email"
                className={`profile__input form__input_type_profile${
                  profileEmailField.isDirty ? " form__input_invalid" : ""
                }`}
                placeholder="Введите E-mail"
                id="email"
                minLength="6"
                maxLength="30"
                value={profileEmailField.value || ""}
                onChange={(event) => {
                  profileEmailField.onChange(
                    event,
                    setErrorRequest,
                    setDirtyBtn(false)
                  );
                }}
              />
            </label>
            <div className="profile__button">
              <span
                className={`profile__request${
                  errorRequest
                    ? " profile__request_error"
                    : successRequest
                    ? " profile__request_success "
                    : ""
                }`}
              >
                {errorRequest
                  ? "Некорректные данные"
                  : setTimeout(() => successRequest)
                  ? "Данные успешно обновлены"
                  : ""}
              </span>
              <button
                className="profile__edit"
                disabled={validateBtn()}
                onClick={handleSubmit}
              >
                Редактировать
              </button>
              <button
                className="profile__signout"
                type="button"
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

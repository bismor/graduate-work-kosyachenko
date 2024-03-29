import "./AuthMobile.css";
import { NavLink } from "react-router-dom";

export default function AuthMobile({
  isHamburger,
  setIsHamburger,
  onHandleHamburger,
}) {
  return (
    <div className={`auth-mobile${isHamburger ? ` auth-mobile_opened` : ""}`}>
      <div className="auth-mobile__container">
        <button className="auth-mobile__close" onClick={onHandleHamburger} />
        <ul className="auth-mobile__navigation">
          <li className="auth-mobile__list-item">
            <NavLink
              to="/"
              className="auth-mobile__link"
              onClick={() => setTimeout(() => setIsHamburger(false))}
            >
              Главная
            </NavLink>
          </li>
          <li className="auth-mobile__list-item">
            <NavLink
              to="/movies"
              className="auth-mobile__link"
              onClick={() => setTimeout(() => setIsHamburger(false))}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="auth-mobile__list-item">
            <NavLink
              to="/saved-movies"
              className="auth-mobile__link"
              onClick={() => setTimeout(() => setIsHamburger(false))}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="auth-mobile__container">
        <NavLink
          to="/profile"
          title="Аккаунт"
          className="auth-mobile__link auth-mobile__link_type_account"
          onClick={() => setTimeout(() => setIsHamburger(false))}
        >
          <p className="auth-mobile__account">Аккаунт</p>
        </NavLink>
      </div>
    </div>
  );
}

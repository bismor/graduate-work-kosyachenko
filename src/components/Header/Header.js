import "./Header.css";
import Logo from "../ui/Logo/Logo";
import { Link } from "react-router-dom";
import AuthMobile from "../AuthMobile/AuthMobile";
import Navigation from "../Navigation/Navigation";
import Hamburger from "../ui/Hamburger/Hamburger";

export default function Header({
  loggedIn,
  isHamburger,
  setIsHamburger,
  onHandleHamburger,
}) {

  console.log(loggedIn)
  return (
    <>
      {loggedIn ? (
        <AuthMobile
          isHamburger={isHamburger}
          setIsHamburger={setIsHamburger}
          onHandleHamburger={onHandleHamburger}
        />
      ) : null}
      <header className="header">
        <Logo />
        {loggedIn ? (
          <>
            <Hamburger onHandleHamburger={onHandleHamburger} />
            <Navigation />
            <Link
              to="/profile"
              title="Аккаунт"
              className="header__link header__link_type_account"
            >
              <p className="header__account">Аккаунт</p>
              <span className="header__image" />
            </Link>
          </>
        ) : (
          <div className="header__sign">
            <Link to="/signup" title="Регистрация" className="header__link">
              Регистрация
            </Link>
            <Link
              to="/signin"
              title="Войти"
              className="header__link header__link_type_signin"
            >
              Войти
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

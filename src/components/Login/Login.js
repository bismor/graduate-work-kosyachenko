import './Login.css';
import Logo from "../ui/Logo/Logo"
import { Link } from "react-router-dom";

export default function Login({signIn}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn()
  };

  return (
    <div className="login">
      <Logo/>
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__name">Рады видеть!</h1>
        <section className="login__section">
          <label className="login__label">E-mail
            <input
              name="email"
              type="email"
              className="login__input"
            ></input>
          </label>
          <label className="login__label">Пароль
            <input
              name="password"
              type="password"
              className="login__input"
            ></input>
          </label>
        </section>
        <button className="login__submit">Войти</button>
        <p className="login__text">
          Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </form>
    </div>
  )
}
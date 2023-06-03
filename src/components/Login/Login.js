import './Login.css';
import Logo from "../ui/Logo/Logo"
import { Link, useNavigate } from "react-router-dom";

export default function Login({setloggedIn}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setloggedIn(true);
    navigate("/profile", { replace: true });
  };



  return (
    <div className="login">
      <Logo/>
      <h1 className="login__name">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
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
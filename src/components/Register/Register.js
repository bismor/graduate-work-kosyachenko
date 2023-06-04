import Logo from "../ui/Logo/Logo"
import { Link, useNavigate } from "react-router-dom"
import  "./Register.css"

export default function Register({setloggedIn}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setloggedIn(true);
    navigate("/profile", { replace: true });
  };

  return (
    <div className="register">
      <Logo/>
      <h1 className="register__name">Добро Пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <section className="register__section">
          <label className="register__label"> Имя
            <input
              name="name"
              type="name"
              className="register__input"
              placeholder="Виталий"
            ></input>
          </label>
          <label className="register__label">E-mail
            <input
              name="email"
              type="email"
              className="register__input"
            ></input>
          </label>
          <label className="register__label">Пароль
            <input
              name="password"
              type="password"
              className="register__input register__input_error"
            ></input>
            <span className="register__error register__error_active">Что-то пошло нетак...</span>
          </label>
        </section>
        <button className="register__submit">Зарегистрироваться</button>
        <p className="register__text">
          Уже зарегистрировались? <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </form>
    </div>
  )
}
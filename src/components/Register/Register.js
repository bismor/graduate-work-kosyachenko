import Logo from "../ui/Logo/Logo"
import { Link } from "react-router-dom"
import  "./Register.css"

export default function Register() {
  return (
    <div className="authorization">
      <Logo/>
      <h1 className="authorization__name">Добро Пожаловать!</h1>
      <form className="authorization__form">
        <section className="authorization__section">
          <label className="authorization__label"> Имя
            <input
              name="name"
              type="name"
              className="authorization__input"
              placeholder="Виталий"
            ></input>
          </label>
          <label className="authorization__label">E-mail
            <input
              name="email"
              type="email"
              className="authorization__input"
            ></input>
          </label>
          <label className="authorization__label">Пароль
            <input
              name="password"
              type="password"
              className="authorization__input authorization__input_error"
            ></input>
            <span className="authorization__error authorization__error_active">Что-то пошло нетак...</span>
          </label>
        </section>
        <button className="authorization__submit">Зарегистрироваться</button>
        <p className="authorization__text">
          Уже зарегистрировались? <Link to="/signin" className="authorization__link">Войти</Link>
        </p>
      </form>
    </div>
  )
}
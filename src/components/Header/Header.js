import './Header.css';
import Logo from "../ui/Logo/Logo";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <>
    <header className='header'>
      <Logo />
      <div className='header__sign'>
        <Link to='/signup' title='Регистрация' className='header__link'>Регистрация</Link>
        <Link to='/signin' title='Войти' className='header__link header__link_type_signin'>Войти</Link>
      </div>
    </header>
    </>
  );
}
import './Profile.css'
import Header from '../Header/Header'
import { useNavigate } from "react-router-dom";

export default function Profile({setloggedIn}) {
  const navigate = useNavigate();
  function handleLogout() {
    setloggedIn(false)
    navigate("/", { replace: true });
  } 

  return (
    <>
      <Header/>
      <div className='profile'>
          <h2 className='profile__heading'>Привет, Виталий!</h2>
          <div className='profile__info profile__info_underline'>
            <h3 className='profile__field'>Имя</h3>
            <p className='profile__user'>Виталий</p>
          </div>
          <div className='profile__info'>
            <h3 className='profile__field'>E-mail</h3>
            <p className='profile__user'>pochta@yandex.ru</p>
          </div>
        <div className='profile__button'>
          <button className='profile__edit'>Редактировать</button>
          <button className='profile__signout' onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </div>
    </>
  )
}
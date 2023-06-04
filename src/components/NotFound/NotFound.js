import './NotFound.css'
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/profile", { replace: true });
  }

  return (
    <div className='notFound'>
      <h1 className='notFound__title'>404</h1>
      <p className='notFound__text'> Страница не найдена</p>
      <button
        aria-label='Назад'
        className='notFound__goBack'
        onClick={handleGoBack}
      >Назад</button>
    </div>
  )
}
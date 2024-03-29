import { Link } from 'react-router-dom';
import './Promo.css';
import landingLlogo from "../../images/landing-logo.png"

export default function Promo() {
  return (
    <section className='promo'>
      <img src={landingLlogo} className='promo__logo' alt='Логотип Земли'/>
      <div className='promo__description'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <Link to="#AboutProject" className='promo__link' title='Узнать больше'>Узнать больше</Link>

    </section>
  )
}
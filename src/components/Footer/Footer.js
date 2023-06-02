import './Footer.css';

export default function Footer() {

  return (
    <footer className='footer'>
      <h2 className='footer__title'>Яндекс.Практикум х BeatFilm</h2>
      <div className='footer__container'>
        <p className='footer__text'>&copy; 2023</p>
        <div className='footer__container-link'>
            <a href='https://practicum.yandex.ru/' title='Практикум' className='footer__link'>Яндекс.Практикум</a>
            <a href='https://github.com/Hotess' title='Github' className='footer__link'>Github</a>
        </div>
      </div>
    </footer>
  );
}
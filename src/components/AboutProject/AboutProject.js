import "./AboutProject.css";
import arrow from "../../images/arrow.svg"

export default function AboutProject() {
  return (
    <section className="aboutproject">
      <h2 className="aboutproject__title">Студент</h2>
      <div className="aboutproject_about">
        <div className="aboutproject__bio">
          <h3 className="aboutproject__heading">Владислав</h3>
          <h4 className="aboutproject__profession">Фронтенд-разработчик, 25 лет</h4>
          <p className="aboutproject__text">
            Я родился и живу в Королеве. Закончил МЭИ, факультет электроэнергетики и электротехники.
            Я люблю слушать музыку и моделировать игровые интерьеры.
            С 2017 начал администировать игровой проект на языке Lua.
            После этого прошел курс по веб-разработке и сейчас в активном поиске работы.
          </p>
          <a href="https://github.com/bismor" target="_blank" rel="noreferrer" title='GitHub' className='aboutproject__git'>GitHub</a>
        </div>
        <div className="aboutproject__image"></div>
      </div>
      <h2 className="aboutproject__portfolio">Портфолио</h2>
      <div className="aboutproject__container">
        <div className="aboutproject__container-link">
          <a href="https://github.com/bismor" target="_blank" rel="noreferrer" title='Статичный сайт' className='aboutproject__link'>Статичный сайт</a>
          <img src={arrow} className="aboutproject__arrow" alt='Стрелочка'/>
        </div>
        <div className="aboutproject__container-link">
          <a href="https://github.com/bismor" target="_blank" rel="noreferrer" title='Адаптивный сайт' className='aboutproject__link'>Адаптивный сайт</a>
          <img src={arrow} className="aboutproject__arrow" alt='Стрелочка'/>
        </div>
        <div className="aboutproject__container-link aboutproject__link-none">
          <a href="https://github.com/bismor" target="_blank" rel="noreferrer" title='Одностраничное приложение' className='aboutproject__link'>Одностраничное приложение</a>
          <img src={arrow} className="aboutproject__arrow" alt='Стрелочка'/>
        </div>
      </div>
    </section>
  );
}

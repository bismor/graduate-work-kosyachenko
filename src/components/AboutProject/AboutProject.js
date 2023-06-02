import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="aboutproject">
      <h2 className="aboutproject__title">Студент</h2>
      <div className="aboutproject_about">
        <div className="aboutproject__bio">
          <h3>Владислав</h3>
          <h4>Фронтенд-разработчик, 25 лет</h4>
          <p>
            Я родился и живу в Королеве. Закончил МЭИ, факультет
            электроэнергетики и электротехники.
          </p>
          <div className="aboutproject__git">
          <a href="https://github.com/bismor" title='GitHub' className='aboutMe__link'>GitHub</a>
          </div>
        </div>
        <div className="aboutproject__image"></div>
      </div>
    </section>
  );
}

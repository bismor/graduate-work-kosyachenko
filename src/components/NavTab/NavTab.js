import "./NavTab.css";

export default function NavTab() {
  return (
    <section className="navtab">
      <h2 className="navtab__title">О проекте</h2>
      <div className="navtab__infromation">
        <div className="navtab__description">
          <h3 className="navtab__heading">Дипломный проект включал 5 этапов</h3>
          <p className="navtab__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="navtab__description">
          <h3 className="navtab__heading">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="navtab__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="navtab__time">
        <div className="navtab__week">
          <h3 className="navtab__backend">1 неделя</h3>
          <p className="navtab__systemname">Back-end</p>
        </div>
        <div className="navtab__week">
          <h3 className="navtab__frontend">4 недели</h3>
          <p className="navtab__systemname">Front-end</p>
        </div>
      </div>
    </section>
  );
}

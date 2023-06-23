import './Techs.css';

export default function Techs() {
  return (
    <section className='techs'>
      <h2 className="techs__title">Технологии</h2>
      <div className='techs__container'>
        <h3 className='techs__heading'>7 технологий</h3>
        <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='techs__technology'>
          <a href='https://webref.ru/html'  target="_blank" rel="noreferrer" title='webref.ru/html' className='techs__cell'>HTML</a>
          <a href='https://webref.ru/css' target="_blank" rel="noreferrer" title='webref.ru/css' className='techs__cell'>CSS</a>
          <a href='https://learn.javascript.ru' target="_blank" rel="noreferrer" title='learn.javascript.ru' className='techs__cell'>JS</a>
          <a href='https://ru.reactjs.org' target="_blank" rel="noreferrer" title='ru.reactjs.org' className='techs__cell'>React</a>
          <a href='https://git-scm.com' target="_blank" rel="noreferrer" title='git-scm.com' className='techs__cell'>Git</a>
          <a href='https://expressjs.com' target="_blank" rel="noreferrer" title='expressjs.com' className='techs__cell'>Express.js</a>
          <a href='https://www.mongodb.com' target="_blank" rel="noreferrer" title='mongodb.com' className='techs__cell'>mongoDB</a>
        </div>
      </div>
    </section>
  )
}
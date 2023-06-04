import "./MoviesCard.css"
import video from "../../images/video.png"

export default function MoviesCard() {
  return (
    <>
      <article className='movies__cell'>
        <a href="https://youtu.be/0bWUPgK-lt0" title="33 слова о дизайне" className='movies__link'>
            <img src={video} alt="видео" className='movies__image'/>
        </a>
        <div className='movies__block'>
            <a href="https://youtu.be/0bWUPgK-lt0" title="33 слова о дизайне" className='movies__link'>
                <h2 className='movies__heading'>33 слова о дизайне</h2>
            </a>
            <button
                className={`movies__button movies__button_saved`}
            />
        </div>
        <p className='movies__duration'>1ч42мс</p>
      </article>
      <article className='movies__cell'>
        <a href="https://youtu.be/0bWUPgK-lt0" title="33 слова о дизайне" className='movies__link'>
            <img src={video} alt="видео" className='movies__image'/>
        </a>
        <div className='movies__block'>
            <a href="https://youtu.be/0bWUPgK-lt0" title="33 слова о дизайне" className='movies__link'>
                <h2 className='movies__heading'>33 слова о дизайне</h2>
            </a>
                <button
                    className={`movies__button movies__button_saved`}
                />
        </div>
        <p className='movies__duration'>1ч42мс</p>
      </article>
    </>
  )
}
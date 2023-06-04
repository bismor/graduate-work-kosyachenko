import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {
  return (
    <>
      <div className='moviescardlist__table'>
        <MoviesCard/>
      </div>
      <div className='moviescardlist__button-overlay'>
        <button
          className='moviescardlist__still'
        >Ещё</button>
      </div>
    </>
  )
}
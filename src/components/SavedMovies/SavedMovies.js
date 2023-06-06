import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

export default function SavedMovies({loggedIn, isHamburger, setIsHamburger, onHandleHamburger}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <SearchForm/>
      <section className='movies'>
        <MoviesCardList/>
      </section>
      <Footer/>
    </>
  )
}
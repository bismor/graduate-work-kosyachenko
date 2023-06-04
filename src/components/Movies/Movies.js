import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({loggedIn, isHamburger, setIsHamburger, onHandleHamburger}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <SearchForm/>
      <>
        <section className='movies'>
            <MoviesCardList/>
        </section>
      </>
    </>
  )
}
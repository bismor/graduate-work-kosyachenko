import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

export default function SavedMovies({
  loggedIn,
  isHamburger,
  setIsHamburger,
  onHandleHamburger,
  movies,
  savedMovies,
  isPreloader,
  onSearchSubmit,
  onDeleteSavedMovie,
  isOnlyShorts,
  setIsOnlyShorts,
  searchedMoviesInput,
  setSearchedMoviesInput,
}) {
  const [countMovies, setCountMovies] = useState(0);
  /** Удаление сохранённого фильма */
  function handleSavedMovie(movie) {
    if (movies.some((item) => item.id === +movie.movieId))
      onDeleteSavedMovie(movie);
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <SearchForm
        onSearchSubmit={onSearchSubmit}
        isOnlyShorts={isOnlyShorts}
        setIsOnlyShorts={setIsOnlyShorts}
        searchedMoviesInput={searchedMoviesInput}
        setSearchedMoviesInput={setSearchedMoviesInput}
      />
      {isPreloader ? (
        <div className="container">
          <Preloader />
        </div>
      ) : savedMovies.length > 0 ? (
        <section className="movies">
          <MoviesCardList
            movies={savedMovies}
            count={{ countMovies, setCountMovies }}
            pathSavedMovie={true}
            handleSavedMovie={handleSavedMovie}
          />
        </section>
      ) : (
        <h2 className="movies__title">Нет сохранённых фильмов</h2>
      )}
      <Footer />
    </>
  );
}

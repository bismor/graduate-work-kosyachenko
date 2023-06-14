import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React, { useState } from "react";

export default function Movies({
  loggedIn,
  movies,
  savedMovies,
  isHamburger,
  setIsHamburger,
  isPreloader,
  isSavedMovie,
  findMovies,
  onHandleHamburger,
  isShortMovies,
  onSearchSubmit,
  onSearchShortMovies,
  onSaveMovie,
  onDeleteSavedMovie,
}) {
  const [countMovies, setCountMovies] = useState(0);

  /** Удаление сохранённого фильма */
  const handleSavedMovie = function (movie) {
    savedMovies.forEach((item) => {
      if (+item.movieId === movie.id) onDeleteSavedMovie(item);
    });
  };

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
        onHandleHamburger={onHandleHamburger}
      />
      <SearchForm
        isShortMovies={isShortMovies}
        onSearchSubmit={onSearchSubmit}
        onSearchShortMovies={onSearchShortMovies}
      />
      {isPreloader ? (
        <div className="container">
          <Preloader />
        </div>
      ) : findMovies ? (
        <>
          <section className="movies">
            <MoviesCardList
              movies={movies}
              count={{ countMovies, setCountMovies }}
              handleSavedMovie={{ onSaveMovie, handleSavedMovie }}
              isSavedMovie={isSavedMovie}
            />
          </section>
        </>
      ) : (
        <h2 className="movies__title">Нет фильмов</h2>
      )}
      <Footer />
    </>
  );
}

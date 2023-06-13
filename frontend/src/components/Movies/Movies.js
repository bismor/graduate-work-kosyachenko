import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
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
      <>
        <section className="movies">
          <MoviesCardList />
        </section>
      </>
      <Footer />
    </>
  );
}

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useEffect, useState } from "react";

export default function MoviesCardList({
  movies,
  countMovies,
  setCountMovies,
  onSaveMovie,
  handleSavedMovie,
  isSavedMovie,
  pathSavedMovie = false,
}) {
  const [addMoreCards, setAddMoreCards] = useState(0);
  const addMoreMovies = () => {
    setCountMovies(countMovies + addMoreCards);
  };
  const displayWidthCheck = () => {
    const display = window.innerWidth;
    if (display > 900) {
      setCountMovies(12);
      setAddMoreCards(3);
    } else if (display > 750) {
      setCountMovies(8);
      setAddMoreCards(2);
    } else if (display < 750) {
      setCountMovies(5);
      setAddMoreCards(2);
    }
  };

  useEffect(() => {
    displayWidthCheck();
  }, []);

  return (
    <div className="moviescardlist">
      <div className="moviescardlist__table">
        {movies.slice(0, countMovies).map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movies={movie}
              pathSavedMovie={pathSavedMovie}
              isSavedMovie={isSavedMovie}
              onSaveMovie={onSaveMovie}
              handleSavedMovie={handleSavedMovie}
            />
          );
        })}
      </div>
      {movies.length > countMovies || movies.length < !3 ? (
        <div className="moviescardlist__button-overlay">
          <button className="moviescardlist__still" onClick={addMoreMovies}>
            Ещё
          </button>
        </div>
      ) : null}
    </div>
  );
}

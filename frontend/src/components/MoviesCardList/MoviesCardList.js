import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useEffect, useState, useCallback } from "react";

export default function MoviesCardList({
  movies,
  handleSavedMovie,
  pathSavedMovie = false,
  count,
  isSavedMovie,
}) {
  const [addMoreCards, setAddMoreCards] = useState(0);
  const addMoreMovies = () => {
    count.setCountMovies(count.countMovies + addMoreCards);
  };

  const displayWidthCheck = useCallback(() => {
    const display = window.innerWidth;
    if (display > 1079) {
      count.setCountMovies(12);
      setAddMoreCards(3);
    } else if (display > 750) {
      count.setCountMovies(8);
      setAddMoreCards(2);
    } else if (display < 750) {
      count.setCountMovies(5);
      setAddMoreCards(2);
    }
  }, [count]);

  useEffect(() => {
    displayWidthCheck();
  }, []);

  return (
    <div className="moviescardlist">
      <div className="moviescardlist__table">
        {movies.slice(0, count.countMovies).map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              pathSavedMovie={pathSavedMovie}
              isSavedMovie={isSavedMovie}
              handleSavedMovie={handleSavedMovie}
            />
          );
        })}
      </div>
      {movies.length > count.countMovies || movies.length < !3 ? (
        <div className="moviescardlist__button-overlay">
          <button className="moviescardlist__still" onClick={addMoreMovies}>
            Ещё
          </button>
        </div>
      ) : null}
    </div>
  );
}

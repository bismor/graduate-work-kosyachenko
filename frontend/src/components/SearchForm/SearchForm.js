import "./SearchForm.css";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";

export default function SearchForm({
  onSearchSubmit,
  isOnlyShorts,
  setIsOnlyShorts,
  movieInput,
}) {
  const [searchedMovies, setSearchedMovies] = useState("");

  const location = useLocation();
  const handleToggleShort = useCallback(() => {
    const newState = !isOnlyShorts;

    setIsOnlyShorts(newState);
    onSearchSubmit(searchedMovies, newState);

    if (location.pathname === "/movies") {
      localStorage.setItem("MoviesOnlyShorts", newState);
    } else {
      localStorage.setItem("SaveMoviesOnlyShorts", newState);
    }
  }, [isOnlyShorts]);

  function handleSearchMovie(event) {
    event.preventDefault();

    onSearchSubmit(searchedMovies, isOnlyShorts);
  }

  return (
    <form className="form-search">
      <div className="form-search__container">
        <input
          type="search"
          placeholder="Поиск"
          className="form-search__input"
          value={movieInput}
          onInput={(event) => setSearchedMovies(event.target.value)}
        />
        <button
          type="button"
          aria-label="Поиск"
          className="form-search__magnifier"
          onClick={(event) => handleSearchMovie(event)}
        />
      </div>
      <div className="form-search__toggle">
        <span className="form-search__text">Короткометражки</span>
        <button
          type="button"
          aria-label="Искать короткометражки"
          className={`toggle ${isOnlyShorts ? "toggle_active" : ""} `}
          onClick={handleToggleShort}
        >
          <span
            className={`toggle__turn ${
              isOnlyShorts ? "toggle__turn_active" : ""
            }`}
          ></span>
        </button>
      </div>
    </form>
  );
}

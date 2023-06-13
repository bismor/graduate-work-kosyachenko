import "./SearchForm.css";
import React, { useState, useEffect } from "react";

export default function SearchForm({
  isShortMovies,
  onSearchSubmit,
  onSearchShortMovies,
}) {
  const [searchedMovies, setSearchedMovies] = useState("");
  function handleSearchMovie(event) {
    event.preventDefault();

    onSearchSubmit(searchedMovies);
  }

  useEffect(() => {
    onSearchSubmit(searchedMovies);
  }, [isShortMovies]);

  return (
    <form className="form-search">
      <div className="form-search__container">
        <input
          type="search"
          placeholder="Поиск"
          className="form-search__input"
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
          className={`toggle ${isShortMovies ? "toggle_active" : ""} `}
          onClick={onSearchShortMovies}
        >
          <span
            className={`toggle__turn ${
              isShortMovies ? "toggle__turn_active" : ""
            }`}
          ></span>
        </button>
      </div>
    </form>
  );
}

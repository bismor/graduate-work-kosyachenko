import "./SearchForm.css";
import React, { useCallback, useState } from "react";

export default function SearchForm({
  onSearchSubmit,
  isOnlyShorts,
  setIsOnlyShorts,
  searchedMoviesInput,
  setSearchedMoviesInput,
}) {
  const [localSearchedMoviesInput, setLocalSearchedMoviesInput] =
    useState(searchedMoviesInput);

  const handleToggleShort = useCallback(() => {
    const newState = !isOnlyShorts;

    setIsOnlyShorts(newState);
    onSearchSubmit(searchedMoviesInput, newState);
  }, [isOnlyShorts, setIsOnlyShorts, onSearchSubmit, searchedMoviesInput]);

  function handleSearchMovie(event) {
    event.preventDefault();

    onSearchSubmit(localSearchedMoviesInput, isOnlyShorts);
  }

  return (
    <form className="form-search">
      <div className="form-search__container">
        <input
          type="search"
          placeholder="Поиск"
          className="form-search__input"
          value={localSearchedMoviesInput || ""}
          onInput={(event) => setLocalSearchedMoviesInput(event.target.value)}
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

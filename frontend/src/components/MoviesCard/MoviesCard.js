import "./MoviesCard.css";

export default function MoviesCard({
  movies,
  pathSavedMovie,
  isSavedMovie,
  onSaveMovie,
  handleSavedMovie,
}) {
  const timeFormat = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${min}м`;
  };
  return (
    <>
      <article className="movies__cell">
        <a
          href={movies.trailerLink}
          target="_blank"
          rel="noreferrer"
          title={movies.trailerLink}
          className="movies__link"
        >
          <img
            src={
              movies.image.url
                ? `https://api.nomoreparties.co${movies.image.url}`
                : movies.image
            }
            alt={movies.nameRU}
            className="movies__image"
          />
        </a>
        <div className="movies__block">
          <a
            href={movies.trailerLink}
            title={movies.trailerLink}
            target="_blank"
            rel="noreferrer"
            className="movies__link"
          >
            <h2 className="movies__heading">{movies.nameRU}</h2>
          </a>
          {pathSavedMovie ? (
            <button
              className={`movies__button movies__button_delete`}
              onClick={() => {
                handleSavedMovie(movies);
                onSaveMovie(movies);
              }}
            />
          ) : (
            <button
              className={`movies__button${
                isSavedMovie(movies)
                  ? " movies__button_saved"
                  : " movies__button_not-saved"
              }`}
              onClick={
                isSavedMovie(movies)
                  ? () => handleSavedMovie(movies)
                  : () => onSaveMovie(movies)
              }
            />
          )}
        </div>
        <p className="movies__duration">{`${timeFormat(movies.duration)}`}</p>
      </article>
    </>
  );
}

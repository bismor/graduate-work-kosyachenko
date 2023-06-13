import "./MoviesCard.css";
import video from "../../images/video.png";

export default function MoviesCard(
  movie,
  pathSavedMovie,
  isSavedMovie,
  onSaveMovie,
  handleSavedMovie
) {
  const timeFormat = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${min}м`;
  };
  return (
    <>
      <article className="movies__cell">
        <a
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
          title={movie.trailerLink}
          className="movies__link"
        >
          <img
            src={
              movie.image.url
                ? `https://api.nomoreparties.co${movie.image.url}`
                : movie.image
            }
            alt={movie.nameRU}
            className="movies__image"
          />
        </a>
        <div className="movies__block">
          <a
            href={movie.trailerLink}
            title={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
            className="movies__link"
          >
            <h2 className="movies__heading">{movie.nameRU}</h2>
          </a>
          {pathSavedMovie ? (
            <button
              className={`movies__button movies__button_delete`}
              onClick={() => {
                handleSavedMovie(movie);
                onSaveMovie(movie);
              }}
            />
          ) : (
            <button
              className={`movies__button${
                isSavedMovie(movie)
                  ? " movies__button_saved"
                  : " movies__button_not-saved"
              }`}
              onClick={
                isSavedMovie(movie)
                  ? () => handleSavedMovie(movie)
                  : () => handleSavedMovie(movie)
              }
            />
          )}
        </div>
        <p className="movies__duration">{`${timeFormat(movie.duration)}`}</p>
      </article>
    </>
  );
}

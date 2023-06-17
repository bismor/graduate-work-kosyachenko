import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import mainApi from "../utils/Api/MainApi";
import moviesApi from "../utils/Api/MoviesApi";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [moviesSource, setMoviesSource] = useState();
  const [savedMoviesSource, setSavedMoviesSource] = useState();

  const [loggedIn, setloggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);
  const [isOnlyShorts, setIsOnlyShorts] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi.changeAuthToken(token);
        mainApi
          .checkJwtToken(token)
          .then((res) => {
            setCurrentUser(res.data);
            setloggedIn(true);
          })
          .catch((err) => {
            setloggedIn(false);
            localStorage.removeItem("token");
            navigate("/", { replace: true });
            console.log(`Ошибка токена: ${err}`); // выведем ошибку в консоль
          });
      }
    }
  }, [navigate]);

  /** Открыть/закрыть гамбургер */
  function onHandleHamburger() {
    setIsHamburger(!isHamburger);
  }

  function onRegister(name, email, password) {
    mainApi
      .signUp(name, email, password)
      .then(() => {
        signIn(email, password);
      })
      .catch((err) => {
        setErrorRequest(true);

        console.log(`Ошибка при регистрации: ${err}`);
      });
  }

  function signIn(email, password) {
    mainApi
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setloggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorRequest(true);

        console.log(`Ошибка при авторизации: ${err}`);
      });
  }

  /** Получить все фильмы с сервера */
  useEffect(() => {
    let timeoutId;
    if (loggedIn && location.pathname === "/movies") {
      setIsPreloader(true);

      moviesApi
        .getInitialMovie()
        .then((res) => {
          if (res.length) {
            const filterRes = res.filter(
              (item) =>
                item.image &&
                item.country &&
                item.nameEN &&
                item.director &&
                item.trailerLink.startsWith("http")
            );

            const isOnlyShortsStorage =
              localStorage.getItem("MoviesOnlyShorts");
            if (isOnlyShortsStorage) {
              setIsOnlyShorts(isOnlyShortsStorage);
            } else {
              setIsOnlyShorts(false);
            }

            setMoviesSource(filterRes);
            setMovies(filterRes);
          }
        })
        .catch((err) => {
          setMoviesSource([]);
          console.log(`Ошибка при загрузке списка фильмов: ${err}`);
        })
        .finally(
          () =>
            (timeoutId = setTimeout(() => {
              setIsPreloader(false);
            }, 2000))
        );
    }
    return () => clearTimeout(timeoutId);
  }, [loggedIn, location]);

  /** Получить все лайкнутые фильмы */
  useEffect(() => {
    let timeoutId;
    if (
      loggedIn &&
      (location.pathname === "/saved-movies" || location.pathname === "/movies")
    ) {
      mainApi
        .getInitialLikeMovie()
        .then((res) => {
          const ownerSavedMovies = res.filter(
            (item) => item.owner === currentUser._id
          );

          const isOnlyShortsStorage = localStorage.getItem(
            "SaveMoviesOnlyShorts"
          );
          if (isOnlyShortsStorage) {
            setIsOnlyShorts(isOnlyShortsStorage);
          } else {
            setIsOnlyShorts(false);
          }

          setSavedMoviesSource(ownerSavedMovies);
          setSavedMovies(ownerSavedMovies);
        })
        .catch((err) => {
          setSavedMoviesSource([]);
          setSavedMovies([]);
          console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`);
        })
        .finally(
          () =>
            (timeoutId = setTimeout(() => {
              setIsPreloader(false);
            }, 2000))
        );
    }
    return () => clearTimeout(timeoutId);
  }, [loggedIn, location, currentUser]);

  /** Сохранить фильм в список пользователя на сервере */
  function onSaveMovie(movie) {
    mainApi
      .addLikeMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([...newSavedMovie.data, ...savedMovies]);
      })

      .catch((err) => {
        console.log(`Ошибка при сохранения фильма: ${err}`);
      });
  }

  /** Удалить из списка сохранённый фильм пользователя на сервере */
  function onDeleteSavedMovie(movie) {
    mainApi
      .removeLikeMovie(movie._id)
      .then(() => {
        const filtredMovies = savedMovies.filter(
          (item) => item.movieId !== movie.movieId
        );

        setSavedMovies(filtredMovies);
      })
      .catch((err) => {
        console.log(
          `Ошибка при удаления сохранённого фильма из списка: ${err}`
        );
      });
  }

  /** Поиск фильмов */
  function onSearchSubmit(movieQuery, isShortMovieOnly) {
    let setFiltredMovies;
    let source = moviesSource;

    if (location.pathname === "/movies") {
      setFiltredMovies = setMovies;
    } else {
      setFiltredMovies = setSavedMovies;
      source = savedMoviesSource;
    }

    const findMovies = source.filter(
      (item) =>
        item.nameRU.toLowerCase().includes(movieQuery.toLowerCase()) &&
        (isShortMovieOnly ? item.duration < 40 : true)
    );

    setFiltredMovies(findMovies);

    let localSaveMovie = JSON.stringify(
      findMovies.filter(
        (item) =>
          item.image &&
          item.country &&
          item.nameEN &&
          item.director &&
          item.trailerLink.startsWith("http")
      )
    );

    if (location.pathname === "/movies") {
      localStorage.setItem("Movie", localSaveMovie);
      localStorage.setItem("MovieSearch", movieQuery);
    } else {
      localStorage.setItem("SaveMovie", localSaveMovie);
      localStorage.setItem("SaveMovieSearch", movieQuery);
    }
  }

  /** Проверка на сохраненность фильмов */
  function isSavedMovie(movie) {
    return savedMovies.some((item) => {
      return +item.movieId === movie.id;
    });
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("MoviesOnlyShorts");
    localStorage.removeItem("SaveMoviesOnlyShorts");
    setloggedIn(false);
    navigate("/", { replace: true });
  }

  function handleUpdateProfile(name, email) {
    mainApi
      .setUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setErrorRequest(false);
        setSuccessRequest(true);
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении пользователя: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                loggedIn={loggedIn}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                errorRequest={errorRequest}
                setErrorRequest={setErrorRequest}
                onRegister={onRegister}
              ></Register>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                signIn={signIn}
                errorRequest={errorRequest}
                setErrorRequest={setErrorRequest}
              ></Login>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn || localStorage.getItem("token")}
                onLogout={onLogout}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
                errorRequest={errorRequest}
                successRequest={successRequest}
                setErrorRequest={setErrorRequest}
                onUpdateProfile={handleUpdateProfile}
                element={Profile}
              ></ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn || localStorage.getItem("token")}
                movies={movies}
                savedMovies={savedMovies}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                isPreloader={isPreloader}
                isSavedMovie={isSavedMovie}
                onHandleHamburger={onHandleHamburger}
                onSearchSubmit={onSearchSubmit}
                onSaveMovie={onSaveMovie}
                onDeleteSavedMovie={onDeleteSavedMovie}
                isOnlyShorts={isOnlyShorts}
                setIsOnlyShorts={setIsOnlyShorts}
                element={Movies}
              ></ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn || localStorage.getItem("token")}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
                movies={movies}
                savedMovies={savedMovies}
                isPreloader={isPreloader}
                onSearchSubmit={onSearchSubmit}
                onDeleteSavedMovie={onDeleteSavedMovie}
                isOnlyShorts={isOnlyShorts}
                setIsOnlyShorts={setIsOnlyShorts}
              ></ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

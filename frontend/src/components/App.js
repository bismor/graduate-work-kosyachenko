import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
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
import ProtectedRouteAuth from "./ProtectedRouteAuth/ProtectedRouteAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [moviesSource, setMoviesSource] = useState([]);
  const [savedMoviesSource, setSavedMoviesSource] = useState([]);

  const [loggedIn, setloggedIn] = useState(false);
  const [searchedMoviesInput, setSearchedMoviesInput] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [isOnlyShorts, setIsOnlyShorts] = useState(
    localStorage.getItem("isShortOnlyQuery") === "1" ? true : false
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const filteredMovies = useMemo(() => {
    const processMovies = (movie, array) => {
      if (
        movie.nameRU
          .toLowerCase()
          .includes(searchedMoviesInput.toLowerCase()) &&
        (isOnlyShorts ? movie.duration < 40 : true)
      ) {
        array.push(movie);
      }
    };

    const saved = [];
    // debugger;
    savedMoviesSource.forEach((item) => processMovies(item, saved));
    const all = [];
    moviesSource.forEach((item) => processMovies(item, all));

    return { saved, all };
  }, [moviesSource, savedMoviesSource, searchedMoviesInput, isOnlyShorts]);

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

            // Установка фильмов
            setMoviesSource(filterRes);
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

          setSavedMoviesSource(ownerSavedMovies);
        })
        .catch((err) => {
          setSavedMoviesSource([]);
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
        setSavedMoviesSource([...newSavedMovie.data, ...savedMoviesSource]);
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
        const filtredMovies = savedMoviesSource.filter(
          (item) => item.movieId !== movie.movieId
        );

        setSavedMoviesSource(filtredMovies);
      })
      .catch((err) => {
        console.log(
          `Ошибка при удаления сохранённого фильма из списка: ${err}`
        );
      });
  }

  /** Поиск фильмов */
  function onSearchSubmit(movieQuery, isShortMovieOnly) {
    setSearchedMoviesInput(movieQuery);
    setIsOnlyShorts(isShortMovieOnly);

    localStorage.setItem("searchQuery", movieQuery);
    localStorage.setItem("isShortOnlyQuery", isShortMovieOnly ? "1" : "0");
  }

  /** Проверка на сохраненность фильмов */
  function isSavedMovie(movie) {
    return savedMoviesSource.some((item) => {
      return +item.movieId === movie.id;
    });
  }

  function onLogout() {
    localStorage.clear();
    setMoviesSource([]);
    setSavedMoviesSource([]);
    setSearchedMoviesInput("");
    setIsOnlyShorts(false);
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
              <ProtectedRouteAuth
                loggedIn={loggedIn || localStorage.getItem("token")}
                errorRequest={errorRequest}
                setErrorRequest={setErrorRequest}
                onRegister={onRegister}
                element={Register}
              ></ProtectedRouteAuth>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRouteAuth
                loggedIn={loggedIn || localStorage.getItem("token")}
                signIn={signIn}
                errorRequest={errorRequest}
                setErrorRequest={setErrorRequest}
                element={Login}
              ></ProtectedRouteAuth>
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
                movies={filteredMovies.all}
                savedMovies={savedMoviesSource}
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
                searchedMoviesInput={searchedMoviesInput}
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
                movies={filteredMovies.saved}
                savedMovies={filteredMovies.saved}
                isPreloader={isPreloader}
                onSearchSubmit={onSearchSubmit}
                onDeleteSavedMovie={onDeleteSavedMovie}
                isOnlyShorts={isOnlyShorts}
                setIsOnlyShorts={setIsOnlyShorts}
                searchedMoviesInput={searchedMoviesInput}
              ></ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

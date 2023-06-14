import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
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
  const [loggedIn, setloggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [findMovies, setFindMovies] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [findSavedMovies, setFindSavedMovies] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi.changeAuthToken(token);
        mainApi
          .checkJwtToken(token)
          .then((res) => {
            setloggedIn(true);
            setCurrentUser(res.data.name, res.data.email, res.data._id);
          })
          .catch((err) => {
            setloggedIn(false);
            localStorage.removeItem("jwt");
            navigate("/", { replace: true });
            console.log(`Ошибка токена: ${err}`); // выведем ошибку в консоль
          });
      }
    }
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn, tokenCheck]);

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
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setErrorRequest(true);

        console.log(`Ошибка при авторизации: ${err}`);
      });
  }

  /** Получить все фильмы с сервера */
  useEffect(() => {
    if (loggedIn && location.pathname === "/movies") {
      setIsPreloader(true);

      moviesApi
        .getInitialMovie()
        .then((res) => {
          if (res.length) {
            localStorage.setItem(
              "movies",
              JSON.stringify(
                res.filter(
                  (item) =>
                    item.image &&
                    item.country &&
                    item.nameEN &&
                    item.director &&
                    item.trailerLink.startsWith("http")
                )
              )
            );
            setMovies(JSON.parse(localStorage.getItem("movies")));

            setFindMovies(true);
          } else {
            setFindMovies(false);
          }
        })
        .catch((err) => {
          setFindMovies(false);

          console.log(`Ошибка при загрузке списка фильмов: ${err}`);
        })
        .finally(() =>
          setTimeout(() => {
            setIsPreloader(false);
          }, 2000)
        );
    }
  }, [loggedIn, location]);

  /** Получить все лайкнутые фильмы */
  useEffect(() => {
    if (
      loggedIn &&
      (location.pathname === "/saved-movies" || location.pathname === "/movies")
    ) {
      mainApi
        .getInitialLikeMovie()
        .then((res) => {
          if (res.length) {
            const ownerSavedMovies = res.filter(
              (item) => item.owner === currentUser._id
            );

            localStorage.setItem(
              "savedMovies",
              JSON.stringify(ownerSavedMovies)
            );

            setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));

            setFindSavedMovies(true);
          } else {
            setFindSavedMovies(false);
          }
        })
        .catch((err) => {
          setFindSavedMovies(false);

          console.log(`Ошибка при загрузке списка сохранённых фильмов: ${err}`);
        })
        .finally(() =>
          setTimeout(() => {
            setIsPreloader(false);
          }, 2000)
        );
    }
  }, [loggedIn, location, currentUser]);

  /** Сохранить фильм в список пользователя на сервере */
  function onSaveMovie(movie) {
    mainApi
      .addLikeMovie(movie)
      .then((newSavedMovie) => {
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovie.data));

        setSavedMovies([
          JSON.parse(localStorage.getItem("savedMovies")),
          ...savedMovies,
        ]);
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
        const res = savedMovies.filter(
          (item) => item.movieId !== movie.movieId
        );

        localStorage.setItem("savedMovies", JSON.stringify(res));

        setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));

        if (!JSON.parse(localStorage.getItem("savedMovies")).length)
          setFindSavedMovies(false);
      })
      .catch((err) => {
        console.log(
          `Ошибка при удаления сохранённого фильма из списка: ${err}`
        );
      });
  }

  /** Поиск фильмов */
  function onSearchSubmit(movie) {
    if (movie) {
      let token;
      let setAllMovies;
      let setFind;

      if (location.pathname === "/movies") {
        token = "movies";
        setAllMovies = setMovies;
        setFind = setFindMovies;
      } else {
        token = "savedMovies";
        setAllMovies = setSavedMovies;
        setFind = setFindSavedMovies;
      }

      const movies = JSON.parse(localStorage.getItem(token));
      const findMovies = movies.filter(
        (item) =>
          item.nameRU.toLowerCase().includes(movie.toLowerCase()) &&
          (isShortMovies ? item.duration < 40 : " ")
      );

      if (findMovies.length) {
        setFind(true);
        setAllMovies(findMovies);
      } else {
        setFind(false);
      }
    }
  }

  /** Искать/не искать короткометражные фильмы */
  function onSearchShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  /** Проверка на сохраненность фильмов */
  function isSavedMovie(movie) {
    return savedMovies.some((item) => +item.movieId === movie.id);
  }

  function onLogout() {
    localStorage.removeItem("token");
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
                loggedIn={loggedIn}
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
                loggedIn={loggedIn}
                movies={movies}
                savedMovies={savedMovies}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                isPreloader={isPreloader}
                isSavedMovie={isSavedMovie}
                findMovies={findMovies}
                onHandleHamburger={onHandleHamburger}
                isShortMovies={isShortMovies}
                onSearchSubmit={onSearchSubmit}
                onSearchShortMovies={onSearchShortMovies}
                onSaveMovie={onSaveMovie}
                onDeleteSavedMovie={onDeleteSavedMovie}
                element={Movies}
              ></ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
                movies={movies}
                savedMovies={savedMovies}
                isPreloader={isPreloader}
                findSavedMovies={findSavedMovies}
                isShortMovies={isShortMovies}
                onSearchSubmit={onSearchSubmit}
                onSearchShortMovies={onSearchShortMovies}
                onDeleteSavedMovie={onDeleteSavedMovie}
              ></ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

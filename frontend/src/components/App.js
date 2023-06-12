import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import mainApi from "../utils/Api/MainApi";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUseremail] = useState("");
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi
          .changeAuthToken(token)
          .checkJwtToken(token)
          .then(({ name, email, _id }) => {
            setloggedIn(true);
            setCurrentUser({ name, email, _id });
            navigate("/", { replace: true });
          })
          .catch((err) => {
            setloggedIn(false);
            localStorage.removeItem("jwt");
            navigate("/", { replace: true });
            console.log(`Ошибка токена: ${err}`); // выведем ошибку в консоль
          });
      }
    }
  }, []);

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

  async function signIn(email, password) {
    await mainApi
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

  function onLogout() {
    localStorage.removeItem("token");
    setloggedIn(false);
    navigate("/", { replace: true });
  }

  function handleUpdateUser(userInfo) {
    mainApi
      .setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        setErrorRequest(false);
        setSuccessRequest(true);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                signIn={signIn}
                errorRequest={errorRequest}
                setErrorRequest={setErrorRequest}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onLogout={onLogout}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
              ></ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
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
              ></ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

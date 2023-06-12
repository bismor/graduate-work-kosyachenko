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
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [successRequest, setSuccessRequest] = useState(false);

  const navigate = useNavigate();

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
            console.log("currentUser", currentUser);
          })
          .catch((err) => {
            setloggedIn(false);
            localStorage.removeItem("jwt");
            navigate("/", { replace: true });
            console.log(`Ошибка токена: ${err}`); // выведем ошибку в консоль
          });
      } else {
        console.log("ошибочка");
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
        console.log("signin", data);
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
                element={Profile}
                loggedIn={loggedIn}
                onLogout={onLogout}
                isHamburger={isHamburger}
                setIsHamburger={setIsHamburger}
                onHandleHamburger={onHandleHamburger}
                errorRequest={errorRequest}
                successRequest={successRequest}
                setErrorRequest={setErrorRequest}
                onUpdateProfile={handleUpdateProfile}
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

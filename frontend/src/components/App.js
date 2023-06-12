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
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  const [userEmail, setUseremail] = useState("");
  const [isHamburger, setIsHamburger] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);

  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi
          .changeAuthToken(token)
          .checkJwtToken(token)
          .then((res) => {
            if (res) {
              setloggedIn(true);
              setUseremail(res.data.email);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    } else {
      setUseremail("");
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

      const getLikeMovieData = async () => {
        try {
          const cards = await mainApi.getInitialLikeMovie();
          setCards(cards);
        } catch (err) {
          console.log(err);
        }
      };
      getLikeMovieData();
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
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setErrorRequest(true);

        console.log(`Ошибка при регистрации: ${err}`);
      });
  }

  async function signIn() {
    setloggedIn(true);
    navigate("/profile", { replace: true });
  }

  function onLogout() {
    setloggedIn(false);
    navigate("/", { replace: true });
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
          <Route path="/signin" element={<Login signIn={signIn} />} />

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

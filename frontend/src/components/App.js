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
import api from "../utils/Api"
import auth from "../utils/Auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  const [userEmail, setUseremail] = useState("");
  const [isHamburger, setIsHamburger] = useState(false);

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        api.changeAuthToken(token);
        auth
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
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

      const getCardsData = async () => {
        try {
          const cards = await api.getInitialCards();
          setCards(cards);
        } catch (err) {
          console.log(err);
        }
      };
      getCardsData();
    }
  }, [loggedIn, tokenCheck]);

  /** Открыть/закрыть гамбургер */
  function onHandleHamburger() {
    setIsHamburger(!isHamburger);
  }

  const navigate = useNavigate();

  async function signIn() {
    setloggedIn(true);
    navigate("/profile", { replace: true });
  }

  function onLogout() {
    setloggedIn(false);
    navigate("/", { replace: true });
  }

  return (
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
          element={<Register setloggedIn={setloggedIn} />}
        />
        <Route
          path="/signin"
          element={<Login signIn={signIn} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              loggedIn={loggedIn}
              onLogout={onLogout}
              isHamburger={isHamburger}
              setIsHamburger={setIsHamburger}
              onHandleHamburger={onHandleHamburger}
            />
          }
        />
        <Route path="/*" element={<NotFound />} />
        <Route path="/movies" element={<Movies
          loggedIn={loggedIn}
          isHamburger={isHamburger}
          setIsHamburger={setIsHamburger}
          onHandleHamburger={onHandleHamburger}
        />}/>
        <Route path='/saved-movies' element={<SavedMovies
          loggedIn={loggedIn}
          isHamburger={isHamburger}
          setIsHamburger={setIsHamburger}
          onHandleHamburger={onHandleHamburger}
          />}
        />
      </Routes>
    </div>
  );
}

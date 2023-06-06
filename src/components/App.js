import "./App.css";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false);

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

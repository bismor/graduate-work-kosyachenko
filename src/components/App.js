import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main setloggedIn={loggedIn} />} />
        <Route path="/signup" element={<Register setloggedIn={setloggedIn}/>} />
        <Route path="/signin" element={<Login setloggedIn={setloggedIn} />} />
        <Route path="/profile" element={<Profile setloggedIn={setloggedIn} />} />
      </Routes>
    </div>
  );
}

import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Main from './Main/Main'
import Register from './Register/Register';
import Login from './Login/Login'

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route 
          path='/'
          element={
            <Main />
          }
        />
        <Route path='/signup'element={<Register />}/>
        <Route path='/signin'element={<Login />}/>
      </Routes>
    </div>
  );
}

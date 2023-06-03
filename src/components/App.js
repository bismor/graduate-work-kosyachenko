import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Main from './Main/Main'
import Register from './Register/Register';

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
      </Routes>
    </div>
  );
}

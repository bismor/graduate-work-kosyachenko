import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Main from './Main/Main'

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
      </Routes>
    </div>
  );
}

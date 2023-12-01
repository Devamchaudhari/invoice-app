import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import HomePage from './features/homePage/container/homePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate replace to='/homePage' />} />
        <Route path='/homePage' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

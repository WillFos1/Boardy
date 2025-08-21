import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Board from './pages/Board';
import MyBoards from './pages/MyBoards';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/boards" element={<MyBoards />} />
      <Route path="/board/:id" element={<Board />} />
      <Route path="/board" element={<Navigate to="/boards" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

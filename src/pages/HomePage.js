// src/pages/HomePage.js
import React from 'react';
import Home from '../components/Home';

const HomePage = ({ username, onLogout }) => {
  return <Home username={username} onLogout={onLogout} />;
};

export default HomePage;

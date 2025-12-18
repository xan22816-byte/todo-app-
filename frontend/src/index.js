// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 Изменено
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root')); // 👈 Создаём корень
root.render(
  <Router>
    <App />
  </Router>
);
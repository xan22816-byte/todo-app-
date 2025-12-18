// src/App.js
import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // 👈 Удалите эту строку
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Todo App
        </Typography>
        {!token ? (
          <>
            <Register setToken={setToken} />
            <Login setToken={setToken} />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home token={token} />} />
          </Routes>
        )}
      </Box>
    </Container>
  );
};
export default App;
// src/pages/Home.js
import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';

const Home = ({ token, setToken }) => {
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <TaskForm token={token} />
      <TaskList token={token} />
    </div>
  );
};

export default Home;
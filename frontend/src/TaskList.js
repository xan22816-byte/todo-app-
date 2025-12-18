// src/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ token, tasks, setTasks }) => {
  useEffect(() => {
    if (token) {
      handleGetTasks();
    }
  }, [token]);

  const handleGetTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'x-auth-token': token,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} - Due: {new Date(task.due_date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
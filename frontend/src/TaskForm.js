// src/TaskForm.js
import React from 'react';
import axios from 'axios';

const TaskForm = ({ token, setTasks }) => {
  const handleAddTask = async () => {
    const title = prompt('Enter task title:');
    const description = prompt('Enter task description:');
    const dueDate = prompt('Enter due date (YYYY-MM-DDTHH:MM:SSZ):');
    if (!title || !description || !dueDate) {
      alert('All fields are required!');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, dueDate },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      alert('Task added successfully!');
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task. Check your token.');
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
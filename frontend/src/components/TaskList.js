// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Box, Container, Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (token) {
      handleGetTasks();
    }
  }, [token, handleGetTasks]); // 👈 Добавьте handleGetTasks в массив зависимостей
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
      alert('Failed to fetch tasks. Check your token.');
    }
  };
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        updatedTask,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task.');
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setTasks(tasks.filter(task => task.id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task.');
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Task List
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <TransitionGroup>
            {tasks.map((task) => (
              <Fade
                key={task.id}
                in={true}
                timeout={300}
                classNames="card"
                unmountOnExit
              >
                <Card sx={{ mt: 2, padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(task.due_date).toLocaleString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color={task.completed ? 'success' : 'primary'}
                        onClick={() => handleUpdateTask(task.id, { ...task, completed: !task.completed })}
                      >
                        {task.completed ? 'Undo' : 'Complete'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </TransitionGroup>
        </Box>
      </Box>
    </Container>
  );
};
export default TaskList;
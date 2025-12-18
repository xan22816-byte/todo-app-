// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
const TaskForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert('All fields are required!');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, dueDate },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('Task added successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task. Check your token.');
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
          Add Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dueDate"
            label="Due Date"
            type="datetime-local"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default TaskForm;
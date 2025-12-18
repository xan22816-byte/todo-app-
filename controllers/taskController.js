// controllers/taskController.js
const pool = require('../db');

exports.addTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, dueDate, req.user.id]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const allTasks = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ASC',
      [req.user.id]
    );
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  const taskId = req.params.id;
  try {
    let task = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (task.rows.length === 0) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    task = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5 RETURNING *',
      [title, description, dueDate, completed, taskId]
    );
    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    let task = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (task.rows.length === 0) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
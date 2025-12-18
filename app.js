// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Разрешаем только этот источник
  credentials: true,
}));
app.use(express.json());

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
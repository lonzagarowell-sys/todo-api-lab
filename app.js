// app.js
const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/todos', async (req, res) => {
  const list = await db.getAll();
  res.status(200).json(list);
});

// New Route: GET /todos/:id with 404 validation
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await db.getById(id);
  
  if (!todo) {
    return res.status(404).json({ error: `Todo with ID ${id} not found` });
  }
  
  res.status(200).json(todo);
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = await db.create(title);
  res.status(201).json(newTodo);
});

module.exports = app;
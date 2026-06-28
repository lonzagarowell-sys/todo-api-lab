// db.js
let todos = [];
let nextId = 1;

const db = {
  getAll: async () => todos,
  // New helper method for getting a single todo
  getById: async (id) => {
    return todos.find(todo => todo.id === parseInt(id));
  },
  create: async (title) => {
    const newTodo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    return newTodo;
  },
  clear: () => {
    todos = [];
    nextId = 1;
  }
};

module.exports = db;
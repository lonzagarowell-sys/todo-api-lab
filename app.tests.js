// app.test.js
const request = require('supertest');
const app = require('./app');
const db = require('./db');

jest.mock('./db');

describe('Todo API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ... (Keep your previous GET /todos and POST /todos tests here)

  describe('GET /todos/:id', () => {
    it('should return 200 and the todo item if it exists', async () => {
      db.getById.mockResolvedValue({ id: 5, title: 'Existing Todo', completed: false });

      const res = await request(app)
        .get('/todos/5')
        .expect(200);

      expect(res.body.title).toBe('Existing Todo');
    });

    it('should return 404 and an error message if the todo does not exist', async () => {
      // Mock db returning null/undefined to simulate missing data
      db.getById.mockResolvedValue(null);

      const res = await request(app)
        .get('/todos/999')
        .expect(404);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toContain('not found');
    });
  });
});
// lib/cors.js

import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*', // Or specify a list of allowed origins (e.g., 'https://example.com')
});

export const runCors = (req, res, next) => {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return res.status(500).json({ error: 'CORS error' });
    }
    next();
  });
};

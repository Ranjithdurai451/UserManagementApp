import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma/index.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes

app.get('/api', (req, res) => {
  res.send('User Management System Server');
});
app.use('/api/auth', authRouter);

app.use('/api/*', (req, res, next) => {
  res.status(404).send('Invalid endpoint,please check other endpoints');
});
// frontend serving

if (process.env.ENV == 'prod') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

// Database connection and Server initialization

const port = process.env.PORT || 8080;

prisma
  .$connect()
  .then(async () => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server started on port http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log('Error connecting to database: ');
  });

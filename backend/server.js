import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { redirect } from './controllers/urlController.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://katomaran-url.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SnapLink API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/:shortCode', (req, res, next) => {
  const reserved = ['api', 'health'];
  if (reserved.includes(req.params.shortCode)) {
    return next();
  }
  return redirect(req, res, next);
});

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`SnapLink server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();

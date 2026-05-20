import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  jwtExpiresIn: '7d',
};

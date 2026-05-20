import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  registerValidation,
  loginValidation,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', protect, getProfile);

export default router;

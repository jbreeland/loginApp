import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login } from './authController.js'; // Adjust the path if necessary

const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').trim().isLength({ min: 5 })
  ],
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').trim().isLength({ min: 5 })
  ],
  login
);

export default router;

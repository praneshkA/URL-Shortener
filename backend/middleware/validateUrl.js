import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export const validateOriginalUrl = [
  body('originalUrl')
    .trim()
    .notEmpty()
    .withMessage('URL is required')
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Please provide a valid http or https URL');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array()[0].msg;
      return next(new AppError(message, 400));
    }
    next();
  },
];

export { isValidUrl };

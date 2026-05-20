import { nanoid } from 'nanoid';
import { ShortUrl } from '../models/ShortUrl.js';

const CODE_LENGTH = 8;
const MAX_ATTEMPTS = 10;

export const generateUniqueShortCode = async () => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const shortCode = nanoid(CODE_LENGTH);
    const exists = await ShortUrl.findOne({ shortCode }).select('_id').lean();
    if (!exists) return shortCode;
  }
  throw new Error('Failed to generate unique short code');
};

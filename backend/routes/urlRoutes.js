import { Router } from 'express';
import {
  createUrl,
  getUrls,
  getUrlById,
  deleteUrl,
} from '../controllers/urlController.js';
import { protect } from '../middleware/auth.js';
import { validateOriginalUrl } from '../middleware/validateUrl.js';

const router = Router();

router.use(protect);

router.post('/', validateOriginalUrl, createUrl);
router.get('/', getUrls);
router.get('/:id', getUrlById);
router.delete('/:id', deleteUrl);

export default router;

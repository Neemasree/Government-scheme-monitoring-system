import express from 'express';
import {
    createScheme,
    getSchemes,
    getSchemeById,
    updateScheme,
    deleteScheme
} from '../controllers/schemeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getSchemes)
    .post(protect, authorize('admin'), createScheme);

router.route('/:id')
    .get(protect, getSchemeById)
    .put(protect, authorize('admin'), updateScheme)
    .delete(protect, authorize('admin'), deleteScheme);

export default router;

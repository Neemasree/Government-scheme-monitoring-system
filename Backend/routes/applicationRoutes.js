import express from 'express';
import {
    createApplication,
    getApplications,
    approveApplication
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getApplications)
    .post(protect, createApplication);

router.route('/:id/approve')
    .put(protect, approveApplication);

export default router;

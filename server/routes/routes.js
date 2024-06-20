import express from 'express';
import { getPuttStats } from '../controllers/puttstats.js';
import authRoutes from '../controllers/auth.js';

const router = express.Router();

router.use('/auth', authRoutes);

// Add the new route for fetching putt stats
router.get('/api/puttstats', getPuttStats);

export default router;

import express from 'express';
import { createAssessmentController } from '../controllers/assessment.controller.js'
import { authenticateJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', authenticateJWT, createAssessmentController);

export default router;
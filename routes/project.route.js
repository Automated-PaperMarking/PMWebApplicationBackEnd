import express from 'express';
import { createProjectController } from '../controllers/project.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', authenticateJWT, createProjectController);

export default router;

import express from 'express';
import { userController } from '../controllers/usermanagement.controller.js';
const router = express.Router();


router.post('/', userController.createUser);
router.get('/allusers', userController.getAllUsers);
router.post('/login', userController.loginUser);

export default router;
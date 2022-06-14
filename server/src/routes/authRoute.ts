import express from 'express';
import { login, register, updateUser } from '../controllers/authController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').patch(authMiddleware, updateUser);

export default router;
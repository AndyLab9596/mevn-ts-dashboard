import express from 'express';
import {login, register, updateUser} from '../controllers/authController';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update/:id').patch(updateUser);

export default router;
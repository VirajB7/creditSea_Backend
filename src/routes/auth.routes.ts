import express from 'express';
import { registerUser, registerVerifier, login } from '../controllers/auth.controller';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post( login);
router.route('/register-verifier').post(authenticate, authorizeRole(['admin']), registerVerifier);

export default router;

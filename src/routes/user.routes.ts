import express from 'express';
import { createLoan,getLoans } from '../controllers/user.controller';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/loan',authenticate, authorizeRole(['user']), createLoan);
router.get('/loan',authenticate, authorizeRole(['user']), getLoans);
export default router;

import express from 'express';
import { getLoans,updateLoanStatus} from '../controllers/verifier.controller';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/loan',authenticate, authorizeRole(['verifier']), getLoans);
router.patch('/loan/status',authenticate, authorizeRole(['verifier']), updateLoanStatus);
export default router;

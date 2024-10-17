import express from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';
import verifierRoute from './verifier.routes';
import adminRoute from './admin.routes';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/verifier', verifierRoute);
router.use('/admin', adminRoute);

export default router;
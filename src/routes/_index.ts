import { Router } from 'express';
import streamRoutes from './streams';

const router = Router();

router.use('/stream', streamRoutes);

export default router;
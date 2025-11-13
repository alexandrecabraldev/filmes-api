import { Router } from 'express';
import filmeRoutes from './filme.routes.js';

const router = Router();
router.use('/filmes', filmeRoutes);

export default router;

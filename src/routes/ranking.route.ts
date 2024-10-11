import { Router } from 'express';
import { rankingControllers } from '../controllers/index';

const router = Router();

router.post('', rankingControllers.create); // POST /ranking
router.get('', rankingControllers.getAll); // GET /ranking
router.get('/:rankingId', rankingControllers.getById); // GET /ranking/{rankingId}
router.put('/:rankingId', rankingControllers.update); // PUT /ranking/{rankingId}
router.delete('/:rankingId', rankingControllers.delete); // DELETE /ranking/{rankingId}


export default router;
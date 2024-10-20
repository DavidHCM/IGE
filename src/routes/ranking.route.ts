import { Router } from 'express';
import { rankingControllers } from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['admin']), rankingControllers.create); // POST /ranking
router.get('', authenticate, authorize(['admin', 'support', 'driver']), rankingControllers.getAll); // GET /ranking
router.get('/:rankingId', authenticate, authorize(['admin', 'support']), rankingControllers.getById); // GET /ranking/{rankingId}
router.put('/:rankingId', authenticate, authorize(['admin']), rankingControllers.update); // PUT /ranking/{rankingId}
router.delete('/:rankingId', authenticate, authorize(['admin']), rankingControllers.delete); // DELETE /ranking/{rankingId}


export default router;
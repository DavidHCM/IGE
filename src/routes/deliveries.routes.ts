import { Router } from 'express';
import { deliveryControllers } from '../controllers/index';

const router = Router();

router.post('', deliveryControllers.create); // POST /deliveries
router.get('', deliveryControllers.getAll); // GET /deliveries
router.get('/:deliveryId', deliveryControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:deliveryId', deliveryControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:deliveryId', deliveryControllers.delete); // DELETE /deliveries/{deliveryId}

export default router;
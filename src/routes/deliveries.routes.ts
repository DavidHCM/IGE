import { Router } from 'express';
import { deliveryControllers } from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['admin']), deliveryControllers.create); // POST /deliveries
router.get('', authenticate, authorize(['admin', 'driver', 'user', 'support']), deliveryControllers.getAll); // GET /deliveries
router.get('/:deliveryId', authenticate, authorize(['admin', 'driver', 'user', 'support']), deliveryControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:deliveryId', authenticate, authorize(['admin', 'driver']), deliveryControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:deliveryId', authenticate, authorize(['admin']), deliveryControllers.delete); // DELETE /deliveries/{deliveryId}

export default router;
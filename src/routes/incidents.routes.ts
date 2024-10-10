import { Router } from 'express';
import {incidentControllers} from '../controllers/index';

const router = Router();

router.post('', incidentControllers.create); // POST /deliveries
router.get('', incidentControllers.getAll); // GET /deliveries
router.get('/:incidentId', incidentControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:incidentId', incidentControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:incidentId', incidentControllers.delete); // DELETE /deliveries/{deliveryId}


export default router;
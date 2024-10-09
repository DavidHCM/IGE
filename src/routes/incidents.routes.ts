import { Router } from 'express';
import {incidentControllers} from '../controllers/index';

const router = Router();

router.post('', incidentControllers.create); // POST /deliveries
router.get('', incidentControllers.getAll); // GET /deliveries
router.get('/:deliveryId', incidentControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:deliveryId', incidentControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:deliveryId', incidentControllers.delete); // DELETE /deliveries/{deliveryId}


export default router;
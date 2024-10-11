import { Router } from 'express';
import {incidentControllers} from '../controllers/index';

const router = Router();

router.post('', incidentControllers.create); // POST /incident
router.get('', incidentControllers.getAll); // GET /incident
router.get('/:incidentId', incidentControllers.getById); // GET /incident/{incidentId}
router.put('/:incidentId', incidentControllers.update); // PUT /incident/{incidentId}
router.delete('/:incidentId', incidentControllers.delete); // DELETE /incident/{incidentId}


export default router;
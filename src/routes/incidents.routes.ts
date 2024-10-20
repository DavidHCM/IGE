import { Router } from 'express';
import {incidentControllers} from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['admin', 'user', 'driver']), incidentControllers.create); // POST /incident
router.get('', authenticate, authorize(['admin', 'support']), incidentControllers.getAll); // GET /incident
router.get('/:incidentId', authenticate, authorize(['admin', 'user', 'support']), incidentControllers.getById); // GET /incident/{incidentId}
router.put('/:incidentId', authenticate, authorize(['admin']), incidentControllers.update); // PUT /incident/{incidentId}
router.delete('/:incidentId', authenticate, authorize(['admin']), incidentControllers.delete); // DELETE /incident/{incidentId}


export default router;
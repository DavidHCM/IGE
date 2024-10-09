import { Router } from 'express';
import {routeSuggestionControllers} from '../controllers/index';

const router = Router();

router.post('', routeSuggestionControllers.create); // POST /deliveries
router.get('', routeSuggestionControllers.getAll); // GET /deliveries
router.get('/:deliveryId', routeSuggestionControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:deliveryId', routeSuggestionControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:deliveryId', routeSuggestionControllers.delete); // DELETE /deliveries/{deliveryId}


export default router;
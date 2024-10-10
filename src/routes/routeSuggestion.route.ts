import { Router } from 'express';
import {routeSuggestionControllers} from '../controllers/index';

const router = Router();

router.post('', routeSuggestionControllers.create); // POST /deliveries
router.get('', routeSuggestionControllers.getAll); // GET /deliveries
router.get('/:routeSuggestionId', routeSuggestionControllers.getById); // GET /deliveries/{deliveryId}
router.put('/:routeSuggestionId', routeSuggestionControllers.update); // PUT /deliveries/{deliveryId}
router.delete('/:routeSuggestionId', routeSuggestionControllers.delete); // DELETE /deliveries/{deliveryId}


export default router;
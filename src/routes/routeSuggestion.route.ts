import { Router } from 'express';
import {routeSuggestionControllers} from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['admin', 'driver']), routeSuggestionControllers.create); // POST /routeSuggestion
router.get('', authenticate, authorize(['admin', 'driver', 'support', 'user']), routeSuggestionControllers.getAll); // GET /routeSuggestion
router.get('/:routeSuggestionId', authenticate, authorize(['admin', 'driver', 'support']), routeSuggestionControllers.getById); // GET /routeSuggestion/{routeSuggestionId}
router.put('/:routeSuggestionId', authenticate, authorize(['admin', 'driver']), routeSuggestionControllers.update); // PUT /routeSuggestion/{routeSuggestionId}
router.delete('/:routeSuggestionId', authenticate, authorize(['admin']), routeSuggestionControllers.delete); // DELETE /routeSuggestion/{routeSuggestionId}


export default router;
import { Router } from 'express';
import {routeSuggestionControllers} from '../controllers/index';

const router = Router();

router.post('', routeSuggestionControllers.create); // POST /routeSuggestion
router.get('', routeSuggestionControllers.getAll); // GET /routeSuggestion
router.get('/:routeSuggestionId', routeSuggestionControllers.getById); // GET /routeSuggestion/{routeSuggestionId}
router.put('/:routeSuggestionId', routeSuggestionControllers.update); // PUT /routeSuggestion/{routeSuggestionId}
router.delete('/:routeSuggestionId', routeSuggestionControllers.delete); // DELETE /routeSuggestion/{routeSuggestionId}


export default router;
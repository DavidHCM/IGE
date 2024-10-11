import { Router } from 'express';
import { userControllers } from '../controllers/index';

const router = Router();

router.post('', userControllers.create); // POST /user
router.get('', userControllers.getAll); // GET /user
router.get('/:userId', userControllers.getById); // GET /user/{userId}
router.put('/:userId', userControllers.update); // PUT /user/{userId}
router.delete('/:userId', userControllers.delete); // DELETE /user/{userId}


export default router;
import { Router } from 'express';
import { chatMessageControllers } from '../controllers/index';

const router = Router();

router.post('', chatMessageControllers.create); // POST /message
router.get('', chatMessageControllers.getAll); // GET /message
router.get('/:messageId', chatMessageControllers.getById); // GET /message/{messageId}
router.put('/:messageId', chatMessageControllers.update); // PUT /message/{messageId}
router.delete('/:messageId', chatMessageControllers.delete); // DELETE /message/{messageId}


export default router;
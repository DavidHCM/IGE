import { Router } from 'express';
import { chatMessageControllers } from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['user', 'admin','driver','support']), chatMessageControllers.create); // POST /message
router.get('', authenticate, authorize(['admin', 'user', 'driver', 'support']), chatMessageControllers.getAll); // GET /message
router.get('/:messageId', authenticate, authorize(['admin', 'user', 'driver', 'support']), chatMessageControllers.getById); // GET /message/{messageId}
router.put('/:messageId', authenticate, authorize(['admin', 'user', 'driver', 'support']), chatMessageControllers.update); // PUT /message/{messageId}
router.delete('/:messageId', authenticate, authorize(['admin']), chatMessageControllers.delete); // DELETE /message/{messageId}


export default router;
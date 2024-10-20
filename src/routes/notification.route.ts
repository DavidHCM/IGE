import { Router } from 'express';
import { notificationControllers } from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

router.post('', authenticate, authorize(['admin']), notificationControllers.create); // POST /notification
router.get('', authenticate, authorize(['admin', 'support', 'driver', 'user']), notificationControllers.getAll); // GET /notification
router.get('/:notificationId', authenticate, authorize(['admin', 'support', 'user', 'driver']), notificationControllers.getById); // GET /notification/{notificationId}
router.put('/:notificationId', authenticate, authorize(['admin']), notificationControllers.update); // PUT /notification/{notificationId}
router.delete('/:notificationId', authenticate, authorize(['admin']), notificationControllers.delete); // DELETE /notification/{notificationId}


export default router;
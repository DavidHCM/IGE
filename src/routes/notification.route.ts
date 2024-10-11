import { Router } from 'express';
import { notificationControllers } from '../controllers/index';

const router = Router();

router.post('', notificationControllers.create); // POST /notification
router.get('', notificationControllers.getAll); // GET /notification
router.get('/:notificationId', notificationControllers.getById); // GET /notification/{notificationId}
router.put('/:notificationId', notificationControllers.update); // PUT /notification/{notificationId}
router.delete('/:notificationId', notificationControllers.delete); // DELETE /notification/{notificationId}


export default router;
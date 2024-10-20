import { Router } from 'express';
import { userControllers } from '../controllers/index';
import {authenticate, authorize} from "../middlewares";

const router = Router();

//router.post('', userControllers.create); // POST /user
router.get('', authenticate, authorize(['admin']), userControllers.getAll); // GET /user
router.get('/:userId', authenticate, authorize(['admin', 'user', 'support']), userControllers.getById); // GET /user/{userId}
router.put('/:userId', authenticate, authorize(['admin', 'user']), userControllers.update); // PUT /user/{userId}
router.delete('/:userId', authenticate, authorize(['admin']), userControllers.delete); // DELETE /user/{userId}
router.post('/register', userControllers.register); // POST /user/register
router.post('/login', userControllers.login); // POST /user/login

export default router;
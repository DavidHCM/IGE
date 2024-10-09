import { Router } from 'express';
import { deliveryControllers } from '../controllers/index';

const router = Router();

//router.get('', controller.getAll);
//router.post('/login', controller.login);

router.post('', deliveryControllers.create);
router.get('', deliveryControllers.getAll)

// TODO: Crear: POST /deliveries
// TODO: Leer (todas): GET /deliveries
// TODO: Leer (por ID): GET /deliveries/{deliveryId}
// TODO: Actualizar: PUT /deliveries/{deliveryId}
// TODO: Eliminar: DELETE /deliveries/{deliveryId}

export default router;
import { Router } from 'express';
import { incidentControllers } from '../controllers/index';
import { authenticate, authorize } from "../middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Incident:
 *    type: object
 *    required:
 *     - description
 *     - type
 *    properties:
 *     description:
 *      type: string
 *      description: A detailed description of the incident
 *     type:
 *      type: string
 *      description: The type of incident (e.g., accident, technical issue)
 *     status:
 *      type: string
 *      description: The current status of the incident
 *     reportedAt:
 *      type: string
 *      format: date-time
 *      description: The time the incident was reported
 */

/**
 * @swagger
 * /incident:
 *  post:
 *   description: Create a new incident report
 *   tags: [Incident]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Incident'
 *   responses:
 *    201:
 *     description: Incident created successfully
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 */
router.post('', authenticate, authorize(['admin', 'user', 'driver']), incidentControllers.create);

/**
 * @swagger
 * /incident:
 *  get:
 *   description: Get all incident reports
 *   tags: [Incident]
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: A list of incident reports
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Incident'
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 */
router.get('', authenticate, authorize(['admin', 'support']), incidentControllers.getAll);

/**
 * @swagger
 * /incident/{incidentId}:
 *  get:
 *   description: Get a specific incident report by ID
 *   tags: [Incident]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: incidentId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the incident report
 *   responses:
 *    200:
 *     description: Incident details
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Incident'
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Incident not found
 */
router.get('/:incidentId', authenticate, authorize(['admin', 'user', 'support']), incidentControllers.getById);

/**
 * @swagger
 * /incident/{incidentId}:
 *  put:
 *   description: Update an incident report by ID
 *   tags: [Incident]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: incidentId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the incident report
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Incident'
 *   responses:
 *    200:
 *     description: Incident updated successfully
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Incident not found
 */
router.put('/:incidentId', authenticate, authorize(['admin']), incidentControllers.update);

/**
 * @swagger
 * /incident/{incidentId}:
 *  delete:
 *   description: Delete an incident report by ID
 *   tags: [Incident]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: incidentId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the incident report
 *   responses:
 *    200:
 *     description: Incident deleted successfully
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Incident not found
 */
router.delete('/:incidentId', authenticate, authorize(['admin']), incidentControllers.delete);

export default router;

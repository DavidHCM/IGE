import { Router } from 'express';
import { userControllers } from '../controllers/index';
import { authenticate, authorize } from "../middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - name
 *     - email
 *     - password
 *    properties:
 *     name:
 *      type: string
 *      description: The user's name
 *     email:
 *      type: string
 *      format: email
 *      description: The user's email address
 *     createdAt:
 *      type: string
 *      format: date-time
 *      description: The time the user was created
 */

/**
 * @swagger
 * /user:
 *  get:
 *   description: Get all users
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: A list of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 */
router.get('', authenticate, authorize(['admin']), userControllers.getAll);

/**
 * @swagger
 * /user/drivers:
 *  get:
 *   description: Get a the users that are drivers
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The users that are drivers
 *   responses:
 *    200:
 *     description: User details
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 */
router.get('/drivers',authenticate, authorize(['admin', 'driver', 'support']), userControllers.getDrivers);

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *   description: Get a specific user by ID
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the user
 *   responses:
 *    200:
 *     description: User details
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 */
router.get('/:userId', authenticate, authorize(['admin', 'driver', 'support']), userControllers.getById);

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *   description: Update a user by ID
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: User updated successfully
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 */
router.put('/:userId', authenticate, authorize(['admin', 'driver']), userControllers.update);

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *   description: Delete a user by ID
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: userId
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the user
 *   responses:
 *    200:
 *     description: User deleted successfully
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 */
router.delete('/:userId', authenticate, authorize(['admin']), userControllers.delete);

/**
 * @swagger
 * /user/register:
 *  post:
 *   description: Register a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: User registered successfully
 *    400:
 *     description: Bad request (missing parameter or invalid data)
 */
router.post('/register', userControllers.register);

/**
 * @swagger
 * /user/login:
 *  post:
 *   description: User login
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         format: email
 *        password:
 *         type: string
 *   responses:
 *    200:
 *     description: Authentication token
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         token:
 *          type: string
 *    400:
 *     description: Bad request (missing parameter or invalid credentials)
 */
router.post('/login', userControllers.login);

export default router;

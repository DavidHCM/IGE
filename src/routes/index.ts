import express, { Request, Response, NextFunction } from "express";
import deliveriesRoutes from "./deliveries.routes";
import incidentsRoutes from "./incidents.routes";
import routeSuggestionRoutes from "./routeSuggestion.route";
import userRoutes from "./user.route";
import rankingRoutes from "./ranking.route";
import notificationRoute from "./notification.route";
import chatMessageRoute from "./chatMessage.route";
const router = express.Router();
import { HTTP_STATUS } from "../types/http-status-codes";

router.use(express.json());

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * security:
 *  - bearerAuth: []
 */

/**
 * @swagger
 * /:
 *  get:
 *   tags: [Default]
 *   description: Api home endpoint
 *   responses:
 *    '200':
 *      description: Api is running
 */
router.get("/", (req, res) => {
    res.send("Api is running");
});

/**
 * @swagger
 * tags:
 *  name: Deliveries
 *  description: Deliveries management
 */
router.use("/deliveries", deliveriesRoutes);

/**
 * @swagger
 * tags:
 *  name: Incident
 *  description: Incidents management
 */
router.use("/incident", incidentsRoutes);

/**
 * @swagger
 * tags:
 *  name: RouteSuggestion
 *  description: Route suggestions management
 */
router.use("/routeSuggestion", routeSuggestionRoutes);

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */
router.use("/user", userRoutes);

/**
 * @swagger
 * tags:
 *  name: Ranking
 *  description: Rankings management
 */
router.use("/ranking", rankingRoutes);

/**
 * @swagger
 * tags:
 *  name: Notification
 *  description: Notifications management
 */
router.use("/notification", notificationRoute);

/**
 * @swagger
 * tags:
 *  name: Chat
 *  description: Chat messages management
 */
router.use("/message", chatMessageRoute);

/**
 * @swagger
 * /error:
 *  post:
 *   tags: [Error]
 *   description: Handles errors in the API
 *   responses:
 *    '400':
 *      description: Bad request error
 */
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = HTTP_STATUS.BAD_REQUEST;
    const message = err.message.split(': ')[0];
    res.status(statusCode).send({ message, statusCode });
});

export default router;

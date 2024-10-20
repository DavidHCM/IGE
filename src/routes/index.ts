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

router.use("/deliveries",deliveriesRoutes);
router.use("/incident",incidentsRoutes);
router.use("/routeSuggestion",routeSuggestionRoutes);
router.use("/user",userRoutes);
router.use("/ranking",rankingRoutes);
router.use("/notification",notificationRoute);
router.use("/message",chatMessageRoute);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = HTTP_STATUS.BAD_REQUEST;
    const message = err.message.split(': ')[0];
    res.status(statusCode).send({ message, statusCode });
});


export default router;
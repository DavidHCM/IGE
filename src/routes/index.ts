import express from "express";
import deliveriesRoutes from "./deliveries.routes";
import incidentsRoutes from "./incidents.routes";
import routeSuggestionRoutes from "./routeSuggestion.route";
import userRoutes from "./user.route";
import rankingRoutes from "./ranking.route";
import notificationRoute from "./notification.route";
import chatMessageRoute from "./chatMessage.route";
const router = express.Router();

router.use(express.json());

router.use("/deliveries",deliveriesRoutes);
router.use("/incident",incidentsRoutes);
router.use("/routeSuggestion",routeSuggestionRoutes);
router.use("/user",userRoutes);
router.use("/ranking",rankingRoutes);
router.use("/notification",notificationRoute);
router.use("/message",chatMessageRoute);


export default router;
import express from "express";
import deliveriesRoutes from "./deliveries.routes";
import incidentsRoutes from "./incidents.routes";
import routeSuggestionRoutes from "./routeSuggestion.route";
const router = express.Router();

router.use(express.json());

router.use("/deliveries",deliveriesRoutes);
router.use("/incident",incidentsRoutes);
router.use("/routeSuggestion",routeSuggestionRoutes);

export default router;
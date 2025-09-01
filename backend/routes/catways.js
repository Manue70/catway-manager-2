
import express from "express";
import { getCatways, getCatway, addCatway, removeCatway } from "../controllers/catwayController.js";
import { authMiddleware, checkRole } from "../middleware/auth.js";

const router = express.Router();

// Routes publiques
router.get("/", getCatways);
router.get("/:id", getCatway);

// Routes protégées (ex : ajout/suppression réservées à la capitainerie)
router.post("/", authMiddleware, checkRole("capitainerie"), addCatway);
router.delete("/:id", authMiddleware, checkRole("capitainerie"), removeCatway);

export default router;






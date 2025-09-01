
import express from "express";
import { getReservations, addReservation, removeReservation } from "../controllers/reservationController.js";
import { authMiddleware, authOptional, checkRole } from "../middleware/auth.js";

const router = express.Router();

// GET public
router.get("/", authOptional, getReservations);

// POST protégé (capitainerie)
router.post("/", authMiddleware, checkRole("capitainerie"), addReservation);

// DELETE protégé
router.delete("/:id", authMiddleware, checkRole("capitainerie"), removeReservation);


export default router;



import express from "express";
import { getUsers, getUser, addUser, removeUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Toutes les routes sont protégées par authMiddleware
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.post("/", authMiddleware, addUser);
router.delete("/:id", authMiddleware, removeUser);

export default router;

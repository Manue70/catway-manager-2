
import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Connexion
router.post("/login", login);

// Inscription (optionnel)
router.post("/register", register);

export default router;


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

// ===== Config dotenv =====
dotenv.config();

// ===== Créer l'app Express =====
const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // Vite dev local
      "https://catway-manager-2.onrender.com"  // Render
    ],
  })
);

// ===== Remplacer __dirname pour ES Modules =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== EJS & Layouts =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// ===== Routes API =====
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import catwayRoutes from "./routes/catways.js";
import reservationsRoutes from "./routes/reservations.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationsRoutes);

// ===== Swagger (optionnel) =====
app.get("/swagger.yaml", (req, res) => {
  const swaggerPath = path.join(__dirname, "swagger.yaml");
  if (fs.existsSync(swaggerPath)) {
    res.sendFile(swaggerPath);
  } else {
    res.status(404).send("Swagger.yaml introuvable !");
  }
});

// ===== Servir le frontend (dist) =====
let frontendDist = path.join(__dirname, "../frontend/dist");
if (!fs.existsSync(frontendDist)) {
  frontendDist = path.join(process.cwd(), "frontend/dist");
}

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // Toutes les routes non-API renvoient index.html (SPA)
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  console.warn("⚠️ Build frontend introuvable ! Le frontend sera inaccessible.");
}

// ===== Connexion MongoDB & lancement serveur =====
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connecté");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
  })
  .catch(err => console.error("❌ Erreur MongoDB:", err));


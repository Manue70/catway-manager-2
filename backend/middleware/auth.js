
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

/**
 * Middleware pour protéger les routes
 * Vérifie que le token Bearer est présent et valide
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contient userId + role
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

/**
 * Middleware optionnel : si token présent et valide, ajoute req.user
 * Sinon, continue sans bloquer
 */
export const authOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) return next();

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // Token invalide : on ignore
  }

  next();
};

/**
 * Middleware pour vérifier le rôle de l'utilisateur
 * @param {string} role - rôle requis ("admin", "capitainerie", etc.)
 */
export const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Non autorisé" });
    if (req.user.role !== role) return res.status(403).json({ message: "Accès refusé" });
    next();
  };
};

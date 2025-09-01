
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

/**
 * Vérifie les identifiants et retourne token + rôle
 * @param {string} email
 * @param {string} password
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email ou mot de passe incorrect");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Email ou mot de passe incorrect");

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return { token, role: user.role, user };
};

/**
 * Crée un nouvel utilisateur
 * @param {Object} data {email, password, role}
 */
export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = new User({
    email: data.email,
    password: hashedPassword,
    role: data.role || "user"
  });
  return await newUser.save();
};

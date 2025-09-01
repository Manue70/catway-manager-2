
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Récupère tous les utilisateurs (sans le password)
 */
export const getAllUsers = async () => {
  return await User.find({}, "-password");
};

/**
 * Récupère un utilisateur par ID
 * @param {string} id
 */
export const getUserById = async (id) => {
  return await User.findById(id, "-password");
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

/**
 * Supprime un utilisateur par ID
 * @param {string} id
 */
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};


import * as userService from "../services/userService.js";

/**
 * GET /api/users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/users/:id
 */
export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/users
 */
export const addUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ id: newUser._id, email: newUser.email, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/users/:id
 */
export const removeUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

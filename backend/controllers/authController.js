
import * as authService from "../services/authService.js";

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);
    console.log("Login réussi :", result.user.email);
    res.json({ token: result.token, role: result.role });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

/**
 * POST /api/auth/register (si besoin)
 */
export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = await authService.createUser({ email, password, role });
    res.status(201).json({ id: newUser._id, email: newUser.email, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

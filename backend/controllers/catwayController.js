
import * as catwayService from "../services/catwayService.js";

/**
 * GET /api/catways
 */
export const getCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/catways/:id
 */
export const getCatway = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/catways
 */
export const addCatway = async (req, res) => {
  try {
    const newCatway = await catwayService.createCatway(req.body);
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/catways/:id
 */
export const removeCatway = async (req, res) => {
  try {
    await catwayService.deleteCatway(req.params.id);
    res.json({ message: "Catway supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

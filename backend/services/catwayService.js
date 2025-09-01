
import Catway from "../models/Catway.js";

/**
 * Récupère tous les catways
 */
export const getAllCatways = async () => {
  return await Catway.find();
};

/**
 * Récupère un catway par ID
 * @param {string} id
 */
export const getCatwayById = async (id) => {
  return await Catway.findById(id);
};

/**
 * Crée un nouveau catway
 * @param {Object} data
 */
export const createCatway = async (data) => {
  const newCatway = new Catway(data);
  return await newCatway.save();
};

/**
 * Supprime un catway par ID
 * @param {string} id
 */
export const deleteCatway = async (id) => {
  return await Catway.findByIdAndDelete(id);
};


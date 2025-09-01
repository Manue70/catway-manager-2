
import Reservation from "../models/Reservation.js";
import Catway from "../models/Catway.js";

/**
 * Récupère toutes les réservations
 */
export const getAllReservations = async () => {
  return await Reservation.find().populate("catwayId");
};

/**
 * Récupère une réservation par ID
 * @param {string} id
 */
export const getReservationById = async (id) => {
  return await Reservation.findById(id).populate("catwayId");
};

/**
 * Crée une nouvelle réservation
 * @param {Object} data
 */
export const createReservation = async (data) => {
  const catway = await Catway.findOne({ catwayNumber: data.catwayNumber });
  if (!catway) throw new Error("Catway introuvable");

  const newReservation = new Reservation({
    catwayId: catway._id,
    boatName: data.boatName,
    clientName: data.clientName,
    startDate: data.startDate,
    endDate: data.endDate
  });

  return await newReservation.save();
};

/**
 * Supprime une réservation
 * @param {string} id
 */
export const deleteReservation = async (id) => {
  return await Reservation.findByIdAndDelete(id);
};

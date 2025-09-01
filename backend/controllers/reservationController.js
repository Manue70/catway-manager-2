
import * as reservationService from "../services/reservationService.js";

/**
 * GET /api/reservations
 */
export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/reservations
 */
export const addReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/reservations/:id
 */
export const removeReservation = async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.json({ message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

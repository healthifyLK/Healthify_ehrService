// controller for observation routes
const observationService = require("../services/observation-service");

// get all observations
const getAllObservations = async (req, res) => {
  try {
    const observations = await observationService.getObservations();
    res.status(200).json(observations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get observation by id
const getObservationById = async (req, res) => {
  try {
    const observation = await observationService.getObservationById(
      req.params.id
    );
    res.status(200).json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get observation by patient id
const getObservationsByPatientId = async (req, res) => {
  try {
    const observations = await observationService.getObservationsByPatientId(
      req.params.patientId
    );
    res.status(200).json(observations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get observation by patient id and date range
const getObservationsByPatientIdAndDateRange = async (req, res) => {
  try {
    const observations =
      await observationService.getObservationsByPatientIdAndDateRange(
        req.params.patientId,
        req.params.startDate,
        req.params.endDate
      );
    res.status(200).json(observations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create observation
const createObservation = async (req, res) => {
  try {
    const observationData = req.body;
    const observation = await observationService.createObservation(
      observationData
    );
    res.status(201).json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update observation
const updateObservation = async (req, res) => {
  try {
    const observationData = req.body;
    const observationId = req.params.id;
    const observation = await observationService.updateObservation(
      observationId,
      observationData
    );
    res.status(200).json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllObservations,
  getObservationById,
  getObservationsByPatientId,
  getObservationsByPatientIdAndDateRange,
  createObservation,
  updateObservation,
};

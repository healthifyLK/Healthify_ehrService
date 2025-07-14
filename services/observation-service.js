const { openmrsClient } = require("../services/openmrsService");
const { buildQueryParams } = require("../utills/validation");
// service for observation routes
// get all observations from the FHIR server
const getObservations = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/observation${queryString ? `?${queryString}` : ""}`;
  try {
    const response = await openmrsClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching observations:", error);
    throw error;
  }
};

// get observation by id
const getObservationById = async (id) => {
  try {
    const response = await openmrsClient.get(`/observation/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching observation by id:", error);
    throw error;
  }
};

// get observation by patient id
const getObservationsByPatientId = async (patientId) => {
  try {
    const response = await openmrsClient.get(`/observation?patient=${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching observations by patient id:", error);
    throw error;
  }
};

// get observation by patient id and date range
const getObservationsByPatientIdAndDateRange = async (
  patientId,
  startDate,
  endDate
) => {
  try {
    const response = await openmrsClient.get(
      `/observation?patient=${patientId}&date=${startDate}&date=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching observations by patient id and date range:", error);
    throw error;
  }
};

// create observation
const createObservation = async (observation) => {
  try {
    const response = await openmrsClient.post(`/observation`, observation);
    return response.data;
  } catch (error) {
    console.error("Error creating observation:", error);
    throw error;
  }
};

// update observation
const updateObservation = async (id, observation) => {
  try {
    const response = await openmrsClient.put(`/observation/${id}`, observation);
    return response.data;
  } catch (error) {
    console.error("Error updating observation:", error);
    throw error;
  }
};

module.exports = {
  getObservations,
  getObservationById,
  getObservationsByPatientId,
  getObservationsByPatientIdAndDateRange,
  createObservation,
  updateObservation,
};

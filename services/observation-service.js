const { openmrsClient } = require("../services/openmrsService");
const { buildQueryParams } = require("../utills/validation");
// service for obs routes
// get all observations from the FHIR server
const getObservations = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/obs${queryString ? `?${queryString}` : ""}`;
  try {
    const response = await openmrsClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching observations:", error);
    throw error;
  }
};

// get obs by id
const getObservationById = async (id) => {
  try {
    const response = await openmrsClient.get(`/obs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching obs by id:", error);
    throw error;
  }
};

// get obs by patient id
const getObservationsByPatientId = async (patientId) => {
  try {
    const response = await openmrsClient.get(`/obs?patient=${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching observations by patient id:", error);
    throw error;
  }
};

// get obs by patient id and date range
const getObservationsByPatientIdAndDateRange = async (
  patientId,
  startDate,
  endDate
) => {
  try {
    const response = await openmrsClient.get(
      `/obs?patient=${patientId}&date=${startDate}&date=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching observations by patient id and date range:", error);
    throw error;
  }
};

// create obs
const createObservation = async (obs) => {
  try {
    const response = await openmrsClient.post(`/obs`, obs);
    return response.data;
  } catch (error) {
    console.error("Error creating obs:", error);
    throw error;
  }
};

// update obs
const updateObservation = async (id, obs) => {
  try {
    const response = await openmrsClient.put(`/obs/${id}`, obs);
    return response.data;
  } catch (error) {
    console.error("Error updating obs:", error);
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

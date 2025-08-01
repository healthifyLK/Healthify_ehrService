// Encounter Service
const { openmrsClient } = require("../services/openmrsService");
const { buildQueryParams } = require("../utills/validation");

// Get all encounters(optionally filtered by patient, provider etc..)
// Tested and working
const getEncountersService = async (params = {}) => {
  if (!params.patient && !params.provider && !params.visit) {
    throw new Error(
      "You must provide at least one filter: patient, provider, or visit."
    );
  }
  const queryString = buildQueryParams(params);
  const url = `/encounter${queryString ? `?${queryString}` : ""}`;
  try {
    const response = await openmrsClient.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching encounters:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get an encounter by id
const getEncounterByIdService = async (encounterUuid) => {
  try {
    const response = await openmrsClient.get(`/encounter/${encounterUuid}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching encounter by id:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new encounter
// Tested and working
const createEncounterService = async (encounterData) => {
  try {
    const response = await openmrsClient.post("/encounter", encounterData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating encounter:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update an encounter
const updateEncounterService = async (id, encounterData) => {
  try {
    const response = await openmrsClient.post(
      `/encounter/${id}`,
      encounterData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating encounter:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  getEncountersService,
  getEncounterByIdService,
  createEncounterService,
  updateEncounterService,
};

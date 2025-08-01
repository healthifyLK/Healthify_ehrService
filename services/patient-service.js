const { openmrsClient } = require("../services/openmrsService");
const { buildQueryParams } = require("../utills/validation");

// service for patient routes
// get all patients from the FHIR server
// This is not implemented by openmrs 
const getPatients = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/patient${queryString ? `?${queryString}` : ""}`;
  try {
    const response = await openmrsClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// get a patient by id
// Tested and working
const getPatientByIdService = async (id) => {
  console.log(id);
  try {
    const response = await openmrsClient.get(`/patient/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by id:", error);
    throw error;
  }
};

// create a new patient
// Tested and working
const createPatientService = async (patientData) => {
  try {
    const response = await openmrsClient.post("/patient", patientData);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

// update a patient
const updatePatientService = async (id, patientData) => {
  try {
    const response = await openmrsClient.post(`/patient/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

module.exports = {
  getPatients,
  getPatientByIdService,
  createPatientService,
  updatePatientService,
};

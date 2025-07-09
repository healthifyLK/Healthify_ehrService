// service for patient routes
// get all patients from the FHIR server
const getPatients = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/Patient${queryString ? `?${queryString}` : ""}`;
  const response = await openmrsClient.get(url);
  return response.data;
};

// get a patient by id
const getPatientById = async (id) => {
  const response = await openmrsClient.get(`/Patient/${id}`);
  return response.data;
};

// create a new patient
const createPatient = async (patientData) => {
  const response = await openmrsClient.post("/Patient", patientData);
  return response.data;
};

// update a patient
const updatePatient = async (id, patientData) => {
  const response = await openmrsClient.put(`/Patient/${id}`, patientData);
  return response.data;
};

module.exports = { getPatients, getPatientById, createPatient, updatePatient };

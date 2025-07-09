// service for practioner routes
// get all practitioners from the FHIR server
const getPractitioners = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/Practitioner${queryString ? `?${queryString}` : ""}`;
  const response = await openmrsClient.get(url);
  return response.data;
};

// get a practitioner by id
const getPractitionerById = async (id) => {
  const response = await openmrsClient.get(`/Practitioner/${id}`);
  return response.data;
};

// create a new practitioner
const createPractitioner = async (practitionerData) => {
  const response = await openmrsClient.post("/Practitioner", practitionerData);
  return response.data;
};

// update a practitioner
const updatePractitioner = async (id, practitionerData) => {
  const response = await openmrsClient.put(
    `/Practitioner/${id}`,
    practitionerData
  );
  return response.data;
};

module.exports = {
  getPractitioners,
  getPractitionerById,
  createPractitioner,
  updatePractitioner,
};

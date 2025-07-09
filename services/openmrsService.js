const axios = require("axios");

// Configure openmrs API client
const OPENMRS_CONFIG = {
    baseURL:process.env.OPENMRS_FHIR_BASE,
    auth: {
        username: process.env.OPENMRS_USERNAME,
        password: process.env.OPENMRS_PASSWORD
    }
}

const openmrsClient = axios.create(OPENMRS_CONFIG);

module.exports = { openmrsClient };
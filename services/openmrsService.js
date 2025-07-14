const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const OPENMRS_FHIR_BASE = process.env.OPENMRS_FHIR_BASE;
// Configure openmrs API client
const OPENMRS_CONFIG = {
    baseURL:OPENMRS_FHIR_BASE,
    auth:{
        username: process.env.OPENMRS_USERNAME,
        password: process.env.OPENMRS_PASSWORD
    }
}

const openmrsClient = axios.create(OPENMRS_CONFIG);

module.exports = { openmrsClient };
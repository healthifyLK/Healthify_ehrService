const express = require("express");
const axios = require("axios");
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
} = require("../controllers/patient-controller");
const {
  getPractitioners,
  getPractitionerById,
  createPractitioner,
  updatePractitioner,
} = require("../controllers/practioner-controller");
const {
  getAllObservations,
  getObservationById,
  getObservationsByPatientId,
  getObservationsByPatientIdAndDateRange,
  createObservation,
  updateObservation,
} = require("../controllers/observation-controller");

const {
  getEncounters,
  getEncounter,
  createNewEncounter,
  updateExistingEncounter,
} = require("../controllers/encounter-controller");

// Initialize Express router
const router = express.Router();

// GET /api/fhir/patients
// route to get all patients from the FHIR server
router.get("/patients", getAllPatients);

// GET /api/fhir/patients/:id
// route to get a patient by id
router.get("/patients/:id", getPatientById);

// POST /api/fhir/patients
// route to create a new patient
router.post("/patients", createPatient);

// PUT /api/fhir/patients/:id
// route to update a patient
router.put("/patients/:id", updatePatient);

// Practioner routes
// GET /api/fhir/practitioners
// route to get all practitioners from the FHIR server
router.get("/practitioners", getPractitioners);

// GET /api/fhir/practitioners/:id
// route to get a practitioner by id
router.get("/practitioners/:id", getPractitionerById);

// POST /api/fhir/practitioners
// route to create a new practitioner
router.post("/practitioners", createPractitioner);

// PUT /api/fhir/practitioners/:id
// route to update a practitioner
router.put("/practitioners/:id", updatePractitioner);

// Observation routes

// GET /api/fhir/observations
// route to get all observations from the FHIR server
router.get("/observations", getAllObservations);

// GET /api/fhir/observations/:id
// route to get an observation by id
router.get("/observations/:id", getObservationById);

// GET /api/fhir/observations/patient/:patientId
// route to get observations by patient id
// tested and working
router.get("/observations/patient/:patientId", getObservationsByPatientId);

// GET /api/fhir/observations/patient/:patientId/date/:startDate/:endDate
// route to get observations by patient id and date range
router.get(
  "/observations/patient/:patientId/date/:startDate/:endDate",
  getObservationsByPatientIdAndDateRange
);

// POST /api/fhir/observations
// route to create a new observation
router.post("/observations", createObservation);

// PUT /api/fhir/observations/:id
// route to update an observation
router.put("/observations/:id", updateObservation);



// Encounter routes

// GET /api/fhir/encounters
// route to get all encounters from the FHIR server
router.get("/encounters", getEncounters);

// GET /api/fhir/encounters/:id
// route to get an encounter by id
router.get("/encounters/:id", getEncounter);

// POST /api/fhir/encounters
// route to create a new encounter
router.post("/encounters", createNewEncounter);

// PUT /api/fhir/encounters/:id
// route to update an encounter
router.put("/encounters/:id", updateExistingEncounter);






module.exports = router;
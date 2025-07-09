const express = require('express');
const axios = require('axios');
const { getPatients, getPatientById, createPatient, updatePatient } = require('../controllers/patient-controller');
const { getPractitioners, getPractitionerById, createPractitioner, updatePractitioner } = require('../controllers/practioner-controller');

// Initialize Express router
const router = express.Router();

// GET /api/fhir/patients
// route to get all patients from the FHIR server
router.get('/patients', getPatients);

// GET /api/fhir/patients/:id
// route to get a patient by id
router.get('/patients/:id', getPatientById);

// POST /api/fhir/patients
// route to create a new patient
router.post('/patients', createPatient);

// PUT /api/fhir/patients/:id
// route to update a patient
router.put('/patients/:id', updatePatient);


// Practioner routes
// GET /api/fhir/practitioners
// route to get all practitioners from the FHIR server
router.get('/practitioners', getPractitioners);

// GET /api/fhir/practitioners/:id
// route to get a practitioner by id
router.get('/practitioners/:id', getPractitionerById);

// POST /api/fhir/practitioners
// route to create a new practitioner
router.post('/practitioners', createPractitioner);

// PUT /api/fhir/practitioners/:id
// route to update a practitioner
router.put('/practitioners/:id', updatePractitioner);
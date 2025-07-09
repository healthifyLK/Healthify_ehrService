const { getPatients, getPatientById, createPatient, updatePatient } = require("../services/patient-service");

// controller for patient routes
// get all patients from the FHIR server
const getPatients = async (req, res) => {
  try {
    const { _count, _offset, name, identifier } = req.query;
    const patients = await getPatients({
      _count,
      _offset,
      name,
      identifier,
    });
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch patients", details: error.message });
  }
};

// get a patient by id
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch patient", details: error.message });
  }
};

// create a new patient
const createPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = await createPatient(patientData);
    res.status(201).json(newPatient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create patient", details: error.message });
  }
};

// update a patient
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patientData = req.body;
    const updatedPatient = await updatePatient(id, patientData);
    res.json(updatedPatient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update patient", details: error.message });
  }
};

module.exports = { getPatients, getPatientById, createPatient, updatePatient };

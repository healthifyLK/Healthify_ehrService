// Encounter Controller
const {
  getEncountersService,
  getEncounterByIdService,
  createEncounterService,
  updateEncounterService,
} = require("../services/encounter-service");

// Get all encounters
const getEncounters = async (req, res) => {
  try {
    const encounters = await getEncountersService(req.query);
    res.json(encounters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch encounters", details: error.message });
  }
};

// Get an encounter by id
const getEncounter = async (req, res) => {
  try {
    const encounterId = req.params.id;
    const encounter = await getEncounterByIdService(encounterId);
    res.json(encounter);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch encounter", details: error.message });
  }
};

// Create a new encounter
const createNewEncounter = async (req, res) => {
  try {
    const encounterData = req.body;
    const newEncounter = await createEncounterService(encounterData);
    res.status(201).json(newEncounter);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create encounter", details: error.message });
  }
};

// Update an encounter
const updateExistingEncounter = async (req, res) => {
  try {
    const encounterId = req.params.id;
    const encounterData = req.body;
    const updatedEncounter = await updateEncounterService(encounterId, encounterData);
    res.json(updatedEncounter);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update encounter", details: error.message });
  }
};

module.exports = {
  getEncounters,
  getEncounter,
  createNewEncounter,
  updateExistingEncounter,
};
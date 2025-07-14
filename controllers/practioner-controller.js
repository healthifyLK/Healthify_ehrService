const {
  getPractitionersService,
  getPractitionerByIdService,
  createPractitionerService,
  updatePractitionerService,
} = require("../services/practioner-service");

// controller for practioner routes
// get all practitioners from the FHIR server
const getPractitioners = async (req, res) => {
  try {
    const { _count, _offset, name } = req.query;
    const practitioners = await getPractitionersService({
      _count,
      _offset,
      name,
    });
    res.json(practitioners);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch practitioners", details: error.message });
  }
};

// get practioner by id
const getPractitionerById = async (req, res) => {
  try {
    const { id } = req.params;
    const practitioner = await getPractitionerByIdService(id);
    if (!practitioner) {
      return res.status(404).json({ error: "Practitioner not found" });
    }
    res.json(practitioner);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch practitioner", details: error.message });
  }
};

// create a new practitioner
const createPractitioner = async (req, res) => {
  try {
    const practitionerData = req.body;
    const newPractitioner = await createPractitionerService(practitionerData);
    res.status(201).json(newPractitioner);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create practitioner", details: error.message });
  }
};

// update a practitioner
const updatePractitioner = async (req, res) => {
  try {
    const { id } = req.params;
    const practitionerData = req.body;
    const updatedPractitioner = await updatePractitionerService(
      id,
      practitionerData
    );
    res.json(updatedPractitioner);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update practitioner", details: error.message });
  }
};

module.exports = {
  getPractitioners,
  getPractitionerById,
  createPractitioner,
  updatePractitioner,
};

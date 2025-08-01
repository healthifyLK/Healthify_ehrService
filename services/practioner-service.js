const { openmrsClient } = require("../services/openmrsService");
const { buildQueryParams } = require("../utills/validation");

// service for practioner routes
// get all practitioners from the FHIR server
// Tested and working
const getPractitionersService = async (params = {}) => {
  const queryString = buildQueryParams(params);
  const url = `/provider${queryString ? `?${queryString}` : ""}`;
  try {
    const response = await openmrsClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

// get a practitioner by id
// Tested and working
const getPractitionerByIdService = async (providerUuid) => {
  try {
    // 1. Get provider
    const providerRes = await openmrsClient.get(`/provider/${providerUuid}`);
    const provider = providerRes.data;

    // 2. Get person
    const personUuid = provider.person && provider.person.uuid;
    if (!personUuid) {
      throw new Error("Provider does not have a linked person.");
    }
    const personRes = await openmrsClient.get(`/person/${personUuid}`);
    console.log("personRes", personRes);
    const person = personRes.data;

    // 3. Defensive check for names

    return {
      uuid: provider.uuid,
      identifier: provider.identifier,
      name: person.display,
      gender: person.gender || null,
      birthdate: person.birthdate || null,
    };
  } catch (error) {
    console.error("Error fetching provider by id:", error);
    throw error;
  }
};

// create a new practitioner
// Tested and working
const createPractitionerService = async (practitionerData) => {
  try {
    console.log("practitionerData", practitionerData);
    //  Create the person first
    const personPayload = {
      names: [
        {
          givenName: practitionerData.givenName,
          familyName: practitionerData.familyName,
        },
      ],
      gender: practitionerData.gender,
      birthdate: practitionerData.birthdate,
      addresses: practitionerData.addresses || [],
    };

    const personResponse = await openmrsClient.post("/person", personPayload);
    console.log("personResponse", personResponse);
    const personUuid = personResponse.data.uuid;

    // Create the provider using person uuid
    const providerPayload = {
      person: personUuid,
      identifier: practitionerData.identifier,
      attributes: practitionerData.attributes || [],
    };
    const providerResponse = await openmrsClient.post(
      "/provider",
      providerPayload
    );
    console.log("providerResponse", providerResponse);
    return providerResponse.data;
  } catch (error) {
    console.error(
      "Error creating provider:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update a practitioner
// Tested and working
const updatePractitionerService = async (providerUuid, updateData) => {
  try {
    // 1. Get provider to find person UUID
    const providerRes = await openmrsClient.get(`/provider/${providerUuid}`);
    const provider = providerRes.data;
    const personUuid = provider.person && provider.person.uuid;
    if (!personUuid) throw new Error("Provider does not have a linked person.");

    // 2. Update person details if present
    const personUpdatePayload = {};
    if (updateData.givenName || updateData.familyName) {
      personUpdatePayload.names = [
        {
          givenName: updateData.givenName || provider.person.givenName,
          familyName: updateData.familyName || provider.person.familyName,
        },
      ];
    }
    if (updateData.gender) personUpdatePayload.gender = updateData.gender;
    if (updateData.birthdate)
      personUpdatePayload.birthdate = updateData.birthdate;
    if (Object.keys(personUpdatePayload).length > 0) {
      await openmrsClient.post(`/person/${personUuid}`, personUpdatePayload);
    }

    // 3. Update provider identifier if present
    if (updateData.identifier) {
      await openmrsClient.post(`/provider/${providerUuid}`, {
        identifier: updateData.identifier,
      });
    }

    // 4. Return updated provider details
    return await getPractitionerByIdService(providerUuid);
  } catch (error) {
    console.error(
      "Error updating practitioner:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  getPractitionersService,
  getPractitionerByIdService,
  createPractitionerService,
  updatePractitionerService,
};

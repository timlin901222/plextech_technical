const Ajv = require("ajv/dist/jtd")
const ajv = new Ajv()
const fs = require("fs");


const pet_schema = {
    // TODO: Complete schema
        // - Utilize Pet Schema in spec
        // - Use Ajv JSON Type Definition: https://ajv.js.org/json-type-definition.html
};

const isValid = ajv.compile(pet_schema);

// TODO: Add more test data to work with
    // - Test data must be an array of 'Pet' objects
    // - Private data (should NOT be exported)
const data = require("../data/sample_starter.json");

// A naive solution for persistent data
const saveToFile = function () {
    fs.writeFileSync("src/data/sample_starter.json", JSON.stringify(data, null, 2));
}

/* CONTROLLER FUNCTIONS */

/* Adds a new Pet object to 'data'. Validates input data
    and returns true if successful, otherwise false. */
exports.createPet = function (pet) {
    // checks 'pet' according to Ajv schema you defined above
    if (!isValid(pet)) {
        return false;
    }
    // TODO: Consider edge case

    data.push(pet);
    saveToFile();
    return true;
};

/* Returns Pet object as specified by 'id' */
exports.getPetById = function (id) {
    const pet = data.find(
        element => element.id === id
    );
    // TODO: Consider edge case

    return pet;
};

// TODO: complete filter functions
exports.getPetsByStatus = null;
exports.getPetsByTags = null;

/* Executes a full replace with the input pet data. Returns true 
    if successful, otherwise false  */
exports.updatePetById = function (pet) {
    // checks 'pet' according to Ajv schema you defined above
    if (!isValid(pet)) {
        return false;
    }

    // TODO: execute a full replace based on pet.id
}

/* Deletes Pet object as specified by 'id'. Returns true 
    if successful, otherwise false  */
exports.deletePet = function (id) {
    const petIndex = data.findIndex(
        element => element.id === id
    );
    // TODO: Consider edge case

    data.splice(petIndex, 1);
    saveToFile();
    return true;
};
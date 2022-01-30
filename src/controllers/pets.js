const Ajv = require("ajv/dist/jtd")
const ajv = new Ajv()
const fs = require("fs");


const pet_schema = {
    // TODO: Complete schema
        // - Utilize Pet Schema in spec
        // - Use Ajv JSON Type Definition: https://ajv.js.org/json-type-definition.html
        properties: {
            id: {type: "uint32"},
            name: {type: "string"},
            photoUrls: {
                elements: {
                    type: "string"
                }
            },
            tags: {
                elements: {
                    type: "string"
                }
            },
            status: { enum: ["available", "pending", "sold"]},
            

        },
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
    const new_pet = data.find(
        element => element.id === pet.id
    )
    if (new_pet !== undefined) {
        return -1;
    }

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
    if (pet === undefined) {
        return null;
    }

    return pet;
};

// TODO: complete filter functions
exports.getPetsByStatus = function (status) {
    let error = false;
    const stats = pet_schema.properties.status.enum;
    status.forEach(element => {
        if (!stats.includes(element)) {
            error = true;
        }
    });
    if (error) {
        return null;
    }
    return data.filter(element => status.includes(element.status));;
};
exports.getPetsByTags = function (tags) {
    const result = data.filter(
        element => element.tags.filter(
            el => tags.includes(el)
        ).length > 0
    );
    
    if (result.length === 0) {
        return null;
    }
    return result;
};

/* Executes a full replace with the input pet data. Returns true 
    if successful, otherwise false  */
exports.updatePetById = function (pet) {
    // checks 'pet' according to Ajv schema you defined above
    if (!isValid(pet)) {
        return -2;
    }
    // edge case where id doesn't exist
    const checkPet = data.find(
        element => element.id === pet.id
    );
    if (checkPet === undefined) {
        return -1;
    }

    exports.deletePet(pet.id);
    exports.createPet(pet);
    return 0;
}

/* Deletes Pet object as specified by 'id'. Returns true 
    if successful, otherwise false  */
exports.deletePet = function (id) {
    const petIndex = data.findIndex(
        element => element.id === id
    );
    // TODO: Consider edge case
    
    if (petIndex === -1) {
        return false;
    }

    data.splice(petIndex, 1);
    saveToFile();
    return true;
};
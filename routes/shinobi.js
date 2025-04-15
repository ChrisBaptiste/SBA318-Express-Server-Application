// Importing express for routing
const express = require("express");
// Creating router for our routes
const router = express.Router();
// Importing path module for handling file paths
const path = require("path");
// Importing fs for file system operations
const fs = require("fs");

// Joining path to our ninjaData.json file
const dataPath = path.join(__dirname, "../data/ninjaData.json");

// Creating helper function for reading ninjas data from file
function getNinjas() {
  // Reading file content and parsing it into a JSON object
  return JSON.parse(fs.readFileSync(dataPath));
}

// Creating helper function for saving ninjas data to file
function saveNinjas(data) {
  // Converting data to JSON string and writing to file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Setting up route for getting all ninjas (with optional filtering by village)
router.get("/", (req, res) => {
  // Getting all ninjas from file
  const ninjas = getNinjas();
  // Getting village from query parameter
  const village = req.query.village;
  let filtered;
  // Checking if village parameter is provided
  if (village) {
    // Filtering ninjas by village
    filtered = ninjas.filter(function(n) {
      return n.village === village;
    });
  } else {
    // Using all ninjas if no village parameter is given
    filtered = ninjas;
  }
  // Rendering index view with ninjas data
  res.render("index", { ninjas: filtered });
});

// Setting up route for showing form to add a new ninja
router.get("/new", (req, res) => {
  // Rendering the form view
  res.render("form");
});

// Setting up route for posting a new ninja to the file
router.post("/", (req, res) => {
  // Getting all ninjas from file
  const ninjas = getNinjas();
  let newId;
  // Checking if there are any ninjas and assigning new id accordingly
  if (ninjas.length > 0) {
    // Getting new id by incrementing the last ninja's id
    newId = ninjas[ninjas.length - 1].id + 1;
  } else {
    // Setting id to 1 if no ninjas exist
    newId = 1;
  }
  // Logging adding new ninja with id for debugging
  console.log("Adding new ninja with id:", newId);
  // Creating new ninja object by adding an id to the form data
  const newNinja = { id: newId, ...req.body };
  // Pushing the new ninja to the ninjas array
  ninjas.push(newNinja);
  // Saving the updated ninjas array to file
  saveNinjas(ninjas);
  // Redirecting back to the shinobi page
  res.redirect("/shinobi");
});

// Setting up route for getting a single ninja by id
router.get("/:id", (req, res) => {
  // Getting all ninjas from file
  const ninjas = getNinjas();
  // Finding the ninja with the matching id
  const ninja = ninjas.find(function(n) {
    return n.id == req.params.id;
  });
  // Checking if ninja is not found
  if (!ninja) {
    console.log("Not finding ninja with id:", req.params.id);
    // Sending 404 error if ninja is not found
    return res.status(404).send("Ninja not found");
  }
  // Returning the ninja data in JSON format
  res.json(ninja);
});

// Setting up route for updating a ninja
router.post("/:id/update", (req, res) => {
  // Getting all ninjas from file
  const ninjas = getNinjas();
  let idx = -1;
  // Looping through ninjas to find matching id
  for (let i = 0; i < ninjas.length; i++) {
    if (ninjas[i].id == req.params.id) {
      idx = i;
      break;
    }
  }
  // Checking if ninja is not found
  if (idx === -1) {
    console.log("Not finding ninja to update with id:", req.params.id);
    // Sending 404 error if ninja is not found
    return res.status(404).send("Ninja not found");
  }
  // Merging existing ninja data with new form data
  ninjas[idx] = { ...ninjas[idx], ...req.body };
  // Saving the updated ninjas array to file
  saveNinjas(ninjas);
  // Redirecting back to the shinobi page
  res.redirect("/shinobi");
});

// Setting up route for deleting a ninja
router.post("/:id/delete", (req, res) => {
  // Getting all ninjas from file
  let ninjas = getNinjas();
  // Filtering ninjas to remove the one with the matching id
  ninjas = ninjas.filter(function(n) {
    return n.id != req.params.id;
  });
  // Saving the updated ninjas array to file
  saveNinjas(ninjas);
  // Redirecting back to the shinobi page
  res.redirect("/shinobi");
});

// Exporting router to use in our app
module.exports = router;

const express = require("express");
const router = express.Router();

// Creating in memory storage for ninjas array
let ninjas = [];

// Setting up route for getting all ninjas (with optional filtering by village)
router.get("/", (req, res) => {
    var filtered = [];
    var village = req.query.village;
    if (village) {
      // Filtering ninjas by village
      for (var i = 0; i < ninjas.length; i++) {
        if (ninjas[i].village === village) {
          filtered.push(ninjas[i]);
        }
      }
    } else {
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

  // Setting up route for posting a new ninja to memory
router.post("/", (req, res) => {
    var newId;
    if (ninjas.length > 0) {
      // Incrementing last ninja's id by 1
      newId = ninjas[ninjas.length - 1].id + 1;
    } else {
      // Setting id to 1 if no ninjas exist
      newId = 1;
    }
    
     // Logging new ninja creation for debugging
  console.log("Adding new ninja with id: " + newId);
  // Creating new ninja object by adding an id to the form data
  var newNinja = {
    id: newId,
    name: req.body.name,
    village: req.body.village,
    chakraLevel: req.body.chakraLevel,
    jutsu: req.body.jutsu,
    image: req.body.image
  };
  // Adding new ninja to the array
  ninjas.push(newNinja);
  // Redirecting back to the shinobi page
  res.redirect("/shinobi");
});

// Setting up route for getting a single ninja by id (returning JSON)
router.get("/:id", (req, res) => {
    var ninja = null;
    // Looping through ninjas to find matching id
    for (var i = 0; i < ninjas.length; i++) {
      if (ninjas[i].id == req.params.id) {
        ninja = ninjas[i];
        break;
      }
    }
    // Checking if ninja is not found
    if (ninja === null) {
      console.log("Not finding ninja with id: " + req.params.id);
      return res.status(404).send("Ninja not found");
    }
    // Returning ninja data in JSON format
    res.json(ninja);
  });
  

  // Setting up route for updating a ninja
router.post("/:id/update", (req, res) => {
    var idx = -1;
    // Looping through ninjas to find matching id
    for (var i = 0; i < ninjas.length; i++) {
      if (ninjas[i].id == req.params.id) {
        idx = i;
        break;
      }
    }
    // Checking if ninja is not found
    if (idx === -1) {
      console.log("Not finding ninja to update with id: " + req.params.id);
      return res.status(404).send("Ninja not found");
    }
    // Updating ninja details with new form data
    if (req.body.name) {
      ninjas[idx].name = req.body.name;
    }
    if (req.body.village) {
      ninjas[idx].village = req.body.village;
    }
    if (req.body.chakraLevel) {
      ninjas[idx].chakraLevel = req.body.chakraLevel;
    }
    if (req.body.jutsu) {
      ninjas[idx].jutsu = req.body.jutsu;
    }
    if (req.body.image) {
      ninjas[idx].image = req.body.image;
    }
    // Redirecting back to the shinobi page
    res.redirect("/shinobi");
  });
  
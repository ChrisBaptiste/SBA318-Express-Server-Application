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
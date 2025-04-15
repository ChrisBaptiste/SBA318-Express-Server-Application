const express = require("express");
const router = express.Router();

// Creating storage for ninjas array
let ninjas = [
  {
    id: 1,
    name: "Hashirama Senju",
    village: "Konoha",
    chakraLevel: 100,
    jutsu: "Wood Release",
    image: "Hashirama.png"  
  },
  {
    id: 2,
    name: "Itachi Uchiha",
    village: "Konoha",
    chakraLevel: 77,
    jutsu: "Amaterasu",
    image: "Itachi.png"    
  },
  {
    id: 3,
    name: "Pain Uzumaki",
    village: "Hidden Rain",
    chakraLevel: 97,
    jutsu: "Almighty Push",
    image: "Pain.png"     
  },
  {
    id: 4,
    name: "Sasuke Uchiha",
    village: "Konoha",
    chakraLevel: 88,
    jutsu: "Chidori",
    image: "Sasuke.png"     
  },
  {
    id: 5,
    name: "Kakashi Hatake",
    village: "Konoha",
    chakraLevel: 55,
    jutsu: "Lightning Blade",
    image: "Kakashi.png"   
  },
  {
    id: 6,
    name: "Madara Uchiha",
    village: "Konoha",
    chakraLevel: 94,
    jutsu: "Susanoo",
    image: "Madara.png"     
  },
  {
    id: 7,
    name: "Jiraya",
    village: "Konoha",
    chakraLevel: 85,
    jutsu: "Toad Sage",
    image: "Jiraya.png"   
  },
  {
    id: 8,
    name: "Lee",
    village: "Konoha",
    chakraLevel: 80,
    jutsu: "7 gates",
    image: "Lee.png"   
  },
  {
    id: 9,
    name: "Obito",
    village: "Konoha",
    chakraLevel: 93,
    jutsu: "Kamui",
    image: "Obito.png"   
  },
  {
    id: 10,
    name: "Minato Namikaze",
    village: "Konoha",
    chakraLevel: 80,
    jutsu: "Flying Raijin",
    image: "Minato.png"   
  },
];

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
  


// Setting up route for deleting a ninja
router.post("/:id/delete", (req, res) => {
    var updatedNinjas = [];
    // Looping through ninjas and keeping only those not matching the id
    for (var i = 0; i < ninjas.length; i++) {
      if (ninjas[i].id != req.params.id) {
        updatedNinjas.push(ninjas[i]);
      }
    }
    // Updating ninjas array
    ninjas = updatedNinjas;
    // Redirecting back to the shinobi page
    res.redirect("/shinobi");
  });
  
  // Exporting router to use in our app
  module.exports = router;
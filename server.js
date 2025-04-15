const express = require("express");
const path = require("path");

// Importing the custom logger middleware
const logger = require("./middleware/logger");
// Importing the custom error handler middleware
const errorHandler = require("./middleware/errorHandler");
// Importing our shinobi routes
const shinobiRoutes = require("./routes/shinobi");

// Creating our express app
const app = express();

// Setting our view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Using built-in middleware for parsing URL encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using our custom logger middleware for logging each request
app.use(logger);

// Serving static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Routing requests to our shinobi routes
app.use("/shinobi", shinobiRoutes);

// Using our custom error handler middleware for catching errors
app.use(errorHandler);

// Starting our server on port 3000 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Starting server on port " + port);
});
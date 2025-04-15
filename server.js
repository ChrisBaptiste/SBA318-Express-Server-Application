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
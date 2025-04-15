// Creating middleware for logging each request
function logger(req, res, next) {
    // Logging current time, request method, and URL
    console.log("Logging request method and URL: " + req.method + " " + req.url);
    // Moving to next middleware
    next();
  }
  
  module.exports = logger;
  
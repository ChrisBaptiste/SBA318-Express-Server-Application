// Creating middleware for catching errors
function errorHandler(err, req, res, next) {
    // Logging error stack for debugging
    console.error("Catching erroring: " + err.stack);
    // Responding with a 404 error and a ninja message
    res.status(404).send("Uh oh, a ninja error is happening!");
  }
  
  module.exports = errorHandler;
  
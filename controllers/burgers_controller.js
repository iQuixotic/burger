// express and the router are necessary to access the different routes
const express = require("express");

const router = express.Router();

// Import burger js to use its database functions.
const burger = require("../models/burger.js");

// PLEASE NOTE: req and res will be coming in from the router, aka express.Router()

// handlebars object will use provided data as the burger element's property
router.get("/", function(req, res) {
  burger.all(function(data) {
    
    let hbsObj = {
      burgers: data
    };
    // cb res.render and pass through 'index' and { burger: data }
    res.render("index", hbsObj);
  });
});

router.post("/api/burgers", function(req, res) {
  //the burger.create being called here will take 2 arrays and a callback function as perameters.
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  let con = "id = " + req.params.id;

  console.log("condition", con);

  burger.update({
    devoured: req.body.devoured
  }, con, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  let con = "id = " + req.params.id;

  burger.delete(con, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

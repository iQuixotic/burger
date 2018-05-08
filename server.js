const express = require('express');
const bodyParser = require('body-parser');

// 3306 on local machine and whatever port it is told to be on on heroku
var PORT = process.env.PORT || 3036;

//set up express
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Set up handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require the burgers controller so that I can connect all my routes and set up my database
routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start the server
app.listen(PORT, function() {

  console.log("Server listening on: http://localhost:" + PORT);
});
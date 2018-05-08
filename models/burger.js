// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

// use the orm object from the config folder on a 'burger' object that will then be passed 
// on to a controller in another file. the burger object will have 4 methods (CRUD)
let burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
 
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(ocv, con, cb) {
    orm.update("burgers", ocv, con, function(res) {
      cb(res);
    });
  },
  delete: function(con, cb) {
    orm.delete("burgers", con, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller at burgers_contorller.js
module.exports = burger;

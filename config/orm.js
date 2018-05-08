// we need the mySQL connection to run the orm.js properly
const connection = require("../config/connection.js");


// These functions will help the orm function structure querys based on javascript
// they will only be called inside the orm object

// function will print out the number of ? as needed for the query and push them 
// into an array. Each ? will then be turned into a string per sql syntax.
function qMarks(howMany) {
  let arr = [];

  for (let i = 0; i < howMany; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  let arr = [];

  // should run like a forEach loop 
  for (let key in obj) {
    let value = obj[key];

    if (Object.hasOwnProperty.call(obj, key)) {
    
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
     //this will push everything into an array, in which each object's 'property=value'
     //so that it will be readable by sql
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}


// We will export this entire object later to enable an easier translation from javascript to sql language.

// Object for all our SQL statement functions.
// after exporting, we should be able to call:
//CRUD on the MySQL table
// 1.) orm.all(a,b), 2.) orm.create(a,b,c,d), 3.) orm.update(a,b,c,d), or 4.) orm.delete(a,b,c)
// each method of the orm object needs a connection.query and a callback function ()
let orm = {
  all: function(tableDesc, cb) {
    var queryString = "SELECT * FROM " + tableDesc + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(tableDesc, cols, vals, cb) {
    var queryString = "INSERT INTO " + tableDesc;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += qMarks(vals.length);
    queryString += ") ";


    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // ex. UPDATE burgers SET 'name=burgenator' WHERE (condition to be specified)
  update: function(tableDesc, ocv, con, cb) {
    var queryString = "UPDATE " + tableDesc;

    queryString += " SET ";
    queryString += objToSql(ocv);
    queryString += " WHERE ";
    queryString += con;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // ex. DELETE FROM burgers WHERE (condition to be specified)
  delete: function(tableDesc, con, cb) {
    var queryString = "DELETE FROM " + tableDesc;
    queryString += " WHERE ";
    queryString += con;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// export the entire object
module.exports = orm;

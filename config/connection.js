// Set up MySQL connection.
const mysql = require("mysql");

// my connection set up. the 3306 port might need to be changed when I export maybe...
// this should set up everything from the router to connect with mySQL

// const connection = mysql.createConnection({
//   port: 3306,
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "burger_db"
// });



if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

 connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "burger_db"
});
};



connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Export connection for our ORM to use.
module.exports = connection;
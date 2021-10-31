var connection = require("./mysql/connection");

connection.connect();

connection.query("USE stugamez;", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();

var connection = require("./mysql/connection");

connection.connect();

connection.query("SHOW DATABASES;", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
  console.log("Testing AWS connection...");
});

connection.end();

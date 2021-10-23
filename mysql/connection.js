var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "stugamez-db.caaiabnohw5j.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "05$cjVcEsvT%",
  database: "stugamez",
});

module.exports = connection;

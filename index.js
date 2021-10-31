const express = require("express");
const app = express();
const port = 8000;

// Cors is necessary if using chrome developer tools and developing locally.
// Otherwise, cross-origin referencing errors will happen.
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

var connection = require("./mysql/connection");

app.post("/games", (req, res) => {
  console.log(req.body);
  res.send("Game Added!");
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
  connection.connect();
  connection.query("USE stugamez;", (error, results, fields) => {
    if (error) throw error;
    console.log("Successful connection to AWS...");
  });
});

var express = require("express");
var router = express.Router();
var connection = require("../mysql/connection");

router.post("/", (req, res) => {
  res.send("Tying to POST /games");
});

router.get("/", (req, res) => {
  res.send("Trying to GET /games");
});

module.exports = router;

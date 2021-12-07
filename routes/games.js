var express = require("express");
var router = express.Router();
var connection = require("../mysql/connection");

connection.connect();

router.post("/", (req, res) => {
  console.log("POST Request to /games");
  console.log(req.body.title);
  console.log(req.body.price);
  console.log(req.body.publisher);
  console.log(req.body.trailerLink);
  console.log(req.body.imgLink);
  console.log(req.body.criticScore);
  console.log(req.body.criticScoreCount);
  console.log(req.body.userScore);
  console.log(req.body.userScoreCount);
  console.log(req.body.positiveCount);
  console.log(req.body.negativeCount);
  console.log(req.body.discountPrice);
  console.log(req.body.discountPercent);
  console.log(req.body.website);
  /*
  connection.query(`
    CALL add_game(

    );
  `, function (error, results, fields) {
    if (error) throw error;

  }
  );
  */
  res.send();
});

router.get("/", (req, res) => {
  res.send("Trying to GET /games");
});

module.exports = router;

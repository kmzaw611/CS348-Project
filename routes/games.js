var express = require("express");
var router = express.Router();
var connection = require("../mysql/connection");

connection.connect(function (err) {
  if (err) throw err;

  connection.query("USE stugamez;");
});

router.post("/", (req, res) => {
  console.log("POST Request to /games");

  connection.query(
    `
    CALL add_game(
      "${req.body.title}",
      ${req.body.price},
      "${req.body.publisher}",
      "${req.body.trailerLink}",
      "${req.body.imgLink}",
      ${req.body.criticScore},
      ${req.body.criticScoreCount},
      ${req.body.userScore},
      ${req.body.userScoreCount},
      ${req.body.positiveCount},
      ${req.body.negativeCount},
      ${req.body.discountPrice},
      ${req.body.discountPercent},
      "${req.body.website}"
    );
  `,
    function (error, results, fields) {
      if (error) throw error;
      console.log("POST Request /games successful: game discount added.");
    }
  );

  res.send();
});

router.get("/", (req, res) => {
  console.log("GET Request to /games");

  connection.query(
    `
    SELECT G.game_id, G.title, MD.img_link
    FROM games G JOIN metadata MD
    ON G.meta_id = MD.meta_id; 
  `,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

module.exports = router;

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
    function (error) {
      if (error) throw error;
      console.log("POST Request /games successful: game discount added.");
    }
  );

  res.send();
});

router.get("/game-info", (req, res) => {
    console.log("GET Request to /game-info");
    //Need name, title, price, publisher, img_link, trailer_link, website, discount price, discount percentage, critic score, user score
    let query = `
    SELECT G.game_id, G.title, G.price, G.publisher, MD.img_link, MD.trailer_link, 
D.website, D.discounted_price, D.discounted_percentage, MC.critic_score, MC.user_score,
S.positive_count, S.negative_count
    FROM games G JOIN metadata MD
    ON G.meta_id = MD.meta_id JOIN discounts D
    ON G.discount_id = D.discount_id JOIN metacritic MC
    ON G.metacritic_id = MC.metacritic_id
    JOIN steam S
    ON G.steam_id = S.steam_id
    WHERE G.game_id = ?
  `;

    connection.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED;");
    connection.query("START TRANSACTION;");
    connection.query(query, [req.query.game_id], function (error, results, fields) {
        if (error) throw error;

        connection.query("COMMIT;");
        res.send(JSON.parse(JSON.stringify(results)));
    });
});

router.get("/", (req, res) => {
    console.log("GET Request to /games");

  let query = `
    SELECT G.game_id, G.title, MD.img_link, D.discounted_price, D.discounted_percentage
    FROM games G JOIN metadata MD
    ON G.meta_id = MD.meta_id
    JOIN discounts D
    ON G.discount_id = D.discount_id
  `;
  
  if (req.query.hasFilter) {
    console.log("GET Request with filters");

    query += `
      JOIN metacritic MC
      ON G.metacritic_id = MC.metacritic_id  
      WHERE MC.critic_score >= ${req.query.critic_low} AND
      MC.critic_score <= ${req.query.critic_high} AND
      MC.user_score >= ${req.query.user_low} AND
      MC.user_score <= ${req.query.user_high} AND
      D.discounted_price >= ${req.query.price_low} AND
      D.discounted_price <= ${req.query.price_high}
    `;
  }
  
  query += ";";

  connection.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED;");
  connection.query("START TRANSACTION;");
  connection.query(query, function (error, results, fields) {
    if (error) throw error;

    connection.query("COMMIT;");
    res.send(JSON.parse(JSON.stringify(results)));
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var connection = require("../mysql/connection");

//post insert_into 
router.post("/", (req, res) => {
    console.log("POST Request to /wishlist");

    
    connection.query(
        `INSERT INTO wishlist (game_id, title)
         VALUES(${req.body.g_id}, "${req.body.gtitle}")
        `,
        function (error) {
            if (error) console.log("DUPE",error);
            //console.log("POST Request /wishlist successful: game added to wishlist.");
        }

    );

    res.send();
});

router.delete("/", (req, res) => {
    console.log("REPLACE TO /wishlist");

    //let query =
     //   `DELETE FROM wishlist
      //   Where game_id = ${req.body.g_id}
        //`;
    connection.query(
        `DELETE FROM wishlist
         Where game_id = ${req.query.answer}
        `,
        function (error) {
            if (error) console.log("remove error", error);
        }
    );
        //console.log(JSON.parse(JSON.stringify(results)));
        res.send();
});


router.get("/", async (req, res) => {
    console.log("GET Request to /wishlist");

    /*let query = `
    SELECT G.game_id, G.title, G.price, D.discounted_price
    FROM games G
    JOIN discounts D
    ON G.discount_id = D.discount_id
  `;*/
    let query = `
     SELECT Distinct w.game_id, w.title, g.price, d.discounted_price
     From wishlist w, games g, discounts d
     Where w.game_id = g.game_id AND g.discount_id = d.discount_id
    `;

 
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        //console.log("hi");
        //console.log(JSON.parse(JSON.stringify(results)));
        res.send(JSON.parse(JSON.stringify(results)));
    });
});

module.exports = router;

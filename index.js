const express = require("express");
const app = express();
const port = process.env.port || 8000;

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
  const title = req.body.title;
  const price = req.body.price;
  const publisher = req.body.publisher;
  connection.query(
    `INSERT INTO games(title, price, publisher) VALUES("${title}", ${price}, "${publisher}");`
  );
});

app.get("/games", (req, res) => {
  connection.query(
    "SELECT title, price, publisher FROM games;",
    (error, result) => {
      if (error) throw error;

      games = [];
      for (let i = 0; i < result.length; i++) {
        game = {
          title: result[i].title,
          price: result[i].price,
          publisher: result[i].publisher,
        };
        games.push(game);
      }
      res.send(games);
      // console.log("Results:");
      // console.log(result);
    }
  );
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
  connection.connect();
  connection.query("USE stugamez;", (error) => {
    if (error) throw error;
    console.log("Successful connection to AWS...");
  });
});

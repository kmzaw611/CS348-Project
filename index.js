const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Import routes for game-related API calls.
var gameRoutes = require("./routes/games");
app.use("/games", gameRoutes);

var wishlistRoute = require("./routes/wishlist");
app.use("/wishlist", wishlistRoute);
// You guys can implement your own routers in /routes and import them here below.

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

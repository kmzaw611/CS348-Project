import React, { useEffect, useState } from "react";
import axios from "axios";

function MainPage(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Get list of games from the database to show on the main screen.
    const getGames = async () => {
      const response = await axios.get(
        "https://stugamez-backend.herokuapp.com/games"
      );
      setGames(response.data);
    };
    getGames();
  }, []);

  const renderedGames = games.map((game) => {
    return (
      <div>
        <h2>Title: {game.title}</h2>
        <h3>Price: {game.price}</h3>
        <h3>Publisher: {game.publisher}</h3>
      </div>
    );
  });

  const addNewGame = async () => {
    if (title === "" || publisher === "") return;

    await axios.post(
      "https://stugamez-backend.herokuapp.com/games",
      {
        title,
        price,
        publisher,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      <h1>StuGameZ</h1>
      <div>
        <form>
          <label style={{ margin: "10px" }}>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <br />
          <label style={{ margin: "10px" }}>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label style={{ margin: "10px" }}>
            Publisher:
            <input
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </label>
          <br />
          <button style={{ margin: "10px" }} onClick={addNewGame}>
            Add Game
          </button>
        </form>
      </div>

      <br />
      <button style={{ margin: "10px" }}>Report Discount</button>
      <br />
      <button style={{ margin: "10px" }}>Wishlist</button>

      <div>{renderedGames}</div>
    </div>
  );
}

export default MainPage;

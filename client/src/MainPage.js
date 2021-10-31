import React, { useState } from "react";
import axios from "axios";

function MainPage(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [publisher, setPublisher] = useState("");

  const addNewGame = async () => {
    if (title === "" || publisher === "") return;

    await axios.post(
      "http://localhost:8000/games",
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
    </div>
  );
}

export default MainPage;

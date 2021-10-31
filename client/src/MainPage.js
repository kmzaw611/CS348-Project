import React, { useState } from "react";

function MainPage(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [publisher, setPublisher] = useState("");

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
          <button type="submit" style={{ margin: "10px" }}>
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

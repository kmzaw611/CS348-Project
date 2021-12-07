import React, { useState } from "react";
import "./styles/MainPage.css";
import { getAPIDomain } from "./utils";
import {
  Button,
  Header,
  Grid,
  Segment,
  Modal,
  Image,
  Form,
} from "semantic-ui-react";
import axios from "axios";
import game_discount from "./assets/game_discount.png";

function MainPage(props) {
  const apiDomain = getAPIDomain();
  const [openAdd, setOpenAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [publisher, setPublisher] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [criticScore, setCriticScore] = useState(null);
  const [criticScoreCount, setCriticScoreCount] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [userScoreCount, setUserScoreCount] = useState(null);
  const [positiveCount, setPositiveCount] = useState(null);
  const [negativeCount, setNegativeCount] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(null);
  const [website, setWebsite] = useState("");

  function resetInputFields() {
    // Hard reset function to call when we pull up a new form.
    setTitle("");
    setPrice(null);
    setPublisher("");
    setTrailerLink("");
    setImgLink("");
    setCriticScore(null);
    setCriticScoreCount(null);
    setUserScore(null);
    setUserScoreCount(null);
    setPositiveCount(null);
    setNegativeCount(null);
    setDiscountPrice(null);
    setDiscountPercent(null);
    setWebsite("");
  }

  async function addGame() {
    axios.post(apiDomain + "/games", {
      title,
      price,
      publisher,
      trailerLink,
      imgLink,
      criticScore,
      criticScoreCount,
      userScore,
      userScoreCount,
      positiveCount,
      negativeCount,
      discountPrice,
      discountPercent,
      website,
    });
  }

  return (
    <div className="container">
      <Header as="h1" className="main-title">
        StuGameZ
      </Header>

      <Grid columns={2} divided>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Segment className="left-menu">
              <Modal
                closeIcon
                dimmer="blurring"
                onClose={() => setOpenAdd(false)}
                onOpen={() => setOpenAdd(true)}
                open={openAdd}
                trigger={
                  <Button className="menu-button" onClick={resetInputFields}>
                    Report A Game Discount
                  </Button>
                }
              >
                <Modal.Header>Report A Game Discount</Modal.Header>
                <Modal.Content image scrolling>
                  <Image size="medium" src={game_discount} wrapped />
                  <Modal.Description>
                    <Form>
                      <Header as="h3">Game Information</Header>
                      <Form.Field>
                        <label>Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Title..."
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Price</label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Price..."
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Publisher</label>
                        <input
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                          placeholder="Publisher..."
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Trailer Link</label>
                        <input
                          value={trailerLink}
                          onChange={(e) => setTrailerLink(e.target.value)}
                          placeholder="Trailer Link..."
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Image Link</label>
                        <input
                          value={imgLink}
                          onChange={(e) => setImgLink(e.target.value)}
                          placeholder="Image Link..."
                        />
                      </Form.Field>

                      <Header as="h3">Rating Information</Header>
                      <Form.Field>
                        <label>Metacritic Critic Score</label>
                        <input
                          value={criticScore}
                          onChange={(e) => setCriticScore(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Critic Score Count</label>
                        <input
                          value={criticScoreCount}
                          onChange={(e) => setCriticScoreCount(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Metacritic User Score</label>
                        <input
                          value={userScore}
                          onChange={(e) => setUserScore(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>User Score Count</label>
                        <input
                          value={userScoreCount}
                          onChange={(e) => setUserScoreCount(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Steam Positive Count</label>
                        <input
                          value={positiveCount}
                          onChange={(e) => setPositiveCount(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Steam Negative Count</label>
                        <input
                          value={negativeCount}
                          onChange={(e) => setNegativeCount(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>

                      <Header as="h3">Discount Information</Header>
                      <Form.Field>
                        <label>Discounted Price</label>
                        <input
                          value={discountPrice}
                          onChange={(e) => setDiscountPrice(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Discounted Price Percentage</label>
                        <input
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(e.target.value)}
                          placeholder="0"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Discount Website</label>
                        <input
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="Discount Website..."
                        />
                      </Form.Field>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
                <br />
                <Modal.Actions>
                  <Button basic onClick={() => setOpenAdd(false)} negative>
                    Cancel
                  </Button>
                  <Button
                    basic
                    onClick={() => {
                      setOpenAdd(false);
                      addGame();
                    }}
                    positive
                  >
                    Add Game
                  </Button>
                </Modal.Actions>
              </Modal>

              <br />

              <Button className="menu-button">Build A Wishlist</Button>

              <br />

              <Button className="menu-button">Advanced Filter</Button>
            </Segment>
          </Grid.Column>

          <Grid.Column width={12}>
            <Segment className="right-display">
              <Header as="h2">Current Discounts</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default MainPage;

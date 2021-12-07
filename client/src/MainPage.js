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
import game_discount from "./assets/game_discount.png";

function MainPage(props) {
  const apiDomain = getAPIDomain();
  const [openAdd, setOpenAdd] = useState(false);

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
                  <Button className="menu-button">
                    Report A Game Discount
                  </Button>
                }
              >
                <Modal.Header>Report A Game Discount</Modal.Header>
                <Modal.Content image>
                  <Image size="medium" src={game_discount} wrapped />
                  <Modal.Description>
                    <Form>
                      <Header as="h3">Game Information</Header>
                      <Form.Field>
                        <label>Name</label>
                        <input placeholder="Name..." />
                      </Form.Field>
                      <Form.Field>
                        <label>Price</label>
                        <input placeholder="Price..." />
                      </Form.Field>
                      <Form.Field>
                        <label>Publisher</label>
                        <input placeholder="Publisher..." />
                      </Form.Field>
                      <Form.Field>
                        <label>Trailer Link</label>
                        <input placeholder="Trailer Link..." />
                      </Form.Field>
                      <Form.Field>
                        <label>Image Link</label>
                        <input placeholder="Image Link..." />
                      </Form.Field>

                      <Header as="h3">Rating Information</Header>
                      <Form.Field>
                        <label>Metacritic Critic Score</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Critic Score Count</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Metacritic User Score</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>User Score Count</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Steam Positive Count</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Steam Negative Count</label>
                        <input placeholder="0" />
                      </Form.Field>

                      <Header as="h3">Discount Information</Header>
                      <Form.Field>
                        <label>Discounted Price</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Discounted Price Percentage</label>
                        <input placeholder="0" />
                      </Form.Field>
                      <Form.Field>
                        <label>Discount Website</label>
                        <input placeholder="Discount Website..." />
                      </Form.Field>
                    </Form>
                  </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                  <Button basic onClick={() => setOpenAdd(false)} negative>
                    Cancel
                  </Button>
                  <Button basic onClick={() => setOpenAdd(false)} positive>
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

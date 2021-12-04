import React from "react";
import "./styles/MainPage.css";
import { getAPIDomain } from "./utils";
import { Button, Header, Grid, Segment } from "semantic-ui-react";

function MainPage(props) {
  const apiDomain = getAPIDomain();

  return (
    <div className="container">
      <Header as="h1" className="main-title">
        StuGameZ
      </Header>

      <Grid columns={2} divided>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Segment className="left-menu">
              <Button className="menu-button">Report A Game Discount</Button>
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

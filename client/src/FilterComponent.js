import React, { useState } from "react";
import { Label, Segment, Header, Icon, Button } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";
import axios from "axios";
import { getAPIDomain } from "./utils";
import "./styles/FilterComponent.css";

const apiDomain = getAPIDomain();

function FilterComponent(props) {
  const [filterArgs, setFilterArgs] = useState({
    criticLow: 0,
    criticHigh: 100,
    userLow: 0,
    userHigh: 10,
    priceLow: 0,
    priceHigh: 60,
  });

  async function filterDisplayedGames() {
    let gameInfo = await axios.get(apiDomain + "/games", {
      params: {
        hasFilter: true,
        critic_low: filterArgs.criticLow,
        critic_high: filterArgs.criticHigh,
        user_low: filterArgs.userLow,
        user_high: filterArgs.userHigh,
        price_low: filterArgs.priceLow,
        price_high: filterArgs.priceHigh,
      },
    });
    console.log("Test");
    console.log(gameInfo);
    props.setInfo(gameInfo.data);
  }

  return (
    <Segment basic color="teal">
      <Header as="h2" color="teal" className="filter-header">
        <Icon name="settings" />
        Filtering
      </Header>
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.criticLow}
          color="teal"
          settings={{
            min: 0,
            max: 100,
            step: 1,
            start: 0,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, criticLow: value });
            },
          }}
        />
        <br />
        <p>Min Critic Score: {filterArgs.criticLow}</p>
      </Label>
      <br />
      <br />
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.criticHigh}
          color="teal"
          settings={{
            min: 0,
            max: 100,
            step: 1,
            start: 0,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, criticHigh: value });
            },
          }}
        />
        <br />
        <p>Max Critic Score: {filterArgs.criticHigh}</p>
      </Label>
      <br />
      <br />
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.userLow}
          color="teal"
          settings={{
            min: 0,
            max: 10,
            step: 0.1,
            start: 0,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, userLow: value });
            },
          }}
        />
        <br />
        <p>Min User Score: {filterArgs.userLow}</p>
      </Label>
      <br />
      <br />
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.userHigh}
          color="teal"
          settings={{
            min: 0,
            max: 10,
            step: 0.1,
            start: 0,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, userHigh: value });
            },
          }}
        />
        <br />
        <p>Max User Score: {filterArgs.userHigh}</p>
      </Label>
      <br />
      <br />
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.priceLow}
          color="teal"
          settings={{
            min: 0,
            max: 60,
            step: 0.1,
            start: 0,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, priceLow: value });
            },
          }}
        />
        <br />
        <p>Min Price: ${filterArgs.priceLow}</p>
      </Label>
      <br />
      <br />
      <Label className="slider-label" color="teal" size={"large"} basic>
        <Slider
          value={filterArgs.priceHigh}
          color="teal"
          settings={{
            min: 0,
            max: 60,
            step: 0.1,
            start: 60,
            onChange: (value) => {
              setFilterArgs({ ...filterArgs, priceHigh: value });
            },
          }}
        />
        <br />
        <p>Max Price: ${filterArgs.priceHigh}</p>
      </Label>
      <br />
      <br />
      <Button
        fluid
        color="teal"
        size="big"
        className="filter-button"
        onClick={filterDisplayedGames}
      >
        Filter
      </Button>
    </Segment>
  );
}

export default FilterComponent;

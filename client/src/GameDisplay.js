import React from "react";
import { Grid, Segment } from "semantic-ui-react";

function GameDisplay(props) {
  const gameInfo = props.info;
  let renderedGames = gameInfo.map((entry) => {
    return (
      <Grid.Column>
        <p>{entry.title}</p>
      </Grid.Column>
    );
  });

  return <Grid columns={4}>{renderedGames}</Grid>;
}

export default GameDisplay;

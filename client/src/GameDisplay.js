import React from "react";
import { Grid, Card, Image } from "semantic-ui-react";
import "./styles/GameDisplay.css";

function GameDisplay(props) {
  const gameInfo = props.info;
  let renderedGames = gameInfo.map((entry) => {
    return (
      <Grid.Column>
        <Card color="teal">
          <Image src={entry.img_link} size="medium" />
          <Card.Content>
            <Card.Header>{entry.title}</Card.Header>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  });

  return (
    <Grid columns={6} className="display-grid">
      {renderedGames}
    </Grid>
  );
}

export default GameDisplay;

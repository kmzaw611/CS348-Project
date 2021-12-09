import React from "react";
import { Grid, Card, Image } from "semantic-ui-react";

function GameDisplay(props) {
  const gameInfo = props.info;
  let renderedGames = gameInfo.map((entry) => {
    return (
      <Grid.Column>
        <Card>
          <Image src={entry.img_link} size="medium" />
          <Card.Content>
            <Card.Header>{entry.title}</Card.Header>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  });

  return <Grid columns={6}>{renderedGames}</Grid>;
}

export default GameDisplay;

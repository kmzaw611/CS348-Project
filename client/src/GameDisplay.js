import React, { useEffect, useState } from "react";
import { Grid, Card, Image, Button, Icon, Popup, Modal} from "semantic-ui-react";
import "./styles/GameDisplay.css";
import { getAPIDomain } from "./utils";
import axios from "axios";


const apiDomain = getAPIDomain();



function GameDisplay(props) {
    useEffect(() => {
        //console.log("u shouldn't be hre");
        async function getWishInfo() {
            let wishInfo = await axios.get(apiDomain + "/wishlist");
            //setDisplayInfo(gameInfo.data);
        }

        getWishInfo();
    }, []);

    const [addWishList, setAddWish] = useState(false);
    //const [title, setTitle] = useState("");
    //const [price, setPrice] = useState(null);
    //const [discountPrice, setDP] = useState(null);
    async function addWish(gtitle, g_id) {
    // Some input sanitization.
    // None of these values can be null.
    // <input> parameters used to limit value types as well.

      console.log(gtitle, g_id);
      await axios.post(apiDomain + "/wishlist", {
        gtitle,
        g_id,
      });
       // Close the modal after adding a game.
    // Reload game data to be updated with the game that we just added.
        //let wishInfo = await axios.get(apiDomain + "/wishlist");
        //console.log(wishInfo.data);
    //setDisplayInfo(gameInfo.data);
  }


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
            <Modal.Actions>
            <Button
                    size="small"
                    color="teal"
                    className="menu-button"
                    icon
                    labelPosition="left"
                    onClick={() => {
                        addWish(entry.title, entry.game_id);
                    }}>
                <Icon name="shop" />
                        Add to Wishlist        
                </Button>


            </Modal.Actions>
            


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

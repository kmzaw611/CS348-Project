import React from "react";
import { Grid, Card, Image, Modal, Button, Icon, Header, Segment } from "semantic-ui-react";
import "./styles/GameDisplay.css";
import { getAPIDomain } from "./utils";
import axios from "axios";
const apiDomain = getAPIDomain();

function GameDisplay(props) {
    const gameInfo = props.info;
    const [open, setOpen] = React.useState(false)
    //Have updating states for all different properties of the modal
    /*
     *  name
     *  img_link
     *  price
     *  trailer_link
     *  publisher
     */
    const [name, setName] = React.useState(null)
    const [imgLink, setImgLink] = React.useState(null)
    const [price, setPrice] = React.useState(0)
    const [tLink, setTLink] = React.useState(null)
    const [publisher, setPublisher] = React.useState(null)
    const [ratings, setRatings] = React.useState(0)
    const [scores, setScores] = React.useState(null)
    const [discountWeb, setDiscountWeb] = React.useState(null)
    const [discountPrice, setDiscountPrice] = React.useState(0)
    const [discountPerc, setDiscountPerc] = React.useState(0)



    /*var renderedGames;
    async function retrieveGameInfo() {
        console.log("Game.id: " + gameInfo.data.game_id);
        let gameInfo = await axios.get(apiDomain + "/game-info", {
            params: {
                game_id: gameInfo.data.game_id
            }
        });
        console.log("Test");
        console.log(gameInfo);
        props.setInfo(gameInfo.data);
    }*/

    let renderedGames = gameInfo.map((entry) => {
        async function retrieveGameInfo() {
            //console.log("Game.id: " + gameInfo.data.game_id);
            let gameInfo = await axios.get(apiDomain + "/games/game-info", {
                params: {
                    game_id: entry.game_id
                }
            });
            console.log("Test");
            console.log(gameInfo);
            setName(gameInfo.data[0].title);
            setImgLink(gameInfo.data[0].img_link);
            setPrice(gameInfo.data[0].price);
            let str = "https://www.youtube.com/embed/" + gameInfo.data[0].trailer_link.substring(gameInfo.data[0].trailer_link.indexOf("=") + 1);
            setTLink(str);
            console.log(str);
            setPublisher(gameInfo.data[0].publisher);
            setRatings(gameInfo.data[0].user_score);
            setScores(gameInfo.data[0].critic_score);
            setDiscountWeb(gameInfo.data[0].website);
            setDiscountPrice(gameInfo.data[0].discounted_price);
            setDiscountPerc(gameInfo.data[0].discounted_percentage);
            //props.setInfo(gameInfo.data);
        }
            return (
                <Modal
                    className="modal"
                    closeIcon
                    dimmer="blurring"
                    open={open}
                    size={"fullscreen"}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    trigger={
                        <Grid.Column onClick={retrieveGameInfo}>
                            <Card color="orange">
                                <Image src={entry.img_link} size="medium" />
                                <Card.Content>
                                    <Card.Header>{entry.title}</Card.Header>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    }
                >
                    
                    <Modal.Header align={'center'}>{name}</Modal.Header>
                    <Modal.Content>
                       
                            <Grid container columns={3, "equal"} relaxed="very">
                                <Grid.Column>
                                    <Grid.Row>
                                        <Card color="orange" align="left">
                                        <Image src={imgLink} size="medium"/>
                                        </Card>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <p>{"Producer: " + publisher}</p>
                                    </Grid.Row>
                                <Grid.Row>
                                    <p align="center">{"User Score: " + ratings}</p>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                <Grid.Row>
                                    <iframe className={"v-frame"}
                                        src={tLink}
                                        align="left"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded youtube"
                                    />
                                    </Grid.Row>
                                <Grid.Row>
                                    <p>{"Critic Score: " + scores}</p>
                                </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row>
                                        <Card color="teal" align="right">
                                            <p>{"Price: " + price}</p>
                                            <p>{"Discount Price: " + discountPrice}</p>
                                        <p>{"Discount Percentage: " + discountPerc + "%"}</p>
                                        <a href={discountWeb}>Discount Website</a>
                                        </Card>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button
                                            size="huge"
                                            color="teal"
                                            className="menu-button"
                                            icon
                                            labelPosition="left"
                                        >
                                            <Icon name="shop" />
                                            Add To Wishlist
                                            </Button>
                                </Grid.Row>
                                </Grid.Column>

                            </Grid>
                            </Modal.Content>
                            
                       
                </Modal>

            );
 
  });

  return (
    <Grid columns={6} className="display-grid">
      {renderedGames}
    </Grid>
  );
}

export default GameDisplay;

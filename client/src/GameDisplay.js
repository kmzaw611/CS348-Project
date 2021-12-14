import React from "react";
import { Grid, Card, Image, Modal, Button, Icon} from "semantic-ui-react";
import "./styles/GameDisplay.css";
import { getAPIDomain } from "./utils";
import axios from "axios";
import { PieChart, Pie, Cell } from 'recharts'; 
const apiDomain = getAPIDomain();


function GameDisplay(props) {
    const gameInfo = props.info;
    const [open, setOpen] = React.useState(false)
    const [addWishList, setAddWish] = React.useState(false);
    async function addWish(gtitle, g_id) {
        //alert(g_id);
        await axios.post(apiDomain + "/wishlist", {
            gtitle,
            g_id,
        });
    };
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
    const [steamRat, setSteamRat] = React.useState(0)
    const [chartData, setChartData] = React.useState([{ name: "undefined", p: 10 }, {name: "undefined2", p: 90}])
    const [chart1Data, setChart1Data] = React.useState([{ name: "undefined", p: 10 }, { name: "undefined2", p: 90 }])
    const [chart2Data, setChart2Data] = React.useState([{ name: "undefined", p: 10 }, { name: "undefined2", p: 90 }])
    const [chart3Data, setChart3Data] = React.useState([{ name: "undefined", p: 10 }, { name: "undefined2", p: 90 }])
    const COLORS = ['orange', 'teal'];
    const COLORS2 = ['green', 'red'];
    const [id_of_game, set_id_game] = React.useState(0);

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
            setDiscountPerc(gameInfo.data[0].discounted_percentage);
            setName(gameInfo.data[0].title);
            setImgLink(gameInfo.data[0].img_link);
            setPrice(gameInfo.data[0].price);
            set_id_game(gameInfo.data[0].game_id);
            let str = "https://www.youtube.com/embed/" + gameInfo.data[0].trailer_link.substring(gameInfo.data[0].trailer_link.indexOf("=") + 1);
            setTLink(str);
            console.log(str);
            setPublisher(gameInfo.data[0].publisher);
            setRatings(gameInfo.data[0].user_score);
            setScores(gameInfo.data[0].critic_score);
            setDiscountWeb(gameInfo.data[0].website);
            setDiscountPrice(gameInfo.data[0].discounted_price);
            setDiscountPerc(gameInfo.data[0].discounted_percentage);
            let g = Math.round((gameInfo.data[0].positive_count / (gameInfo.data[0].positive_count + gameInfo.data[0].negative_count))*100);
            setSteamRat(g);
            setChartData([{ name: 'Regular Price', p: gameInfo.data[0].discounted_percentage },
                { name: 'Discount Price', p: (100 - gameInfo.data[0].discounted_percentage) }]);
            setChart1Data([{ name: 'User-Score', p: gameInfo.data[0].user_score },
                { name: 'Lost', p: (10 - gameInfo.data[0].user_score) }]);
            setChart2Data([{ name: 'Critic-Score', p: gameInfo.data[0].critic_score },
                { name: 'Lost', p: (100 - gameInfo.data[0].critic_score) }]);
            setChart3Data([{ name: 'Steam-Score', p: gameInfo.data[0].positive_count },
                { name: 'Lost', p: (gameInfo.data[0].negative_count) }]);
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

                    <Modal.Header align={'center'} className="game-title">{name}</Modal.Header>
                    <Modal.Content className="grid-cont">
                        <Grid container columns={3, "equal"} relaxed="very" className="grid-bord">
                            
                            <Grid.Row columns={3, "equal"}>
                                <Grid.Column width={4}>
                                    <Grid.Row>
                                        <Card color="orange" align="left">
                                        <Image src={imgLink} size="medium"/>
                                        </Card>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <p>{"Producer: " + publisher}</p>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Grid.Row>
                                        <iframe className={"v-frame"}
                                            src={tLink}
                                            align="left"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Embedded youtube"
                                        />
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Grid.Row>
                                        <Card color="teal" align="center">
                                            <p>{"Regular Price: " + price}</p>
                                            <p>{"Discount Price: " + discountPrice}</p>
                                            <PieChart width={220} height={160}>
                                                <Pie
                                                    data={chartData}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    dataKey="p"
                                                    fill="green">
                                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                </Pie>
                                            </PieChart>
                                        <p>{"Save " + discountPerc + "%!"}</p>
                                        <a href={discountWeb}>Discount Website</a>
                                        </Card>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={4, "equal"}>
                                <Grid.Column width={4}>
                                    <p>{"USER SCORE: " + ratings}</p>
                                    <PieChart width={160} height={160} className="chartCenter">
                                        <Pie
                                            data={chart1Data}
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="p"
                                            fill="green">
                                            {chart1Data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)}
                                        </Pie>
                                    </PieChart>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <p align="center">{"CRITIC SCORE: " + scores}</p>
                                    <PieChart width={160} height={160} className="chartCenter">
                                        <Pie
                                            data={chart2Data}
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="p"
                                            fill="green">
                                            {chart2Data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)}
                                        </Pie>
                                    </PieChart>

                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <p>{"STEAM RATING: " + steamRat}</p>
                                    <PieChart width={160} height={160} className="chartCenter">
                                        <Pie
                                            data={chart3Data}
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="p"
                                            fill="green">
                                            {chart3Data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)}
                                        </Pie>
                                    </PieChart>
                                </Grid.Column>
                                <Grid.Column width={4} >
                                    <Button
                                        size="huge"
                                        color="teal"
                                        className="button"
                                        icon
                                        labelPosition="left"
                                        onClick={() => {
                                            addWish(name, id_of_game)
                                        }}
                                    >
                                        <Icon name="shop" />
                                                Add To Wishlist
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions className="game-title" />
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

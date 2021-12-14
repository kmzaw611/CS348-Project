import React, { useEffect, useState } from "react";
import { Grid, Card, Image, Button, Icon, Popup, Modal, Table } from "semantic-ui-react";
import { getAPIDomain } from "./utils";
import axios from "axios";
const apiDomain = getAPIDomain();




function WishListPage(props) {
    const [displayWish, setDisplayWish] = useState([]); //HERE
    const [openWish, setOpenWish] = useState(false);

    async function getWishlist() {
        //alert("beep");
        try {
            //console.log("first");
            //let getWish = { name: "matt" };
            let wishInfo = await axios.get(apiDomain + "/wishlist");
            //console.log(res);
            //alert(res.data);
            setDisplayWish(wishInfo.data);

        } catch (error) {
            console.log("error", error);
        }
        //console.log(getWish.data);
        //let data = getWish.data;
        //console.log(getWish);
        //setDisplayWish(getWish.data);
    }
    async function removeWish(wish_gameID) {
        try {
            const params = {
                answer: wish_gameID
            };
            //alert(wish_gameID);
            await axios.delete(apiDomain + "/wishlist", { params });
            let wishInfo = await axios.get(apiDomain + "/wishlist");
            setDisplayWish(wishInfo.data);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    //const [openWish, setOpenWish] = useState(false);
    //const wishInfo = props.info;
    let dWish = displayWish.map((entry) => {
        return (
            <Table.Row>
                <Table.Cell>{entry.title}</Table.Cell>
                <Table.Cell>{entry.discounted_price}</Table.Cell>
                <Table.Cell onClick={async () => { await removeWish(entry.game_id) }}>Remove</Table.Cell>
            </Table.Row>
        );

    });
    return (
        <Modal
            closeIcon
            dimmer="blurring"
            onClose={() => setOpenWish(false)}
            onOpen={() => setOpenWish(true)}
            open={openWish}
            trigger={
                <Button
                    size="huge"
                    color="teal"
                    className="menu-button"
                    icon
                    labelPosition="left"
                    onClick={async () => { await getWishlist(); }}

                >

                    <Icon name="shop" />
                    Wishlist
                  </Button>
            }
        >
            <Modal.Header>My Wishlist</Modal.Header>

            <Table collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Game Title</Table.HeaderCell>
                        <Table.HeaderCell>Discount Price</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dWish}
                </Table.Body>

            </Table>
            <Modal.Actions>
                <Button basic onClick={() => setOpenWish(false)} negative>
                    Cancel
                  </Button>



            </Modal.Actions>
        </Modal>
    );

    
    //<Table.Cell>onClick={removeWish(displayWish[1].game_id)}</Table.Cell>


}
export default WishListPage;
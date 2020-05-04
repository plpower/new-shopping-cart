import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const useStyles = makeStyles({
    root: {
        height: 500,
        width: 300,
    },
    media: {
        height: 350,
        width: "auto",
    },
});

const handleRemove = ({ userstate, shopcartstate, price, inventorystate }, details, size, product) => {
    let newCart = shopcartstate.shopcart;
    newCart = newCart.filter(p => !(p.sku === details[0].sku && p.size === size));
    shopcartstate.setShopCart(newCart);

    let newPrice = price.totalprice;
    newPrice = newPrice - details[0].price;
    price.setTotalPrice(newPrice);

    let newInventory = inventorystate.inventory;
    newInventory[product.sku][size] = newInventory[product.sku][size] + 1;
    inventorystate.setInventory(newInventory);

    if (userstate.user) {
        if (shopcartstate.shopcart.length == 1) {
            console.log("in here")
            firebase.database().ref('carts/' + userstate.user.uid).remove();
        } else {
            firebase.database().ref('carts/' + userstate.user.uid).set(shopcartstate.shopcart);   
        }
    }
};

const ShoppingCartCard = ({ userstate, product, allproducts, shopcartstate, price, inventorystate}) => {
    const classes = useStyles();

    let details = allproducts.filter(p => p.sku === product.sku);
    console.log(product)

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={"data/products/" + product.sku + "_1.jpg"}
                    title={details[0].title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="p">
                        {details[0].title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {details[0].currencyFormat}{details[0].price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => handleRemove({ userstate, shopcartstate, price, inventorystate }, details, product.size, product)}>
                    Remove from Cart
                </Button>
            </CardActions>
        </Card>
    );
}

export default ShoppingCartCard;
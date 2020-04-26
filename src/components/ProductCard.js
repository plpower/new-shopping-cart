import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function ProductCard({ product, productid, shopcartstate, cartvisible, price, inventorystate}) {
    const classes = useStyles();
    // console.log(inventorystate.inventory)
    // let prodInventory = inventorystate.inventory[productid]
    // console.log(prodInventory)

    const handleClick = ({shopcartstate}, size, product) => {
        let newCart = shopcartstate.shopcart;

        newCart.push({sku: product.sku, size: size});
        shopcartstate.setShopCart(newCart);

        cartvisible.setVisible(true);
        
        let newPrice = price.totalprice;
        newPrice = newPrice + product.price;
        price.setTotalPrice(newPrice);

        let newInventory = inventorystate.inventory;
        newInventory[productid][size] = newInventory[productid][size] - 1;
        inventorystate.setInventory(newInventory);
    };

    const handleDisable = (buttonsize) => {
        let prodInventory = inventorystate.inventory[productid]
        if (prodInventory) {
            if (prodInventory[buttonsize] == 0) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    };

    const handleButtonName = (size) => {
        let disabled = handleDisable(size)
        if (disabled) {
            return "Out of Stock"
        } else {
            return size
        }
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={"data/products/" + productid + "_1.jpg"}
                    title={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="p">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.currencyFormat}{product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" disabled={handleDisable("S")} onClick={() => handleClick({shopcartstate}, "S", product)}>
                    { handleButtonName("S") }
                </Button>
                <Button size="small" color="primary" disabled={handleDisable("M")} onClick={() => handleClick({ shopcartstate }, "M", product)}>
                    M
                </Button>
                <Button size="small" color="primary" disabled={handleDisable("L")} onClick={() => handleClick({ shopcartstate }, "L", product)}>
                    L
                </Button>
                <Button size="small" color="primary" disabled={handleDisable("XL")} onClick={() => handleClick({ shopcartstate }, "XL", product)}>
                    XL
                </Button>
            </CardActions>
        </Card>
    );
}
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

export default function ProductCard({product, productid, shopcartstate, cartvisible, price}) {
    const classes = useStyles();

    const handleClick = ({shopcartstate}, size, product) => {
        let newCart = shopcartstate.shopcart;

        newCart.push({sku: product.sku, size: size});
        shopcartstate.setShopCart(newCart);

        cartvisible.setVisible(true);
        
        let newPrice = price.totalprice;
        newPrice = newPrice + product.price;
        price.setTotalPrice(newPrice);
    };

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
                <Button size="small" color="primary" onClick={() => handleClick({shopcartstate}, "S", product)}>
                    S
                </Button>
                <Button size="small" color="primary" onClick={() => handleClick({ shopcartstate }, "M", product)}>
                    M
                </Button>
                <Button size="small" color="primary" onClick={() => handleClick({ shopcartstate }, "L", product)}>
                    L
                </Button>
                <Button size="small" color="primary" onClick={() => handleClick({ shopcartstate }, "XL", product)}>
                    XL
                </Button>
            </CardActions>
        </Card>
    );
}
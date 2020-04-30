import React from 'react';
import { Grid , makeStyles, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Message } from "rbx";
import "rbx/index.css";

import './App.css';
import ProductCard from './components/ProductCard.js';
import ShoppingCartCard from './components/ShoppingCartCard.js';

import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyB4-p223h9-HoXWrzr7R1Jc0iZ1dV3YnfU",
  authDomain: "new-shopping-cart-f5a66.firebaseapp.com",
  databaseURL: "https://new-shopping-cart-f5a66.firebaseio.com",
  projectId: "new-shopping-cart-f5a66",
  storageBucket: "new-shopping-cart-f5a66.appspot.com",
  messagingSenderId: "904348819660",
  appId: "1:904348819660:web:2da5422b04fbf633212269",
  measurementId: "G-FWSGT8YB77"
};

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref()

const useStyles = makeStyles({
  carttotal: {
    padding: 10,
  },
});

const App = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});
  const products = Object.values(data);
  const productids = Object.keys(data);
  const classes = useStyles();

  const iproducts = Object.values(inventory);
  console.log("data")
  console.log(data)
  console.log("products")
  console.log(products)

  useEffect(() => {

    const handleData = snap => {
      if (snap.val()) setInventory(snap.val())
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     const response1 = await fetch('./data/inventory.json');
  //     const json1 = await response1.json();
  //     setInventory(json1);
  //   };
  //   fetchInventory();
  // }, []);

  const [spacing, setSpacing] = React.useState(2);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVisible(open);
  };

  const [visible, setVisible] = React.useState(false);

  const [shopcart, setShopCart] = React.useState([]);

  const [totalprice, setTotalPrice] = React.useState(0);

  const Banner = ({ user, title }) => (
    <React.Fragment>
      {user ? <Welcome user={user} /> : <SignIn />}
      <p>{title || '[loading...]'}</p>
    </React.Fragment>
  );

  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()}>
          Log out
      </Button>
      </Message.Header>
    </Message>
  );

  const SignIn = () => (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );

  return (
    <div>
    <Banner title="My Store" user={user} />
    <Button onClick={toggleDrawer(true)}>My Cart</Button>
    <Grid container justify="center" spacing={spacing}>
      {products.map((product, index) => (
        <Grid key={product.sku} item>
          <ProductCard product={product} productid={productids[index]} shopcartstate={{ shopcart, setShopCart }} cartvisible={{ visible, setVisible }} price={{ totalprice, setTotalPrice }} inventorystate={{ inventory, setInventory }}>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
    <Drawer anchor="right" open={visible} onClose={toggleDrawer(false)}>
        {shopcart.map((product) => (
          <Grid key={product.sku} item>
            <ShoppingCartCard product={product} allproducts={products} shopcartstate={{ shopcart, setShopCart }} price={{ totalprice, setTotalPrice }} inventorystate={{ inventory, setInventory }}>
            </ShoppingCartCard>
          </Grid>
        ))}
        <Typography gutterBottom variant="h6" component="p" className={classes.carttotal}>
          Cart Total: ${totalprice}
        </Typography>
    </Drawer>
    </div>
  );
};

export default App;

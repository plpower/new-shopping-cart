import React from 'react';
import { Grid , makeStyles, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import './App.css';
import ProductCard from './components/ProductCard.js';

import firebase from 'firebase/app';
import 'firebase/database';

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

firebase.initializeApp(firebaseConfig);


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const productids = Object.keys(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const [spacing, setSpacing] = React.useState(2);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVisible(open);
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <div>
    <Button onClick={toggleDrawer(true)}>My Cart</Button>
    <Grid container justify="center" spacing={spacing}>
      {products.map((product, index) => (
        <Grid key={product.sku} item>
          <ProductCard product={product} productid={productids[index]} className={product.title}>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
    <Drawer anchor="right" open={visible} onClose={toggleDrawer(false)}>
        {products.map((product, index) => (
          <Grid key={product.sku} item>
            <ProductCard product={product} productid={productids[index]} className={product.title}>
            </ProductCard>
          </Grid>
        ))}
    </Drawer>
    </div>
  );
};

export default App;

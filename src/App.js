import React from 'react';
import { Grid , makeStyles, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
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

  return (
      
    <Grid container justify="center" spacing={spacing}>
      {products.map((product, index) => (
        <Grid key={product.sku} item>
          <ProductCard product={product} productid={productids[index]} className={product.title}>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default App;

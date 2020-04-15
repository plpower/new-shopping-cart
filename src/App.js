import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

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
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map(product => <li key={product.sku}>{product.title}</li>)}
    </ul>
  );
};

export default App;

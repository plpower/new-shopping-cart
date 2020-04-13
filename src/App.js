import React from 'react';
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

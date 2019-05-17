import React from 'react';
import {AppRegistry} from 'react-native';
import firebase from "firebase";
import {StyleSheet, Text, View} from 'react-native';

import AppNavigation from "./components/AppNavigation";

export default class App extends React.Component{
  componentWillMount() {
    firebase.initializeApp( {
    apiKey : "AIzaSyCYHIA1H6SX3dyC1dJS3JgT5zjyArU_MXM",
    authDomain : "raffconnect.firebaseapp.com",
    databaseURL : "https://raffconnect.firebaseio.com",
    projectId : "raffconnect",
    storageBucket : "raffconnect.appspot.com",
    messagingSenderId : "305120433575"
    });
  }
  render() {
    return(
      <AppNavigation/>
    );
  }
}

AppRegistry.registerComponent('RaffConnect', () => RaffConnect);
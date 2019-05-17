import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native'

import MenuButton from '../components/MenuButton'

export default class InfoScreen extends Component{
  _signOutAsync =()=> {
    firebase.auth().signOut().then(function() {
        this.props.navigation.navigate('Auth');
    }).catch(function(error) {
        console.log(error)
    });
};

  render() {
    return(
      <View style = {{flex : 1,justifyContent : 'center',}}>
	  	<MenuButton navigation={this.props.navigation}/>
        <Text style = {styles.text}>Team</Text>
		<Text>#1</Text>
	  	<Text>Name : Rafif Wintama</Text>
		<Text>NIM : 173140714111009</Text>
		<Text>#2</Text>
	  	<Text>Name : Lutfi Maulana Azkia</Text>
		<Text>NIM : 173140714111016</Text>
		<Text>#3</Text>
	  	<Text>Name : Beryl Priambudi</Text>
		<Text>NIM : 173140714111062</Text>
	  </View>
    )
  }
}

const styles = StyleSheet.create( {
    image : {
        width : 120,
        height : 120,
        marginBottom : 40,
		alignSelf : 'center',
    },
	text : {
		alignSelf : 'center',
    }
});
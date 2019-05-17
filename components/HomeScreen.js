import React from "react";
import firebase from "firebase";
import {View, Text, TextInput, Button, Image, Alert, KeyboardAvoidingView} from 'react-native'
import Spinner from "./Spinner";

import MenuButton from '../components/MenuButton'

export default class HomeScreen extends React.Component{
      constructor(props) {
        super(props)
        this.state = {
            name : null,
            email : null,
            photoUrl : null
        }
    }

    componentDidMount() {
        this._getCurrentUser();
    }

    _getCurrentUser = async()=> {
        let user = await firebase.auth().currentUser;
        console.log(user);
        if (user != null) {
            this.setState( { 
                name : user.displayName, 
                email : user.email, 
                photoURL : user.photoURL
            })
        }
    }

    _updateProfile =()=> {
        var user = firebase.auth().currentUser;
        var credential;
        user.updateProfile( {
            displayName : this.state.name,
            photoURL : "https://randomuser.me/api/portraits/men/44.jpg",
        }).then(function() {
            Alert.alert('Success','Update Data successful')
        }).catch(function(error) {
            Alert.alert('Error', 'Error happened')
        });
		user.updateEmail(this.state.email).then((user) => {
            user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                Alert.alert('Success', 'Update successful')
            }).catch(function(error) {
                Alert.alert('Error', 'Error happened')
            });
        }).catch(function(error) {
            Alert.alert('Success', 'Update successful')
        });
    }
	
    _renderButtonOrSpinner =()=> {
        if (this.state.loading) {
            return <Spinner/>;
        }
        return <Button onPress={this._updateProfile} title="Update"/>;
    }

    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1, justifyContent : 'center', alignItems : 'center',}} behavior = "padding" enabled>
                <Image source = {{uri:this.state.photoURL}} style = {{width : 200, height : 200}}/>
                <TextInput style = {{width : '90%', borderRadius : 5, borderColor : "grey"}} value = {this.state.name} onChangeText = {(text)=>{this.setState({name : text})}} placeholder = "Name"/>
                <TextInput style = {{width : '90%', borderRadius : 5, borderColor : "grey"}} value = {this.state.email} onChangeText = {(text)=>{this.setState({email : text})}} placeholder = "Email"/>
                {this._renderButtonOrSpinner()}
				<MenuButton navigation={this.props.navigation}/>
                <Button title = "Log Out" onPress = {this._signOutAsync}/>
            </KeyboardAvoidingView>
        );
    }

    _signOutAsync =()=> {
        firebase.auth().signOut().then(function() {
            this.props.navigation.navigate('Auth');
        }).catch(function(error) {
            console.log(error)
        });
    };
}
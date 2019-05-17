import React from 'react';
import {View, Text, Platform, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {ImagePicker, Permissions} from 'expo'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
	    constructor(props) {
        super(props)
        this.state = {
			image: 'http://bit.ly/gbr-pisang',
            hasCameraPermission: null,
			hasCameraRollPermission: null,
        }
    }
	
	 async componentWillMount() {
        const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: statusCamera === 'granted'});
		const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted'});
    }
	
	navLink(nav, text) {
		return(
		<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
		<Text style={styles.link}>{text}</Text>
		</TouchableOpacity>
		)
	}
	
	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
		aspect: [1, 1],
		});
		if (!result.cancelled) {
			this.setState({image: result.uri});
		}
	};
	
	render() {
		return(
		<View style={styles.container}>
		<ScrollView style={styles.scroller}>
		<View style={styles.topLinks}>
			<View style={styles.profile}>
			<TouchableOpacity style={styles.imgView} onPress={this._pickImage}>
			<Image style={styles.img} source={{uri: this.state.image}}/>
			</TouchableOpacity>
		<View style={styles.profileText}>
		<Text style={styles.name}>Rafif Wintama</Text>
		</View>
		</View>
		</View>
		<View style={styles.bottomLinks}>
			{this.navLink('Profile', 'Profile')}
		    {this.navLink('Todos', 'Todos')}
			{this.navLink('Camera', 'Camera')}
			{this.navLink('Location', 'Location')}
			{this.navLink('Maps', 'Maps')}
				
		</View>
				</ScrollView>
		<View style={styles.footer}>
		<Text style={styles.description}>Copyright .2019 RAFFConnect</Text>
		<Text style={styles.version}>v0.1</Text>
		</View>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: 'lightgray',
	},
	scroller: {
	flex: 1,
	},
	profile: {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	paddingTop: 25,
	borderBottomWidth: 1,
	borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
	height: 70,
	width: 70,
	borderRadius: 50,
	},
	topLinks: {
		height: 160,
		backgroundColor: 'black',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
	height: 50,
	flexDirection: 'row',
	alignItems: 'center',
	backgroundColor: 'white',
	borderTopWidth: 1,
	borderTopColor: 'lightgray'
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1,
		marginLeft: 20,
		fontSize: 16,
	}
})
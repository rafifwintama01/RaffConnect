import React, { Component } from 'react';
import {Alert, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, Permissions, FileSystem, MediaLibrary} from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class CameraScreen extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
			hasCameraRollPermission: null,
            imageSrc: null,
            type: Camera.Constants.Type.back,
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
		const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted' });
    }

    handleSwitchCameraPress = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    };

    handleTakePicturePress = async () => {
		const { uri } = await this.camera.takePictureAsync();
		console.log('uri', uri);
		const imageSrc = uri;
        this.setState({ imageSrc });
    };

    handleSavePicture = async () => {
        const asset = await MediaLibrary.createAssetAsync(this.state.imageSrc);
		MediaLibrary.createAlbumAsync('Expo', asset)
		.then(() => {
			Alert.alert('Image saved!')
    })
	.catch(error => {
		Alert.alert('an Error Occurred!')
	});
	    }

    render() {
        const { hasCameraPermission, imageSrc, type } = this.state;
        if (hasCameraPermission === null) {
            return null;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        if (imageSrc) {
            return (
                <ImageBackground
                    resizeMode="stretch"
                    source={{ uri: imageSrc }}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                    >
                        <TouchableOpacity onPress={this.handleSavePicture}>
                            <Ionicons
                                name="md-save"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ imageSrc: null })}>
                            <Ionicons
                                name="md-trash"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            );
        }
		
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Camera
                    ref={(ref) => (this.camera = ref)}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                    type={type}
                >
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                    >
                        <TouchableOpacity onPress={this.handleTakePicturePress} style={{}}>
                            <Ionicons
                                name="md-camera"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleSwitchCameraPress} style={{}}>
                            <Ionicons
                                name="md-refresh"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </SafeAreaView>
        );
    }
}
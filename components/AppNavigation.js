import React from 'react'
import {Platform, Dimensions} from 'react-native';
import {createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator} from 'react-navigation';
import Icon from "@expo/vector-icons/Ionicons";
import AuthLoading from "../components/AuthLoading";
import LoginScreen from "../components/LoginScreen";
import HomeScreen from "../components/HomeScreen";
import InfoScreen from "../components/InfoScreen";
import ContactScreen from "../components/ContactScreen";

import Todos from '../components/Todos';
import CameraScreen from '../components/CameraScreen';
import LocationScreen from '../components/LocationScreen';
import MapScreen from '../components/MapScreen';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth : WIDTH*0.70,
	contentComponent : ({navigation}) => {
		return(<MenuDrawer navigation={navigation}/>)
	}
}

const AuthStack = createStackNavigator({SignIn : LoginScreen}, {headerMode : 'none'});
const BottomNav = createBottomTabNavigator( {
    Home : {
        screen : HomeScreen,
        navigationOptions : {
            tabBarLabel : "Home",
            tabBarIcon : ({tintColor}) => (
                <Icon name = "ios-home" size={30}/>
            ), tabBarOptions : {
                showIcon : true,
                activeTintColor : '#e91e63'
            },
        }
    },
		Info : {
        screen : InfoScreen,
        navigationOptions : {
            tabBarLabel : "Info",
            tabBarIcon : ({tintColor}) => (
                <Icon name = "ios-information-circle" size={20}/>
            ), tabBarOptions : {
                showIcon : true,
                activeTintColor : '#e91e63'
            },
        },
    },
    Contact : {
        screen : ContactScreen,
        navigationOptions : {
            tabBarLabel : "Contact",
            tabBarIcon : ({ tintColor }) => (
                <Icon name = "ios-person" size={20}/>
            ), tabBarOptions : {
                showIcon : true,
                activeTintColor : '#e91e63'
            },
        },
    },
})

const DrawerNav = createDrawerNavigator( {
    Home : {
        screen : BottomNav,  
    },
	Info : {
        screen : InfoScreen,
    },
    Contact : {
        screen : ContactScreen,
    },
	Profile : {
    screen : HomeScreen,  
    },
	Todos : {
	screen : Todos,
	},
	Camera : {
	screen : CameraScreen,
	},
	Location : {
	screen: LocationScreen,
	},
	Maps : {
	screen: MapScreen,
	}
},
DrawerConfig
);

const AppStack = createStackNavigator(
{    
    AppNav : {
        screen : DrawerNav,
        navigationOptions : {
            header : null,
        }
    }
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading : AuthLoading,
        App : AppStack,
        Auth : AuthStack,
    },
    {
        initialRouteName : 'AuthLoading',
    }
));


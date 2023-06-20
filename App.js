import { useState, useLayoutEffect,useContext } from 'react';
import {StyleSheet, Text, TextInput, View, Button, SectionList, SafeAreaView, Image, Pressable, Modal, Views, Alert} from 'react-native';
// import AppContainer from "react-native-web/dist/exports/AppRegistry/AppContainer";
import {Entypo} from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons"; 
import {FontAwesome} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
 import {MaterialCommunityIcon} from "@expo/vector-icons";
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
//import { StatusBar } from 'expo-status-bar';
import { encode, decode } from 'js-base64';
import { signOut } from "firebase/auth";
import {auth} from './dbfolder/logdb';
import {findOne} from "./dbfolder/functiondb";

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import GiftScreen from './screens/GiftScreen';
import GiftDetailsScreen from './screens/GiftDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendsScreen from './screens/FriendsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import TestQuiz from './screens/TestQuiz';
import TipsScreen from './screens/TipsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import Tabs from './components/tabs'


const Stack = createNativeStackNavigator(); 
const BottomTab = createBottomTabNavigator();
// const {useLayoutEffect} = React;


// function BottomTabNavigator({navigation, route}) {
//    function HeaderButtonPressHandler() {
//     console.log('Pressed')
// }}
  
//     <Drawer.Screen 
//     name="Paramètres" 
//     component={SettingsScreen}
//     options={{
//       drawerIcon: ({color}) => <Ionicons name="settings" size={24} color={color} />
//     }}/>

//   </Drawer.Navigator>
//   );
// } 

// function AuthStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   return (
//     <NavigationContainer>
//       <AuthStack />
//     </NavigationContainer>
//   );
// }

function BottomTabNavigator() {
  return (
  <BottomTab.Navigator 
  screenOptions={{
    drawerActiveBackgroundColor: "lightgray",
    drawerActiveTintColor: '#85C17E',
    headerShown: false,
    tabBarShowLabel:false,
    tabBarActiveTintColor: '#85C17E',

  }}>
    <BottomTab.Screen 
    name="Tips" 
    component={TipsScreen}
    options={{tabBarIcon: ({size,color}) => (<Entypo name="info" size={24} color="gray" />), tabBarActiveTintColor: '#85C17E'}}/>

    <BottomTab.Screen 
    name="Amis" 
    component={FriendsScreen} 
    options={{tabBarIcon: ({size,color}) => (<Ionicons name="people" size={24} color="gray" />)}}
    />

    {/* <BottomTab.Screen 
    name="Po'Pic" 
    component={HomePageScreen} 
    options={{tabBarIcon: ({size,color}) => (<Entypo name="leaf" size={24} color="gray" />)}}/> */}

    <BottomTab.Screen 
    name="Leaderboard" 
    component={LeaderboardScreen} 
    options={{tabBarIcon: ({size,color}) => (<Ionicons name="people" size={24} color="gray" />)}}
    />

    <BottomTab.Screen 
    name="Points" 
    component={GiftScreen} 
    options={{tabBarIcon: ({size,color}) => (<Entypo name="trophy" size={24} color="gray" />)}}
    />

    </BottomTab.Navigator>
  );
}

function TabNavigation (){
  return (

    <Tabs>
    </Tabs>

  );
}


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white'},
        headerTintColor: 'gray',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Inscription' }}/>
    </Stack.Navigator>
  );
}

function AuthenticatedStack({navigation}) {
  return (
                <Stack.Navigator> 
                  <Stack.Screen name ="Po'Pic" component={TabNavigation} options ={{headerShown: false,}}/>
                  <Stack.Screen name="Gift Details" component={GiftDetailsScreen} />
                  <Stack.Screen name ="Paramètres" component={TestQuiz} options={{title:''}}/>
                  <Stack.Screen name ="Profile" component={ProfileScreen} options={{ title: 'Ton profil' }}/>
                </Stack.Navigator> 
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  try {
      console.log(auth.currentUser.uid);
      console.log('Connecté');
  }
  catch (error) {
      console.log('Pas connecté');
      }
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {

    return (
      <>
      {/* // <SafeAreaView>  */}
              {/* <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name ="Po'Pic" component={BottomTabNavigator}/>
                  <Stack.Screen name="Gift Details" component={GiftDetailsScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
              </NavigationContainer> */}
            <AuthContextProvider>
            <Navigation />
            </AuthContextProvider>
        {/* // </SafeAreaView> */}
        </>
    );

}



const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
    },
    appContainer: {
      flex: 1,
      marginBottom: 10,
      padding: 10,
      flexDirection: 'row',
      textAlign: 'center',
      alignItems: 'center',
      
    },

    inputContainer : {
      marginTop: 50,
      flexDirection: 'column',
      padding: 10,
      textAlign: 'center',
      alignItems: 'center'
    },

  numPoints: {
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 35, 
    fontWeight: 'bold',
    color: '#85C17E',
  }
});

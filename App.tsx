import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';

import {  Button } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useEffect } from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import Store from './screens/Store';
import Recipes from './screens/Recipes';
import Description from './screens/Description';
import Error403 from './screens/error403';
import Error404 from './screens/error404';
import Profile from './screens/Profile';
import { auth } from './firebase';
import Details from './screens/Details';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Login />
          </View>
      </ImageBackground>
    </View>
  );
}

function RegisterScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Register />
          </View>
      </ImageBackground>
    </View>
  );
}

function StoreScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Store />
          </View>
      </ImageBackground>
    </View>
  );
}

function RecipesScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Recipes />
          </View>
      </ImageBackground>
    </View>
  );
}

function DescriptionScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Description />
          </View>
      </ImageBackground>
    </View>
  );
}

function Error403Screen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Error403 />
          </View>
      </ImageBackground>
    </View>
  );
}

function Error404Screen() {
  
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Error404 />
          </View>
      </ImageBackground>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Profile />
          </View>
      </ImageBackground>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/fundal.png')} resizeMode="cover" >
        <View style={styles.container}>
          <Details />
          </View>
      </ImageBackground>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  const ref = React.useRef(null);
  let isAuthenticated = false; 

  // messaging()
  // .getInitialNotification()
  // .then(remoteMessage => {
  //   if(remoteMessage){
  //     console.log('Notification caused app to open from quit state', remoteMessage.notification)
  //   }
  // }, [])

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if(enabled) {
  //     console.log('Authorization status: ', authStatus);
  //   }
  // }

  // useEffect( () => {
  //   if(requestUserPermission()){
  //     // return fcm token for the device
  //     messaging().getToken().then(token => {
  //       console.log(token)
  //     })
  //   }
  //   else {
  //     console.log("Failed token status ", authStatus)
  //   }
  // }, [])
  
  return (
    <NavigationContainer>

      {/* <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Store" component={StoreScreen} />
      </Drawer.Navigator> */}

      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="Store" component={StoreScreen} />
        <Stack.Screen options={{headerShown: false}} name="Recipes" component={RecipesScreen} />
        <Stack.Screen options={{headerShown: false}} name="Description" component={DescriptionScreen} />
        <Stack.Screen options={{headerShown: false}} name="Error403" component={Error403Screen} />
        <Stack.Screen options={{headerShown: false}} name="Error404" component={Error404Screen} />
        <Stack.Screen options={{headerShown: false}} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{headerShown: false}} name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  image: {
    flex: 1,
  },
});
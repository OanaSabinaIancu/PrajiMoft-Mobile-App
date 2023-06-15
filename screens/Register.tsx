
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable } from 'react-native';

import { Button, Image,  TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import React, { useState } from 'react';

import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { Firestore } from 'firebase/firestore';

export default function Register() {

    const navigation = useNavigation();

    const navigateToLogin = () => {
      navigation.navigate('Login');
    };

    const navigateToMain = () => {
      navigation.navigate('Store');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate('Recipes');
          console.log(email)
          
          // firestore.collection('Users').doc(auth().currentUser.uid)
          // .set({
          //   fname: '',
          //   username: '',
          //   picture: null,
          //   created: firestore.timeStamp.fromDate(new Date())
        })
        .catch(error => {
          alert(error.message)
        })
          // .catch(error => {
          //   console.log("Something is not ok with user added")
          // })
          // const user = userCredential.user;
          // // Update the user's profile with the username
          // user.updateProfile({
          //   displayName: username,
          // })
          //   .then(() => {
          //     console.log('Profile updated successfully');
          //   })
          //   .catch((error) => {
          //     console.error('Error updating profile:', error);
          //   });
  
          // Continue with the rest of your registration logic...
        // })
        // .catch((error) => {
        //   console.error(error.message);
        //   alert(error.message);
        // });
    };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8080ff', '#99bbff' ]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style = { styles.loginContainer }>
          <Text style={styles.title}>Register</Text>
          <Image
            style={styles.loginImg}
            source={require('../assets/register.jpg')}
          />
          <SafeAreaView>
          {/* <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              value={username}
            /> */}
            <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={ text => setEmail(text)}
            value={email}
            />
            <TextInput
              style={styles.input}
              placeholder = "Password"
              onChangeText={ text => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </SafeAreaView>
          <View>
            <View style={styles.containerButton}>
              <LinearGradient
                colors={['#ff0066', '#6600ff' ]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity style={styles.confirm} onPress={handleSignUp}>
                  <Text style={styles.loginText}>Register
                  </Text>
                </TouchableOpacity>
                {/* <Button style={styles.confirm} onPress={Loginfunc}>
                  <Text style={styles.loginText}>Login
                  </Text>
                </Button> */}
      
              </LinearGradient>
            </View>
            <View style={styles.containerButton}>
              <LinearGradient
                colors={['#1a75ff', '#6600ff' ]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity style={styles.register} onPress={navigateToLogin}>
                  <Text style={styles.loginText}>Login
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButton: {
      padding: 3
    },
    loginContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      
      padding: 15,
      borderWidth: 3.5,
      borderColor: '#202060',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    loginImg: {
      width: 200,
      height: 250,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#202060',
      alignItems: 'center',
      padding: 15,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      paddingHorizontal: 55,
      fontSize:22,
      borderColor: '#202060',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      padding:0,
      margin:0,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    confirm: {
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      padding: 15,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },

    register: {
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      padding: 15,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    loginText: {
      color: 'white',
      fontSize: 22,
      padding: 3
    },
  });
  
 

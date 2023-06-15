
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

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Login() {

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home');

    const navigateToRegister = () => {
      navigation.navigate('Register');
    };

    const navigateToStore = () => {
      navigation.navigate('Store');
    };

    const navigateToMain = () => {
      navigation.navigate('Recipes');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email);
          createOrUpdateUserProfile(user.uid, './profil4.jpg', 'active')
          navigation.navigate('Recipes');
        })
        .catch((error) => {
          console.error(error.message);
          // You can display the error message using an alert or any other error handling mechanism
          alert(error.message);
        });
    };
    
    const handleLogiin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email);
          navigation.navigate('Recipes');
        })
        .catch((error) => {
          console.error(error.message);
          // You can display the error message using an alert or any other error handling mechanism
          alert(error.message);
        });
    };

    const createOrUpdateUserProfile = (uid: string, profilePictureUrl: string, status: string) => {
      const db = firebase.firestore();
      const usersCollection = db.collection('users');
      const userProfile = {
        uid,
        profilePictureUrl,
        status,
      };
      usersCollection
        .doc(uid)
        .set(userProfile)
        .then(() => {
          console.log('User profile created or updated successfully!');
        })
        .catch((error) => {
          console.error('Error creating or updating user profile:', error);
        });
    };

    const handleTabPress = (tab) => {
      // setActiveTab(tab);
      navigation.navigate(tab);
      // Perform any other actions based on the selected tab
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
          <Text style={styles.title}>Login</Text>
          <Image
            style={styles.loginImg}
            source={require('../assets/login.jpg')}
          />
          <SafeAreaView>
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
                <TouchableOpacity style={styles.confirm} onPress={ handleLogiin }>
                  <Text style={styles.loginText}>Login
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
                    <TouchableOpacity style={styles.register} onPress={navigateToRegister}>
                      <Text style={styles.loginText}>Register
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
              <View style={styles.bottomcontainer}>
                  <LinearGradient
                          colors={['#ff0066', '#6600ff' ]}
                          style={styles.linearGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                      >
                        <View style={styles.bottomcontainer}>
                          {/* <TouchableOpacity
                            style={[styles.tab, activeTab === 'Store' && styles.activeTab]}
                            onPress={() => handleTabPress('Store')}
                          >
                            <Text style={styles.tabText}>Home</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Error404' && styles.activeTab]}
                            onPress={() => handleTabPress('Error404')}
                          >
                            <Text style={styles.tabText}>Store</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Error403' && styles.activeTab]}
                            onPress={() => handleTabPress('Error403')}
                          >
                            <Text style={styles.tabText}>Recipes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Error403' && styles.activeTab]}
                            onPress={() => handleTabPress('Error403')}
                          >
                            <Text style={styles.tabText}>Description</Text>
                          </TouchableOpacity>
                        </View>
                  </LinearGradient>
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
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    bottomcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      width: 320
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
      margin: 8,
      borderWidth: 1,
      padding: 10,
      // paddingHorizontal: 55,
      fontSize:20,
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
  
 
function createOrUpdateUserProfile(uid: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}


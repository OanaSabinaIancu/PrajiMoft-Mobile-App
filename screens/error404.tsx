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

import { FlatList } from 'react-native';

import {  Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { withDecay } from 'react-native-reanimated';

export default function Error403() {

    const scale = new Animated.Value(1);
    const duration = 500;

    const navigation = useNavigation();
    
    const navigateToStore = () => {
        navigation.navigate('Store');
    };
    
    const navigateToRecipes = () => {
        navigation.navigate('Login');
    };

    const startAnimation = () => {
        Animated.timing(scale, {
          toValue: 2, // Scale value to expand the text
          duration: duration,
          useNativeDriver: true,
        }).start(() => {
          // Animation completed, reset the scale value
          Animated.timing(scale, {
            toValue: 1, // Scale value to resize the text
            duration: duration,
            useNativeDriver: true,
            delay: 1000, // Delay in milliseconds before resizing the text
          }).start();
        });
      };
  
    return (
        <View style={styles.container}>
          <LinearGradient
          colors={['#8080ff', '#99bbff']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          >
            <View style = {styles.center}>

                <TouchableOpacity onPress={startAnimation}>
                    <Animated.View style={styles.container}>
                        <Animated.Text style={[styles.title, { transform: [{ scale: scale }] }]}>
                        Not found
                        </Animated.Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* <Text style={styles.title}>Error 403</Text> */}
                <Image
              style={styles.loginImg}
              source={require('../assets/err404.jpg')}
            />
            <View style={styles.text}>
              <Text style={styles.normal}>Ai incercat sa accesezi pagina care nu este disponibila. Ia un suc, relaxeaza-te si revino la pagina anterioara.</Text>
            </View>
                <View style={styles.containerButton}>
                    <LinearGradient
                        colors={['#ff0066', '#6600ff' ]}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity style={styles.confirm} onPress={navigateToRecipes}>
                            <Text style={styles.loginText}>Login
                            </Text>
                        </TouchableOpacity>
            
                    </LinearGradient>
                </View>
            </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        padding: 5,
    },
    normal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#202060',
        padding: 5,
      },
    bottomcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        width: 320
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        color: '#ccccff'
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    bkcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 620,
        width: 300,
        padding: 30
        
    },
    ccontainer: {
        flex: 1,
        justifyContent: 'center',
        height: 580,
        width: 320,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    gridContainer: {
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
        height: 200,
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
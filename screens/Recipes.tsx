import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable } from 'react-native';

import { Button, Image,  TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native';

import axios from 'axios';
import Details from './Details';



export default function Recipes() {
    const [data, setData] = useState([]);

    const [activeTab, setActiveTab] = useState('Home');

    const navigation = useNavigation();

    const handleOnPress = (getId) => {
      // setActiveTab(tab);
      navigation.navigate('Details', {
        recipeId: getId
      });
      // Perform any other actions based on the selected tab
    };

    const handleTabPress = (tab) => {
      // setActiveTab(tab);
      navigation.navigate(tab);
      // Perform any other actions based on the selected tab
    };

    const navigateToDetails = () => {
      navigation.navigate('Details');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      // const axios = require('axios');

      try {
        const response = await axios.get('https://the-birthday-cake-db.p.rapidapi.com/', {
          headers: {
            'X-RapidAPI-Key': '04836e5ea2mshc5b853481995afbp1d4a6fjsn4dbee2d37529',
            'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
            // 'X-RapidAPI-Key': '9b88f9a454mshc2bb7b43da15937p152f2cjsn60c1d782470a',
            // 'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
           
          },
        });
        // console.log(response.data)
        setData(response.data); //modifica in request.data pentru api-ul tau
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const renderProduct = ({ item }) => {
      let textcolor = '';

      // console.log(item.id)

      if (item.difficulty === 'Easy') {
        textcolor = '#008080';
      } else if (item.difficulty === 'Medium') {
        textcolor = 'blue';
      } else if (item.difficulty === 'A challenge') {
        textcolor = 'magenta';
      }

      return (
        <View style={styles.productContainer}>
          <View style={styles.gridContainer}>
            <Image style={styles.loginImg} source={{ uri: item.image }} />
            <Text  style={styles.loginTextNavy}>{item.title}</Text>
            {/* <Text  style={styles.loginTextNavy}>{item.name}</Text> */}
            <Text style={{ color: textcolor, fontWeight: 'bold', }}>{item.difficulty}</Text>
            <View style={styles.containerButton}>
              <LinearGradient
                colors={['#ff0066', '#6600ff']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                
                <TouchableOpacity style={styles.register} onPress={()  => handleOnPress(item.id)}>
                  <Text style={styles.loginText}>Details</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      );
    };
     
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={['#8080ff', '#99bbff']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
            <View style={styles.bkcontainer}>
                <Text style={styles.title}>Recipes</Text>
                <View style={styles.productContainer}>
                    <SafeAreaView style={styles.ccontainer}>
                    <FlatList
                      data={data} // Use the fetched data from the API
                      renderItem={renderProduct}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={1}
                    />
                    </SafeAreaView>
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
                          style={[styles.tab, activeTab === 'Recipes' && styles.activeTab]}
                          onPress={() => handleTabPress('Recipes')}
                        >
                          <Text style={styles.tabText}>Recipes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.tab, activeTab === 'Description' && styles.activeTab]}
                          onPress={() => handleTabPress('Description')}
                        >
                          <Text style={styles.tabText}>Description</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
                          onPress={() => handleTabPress('Profile')}
                        >
                          <Text style={styles.tabText}>Profile</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                          style={[styles.tab, activeTab === 'Login' && styles.activeTab]}
                          onPress={() => handleTabPress('Login')}
                        >
                          <Text style={styles.tabText}>Login</Text>
                        </TouchableOpacity> */}
                      </View>
                </LinearGradient>
              </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
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
  tabTextNavy: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#ffffff',
  },

  bkcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 620,
    width: 320,
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
    // borderWidth: 3.5,
    // borderColor: '#202060',
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
    width: 150,
    resizeMode: 'stretch',
    height: 100,
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
  loginTextNavy: {
    color: 'navy',
    fontSize: 22,
    padding: 3,
    fontWeight: 'bold',
  },
});
  
 

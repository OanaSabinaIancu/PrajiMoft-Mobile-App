import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable } from 'react-native';

import { Button, Image,  TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';

import axios from 'axios';
import { FlatList } from 'react-native';

// import Share from 'react-native-share';
// import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default function Details() {

  const route = useRoute()

  const {recipeId} = route.params;

  console.log(recipeId)

  const [data, setData] = useState([]);

  // console.log(route.params)

  const [activeTab, setActiveTab] = useState('Home');

  const navigation = useNavigation();
    
  const navigateToStore = () => {
      navigation.navigate('Store');
  };

  const [ProductDetails, setProductDetails] = useState(false);

  // console.log(recipeId)

  const handleTabPress = (tab) => {
    // setActiveTab(tab);
    navigation.navigate(tab);
    // Perform any other actions based on the selected tab
  };

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    // const axios = require('axios');

    const options = {
      method: 'GET',
      url: `https://the-birthday-cake-db.p.rapidapi.com/${recipeId}`,
      headers: {
        'X-RapidAPI-Key': '04836e5ea2mshc5b853481995afbp1d4a6fjsn4dbee2d37529',
        'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
      }
    };

    console.log(options.url)

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setProductDetails(response.data)
    } catch (error) {
      console.error(error);
    }

    // const share = async () => {
    //   const options = {
    //     message: 'Good cakes for everyone',
    //     url: 'https://prajimoft.ro',
    //     email: 'cristiangeluiancu@gmail.com',
    //     subject: 'Prajimoft recipes',
    //     recipient: '4075458083'
    //   };
    
    //   try {
    //     const res = await Share.share(options);
    //     console.log(res);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
  };

  return (
      <View style={styles.container}>
      <LinearGradient
      colors={['#8080ff', '#99bbff']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      >
          <View style={styles.container}>
              {/* <Text style={styles.title}>Recipes</Text> */}
              <View style={styles.bkcontainer}>
                <SafeAreaView>
                   <ScrollView style={styles.loginContainer}>
                  <View style={styles.productContainer}>
                   <View style={styles.gridContainer}>
                    <Image style={styles.loginImg} source={{ uri: ProductDetails.image }} />
                    <Text  style={styles.title}>{setProductDetails.title}</Text>
                    {/* <View style={styles.containerButton}>
                      <LinearGradient
                        colors={['#ff0066', '#6600ff']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        
                        <TouchableOpacity style={styles.register} onPress={share}>
                          <Text style={styles.loginText}>Share</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View> */}
                    <Text style={ styles.loginTextNavy}>{ProductDetails.difficulty}</Text>
                    <Text  style={styles.loginTextNavy}>{ProductDetails.portion}</Text>
                    <Text  style={styles.loginTextNavy}>{ProductDetails.time}</Text>
                    <Text  style={styles.loginTextNavy}>{ProductDetails.description}</Text>
                    <Text  style={styles.loginTextNavy}>Ingredients:</Text>
                    <Text  style={styles.loginTextNavy}>{ProductDetails.ingredients}</Text>
                    
                    {/* <Text  style={styles.loginTextNavy}>Steps:</Text>
                    <ul style={styles.loginTextNavyList}>
                      {steps.map((step, index) => (
                        <li key={index}>
                          <Text style={styles.stepValue}>{step.trim()}</Text>
                        </li>
                      ))}
                    </ul> */}
                    {/* <ul style={styles.loginTextNavyList}> {ProductDetails.method}</ul> */}
                    </View>
                  </View>
                    </ScrollView>
                  
                </SafeAreaView>
                </View>
              {/* </View> */}
            </View>
            <View style={styles.bottomcontainer}>
                <LinearGradient
                        colors={['#ff0066', '#6600ff' ]}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
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
    // alignItems: 'center',
    // justifyContent: 'center',
    
    padding: 10,
    // borderWidth: 3.5,
    // borderColor: '#202060',
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
  },
  loginImg: {
    width: 270,
    height: 200,
    padding: 50,
    resizeMode: 'stretch',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
  loginTextNavyList: {
    color: 'navy',
    fontSize: 22,
    padding: 3,
    fontWeight: 'bold',
  },
});
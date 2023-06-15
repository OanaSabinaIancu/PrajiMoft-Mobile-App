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

export default function Store() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
        // Add more products as needed
      ]);

      const [activeTab, setActiveTab] = useState('Store');

      const navigation = useNavigation();

      const handleTabPress = (tab) => {
        // setActiveTab(tab);
        navigation.navigate(tab);
        // Perform any other actions based on the selected tab
      };
    
    const renderProduct = ({ item }) => {
        return (
            <View style={styles.productContainer}>
              <View style={styles.gridContainer}>
                  <Image
                      style={styles.loginImg}
                      source={require('../assets/error404.jpg')}
                  />
                  <Text>{item.name}</Text>
                  <View style={styles.containerButton}>
                    <LinearGradient
                        colors={['#ff0066', '#6600ff' ]}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity style={styles.register} onPress={() => {}}>
                        <Text style={styles.loginText}>Adauga
                        </Text>
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
                  <Text style={styles.title}>Shop</Text>
                  <View style={styles.productContainer}>
                      <SafeAreaView style={styles.ccontainer}>
                          <FlatList
                          data={products}
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
                          <Text style={styles.tabText}>Store</Text>
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
                          onPress={() => handleTabPress('Error404')}
                        >
                          <Text style={styles.tabText}>Profile</Text>
                        </TouchableOpacity>
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
    width: 150,
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
});
  
 

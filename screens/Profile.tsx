import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable } from 'react-native';

import { Button, Image,  TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

export default function Profile() {

    const [activeTab, setActiveTab] = useState('Home');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [image, setImage] = useState<string | null>(null);

    const [imageUri, setImageUri] = useState('');

  const handlePress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permission not granted');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        const { uri } = result;
        setImage(uri);
        await uploadImage(uri);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = firebase.storage().ref().child('images/' + Date.now());
      await ref.put(blob);
      const imageUrl = await ref.getDownloadURL();
      console.log('Image uploaded:', imageUrl);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          const userEmail = user.email;
          setEmail(userEmail);
        }
    }, []);

    async function logout() {
        try {
            // Sign out the user using Firebase auth
            await auth.signOut();
            alert("merge")
            navigation.navigate('Login'); 

        } catch (error) {
            console.error('Error occurred during logout:', error);
            alert("An error occured during logout" + error)
            // Handle any errors that occur during logout
        }
    }

    const navigation = useNavigation();
    
    const navigateToStore = () => {
        navigation.navigate('Store');
    };

    const handleEditProfile = () => {
        setEditing(true);
        setNewUsername(username);
        setNewEmail(email);
    };
    
    const handleSaveProfile = () => {
        if (newEmail !== email) {
          const user = auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              setEmail(newEmail);
              setEditing(false);
            })
            .catch((error) => {
              console.log('Error updating email:', error);
            });
        } else {
          setEditing(false);
        }
        setUsername(newUsername);
      };

    const handleTabPress = (tab) => {
        // setActiveTab(tab);
        navigation.navigate(tab);
        // Perform any other actions based on the selected tab
    };
  
    return (
        <View style={styles.container}>
          <LinearGradient
          colors={['#8080ff', '#99bbff']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          >
                <Text style={styles.title}>Profile page</Text>
                <View style={styles.loginContainer}>
                    <Image
                        style={styles.loginImg}
                        source={require('../assets/profil4.jpg')}
                    />
                    {/* <Text style={styles.loginText}>Username: {editing ? newUsername : username}</Text> */}
                    <Text style={styles.loginText}>Email: {editing ? newEmail : email}</Text>

                    {editing ? (
                        <View style={styles.container}>
                            {/* <TextInput
                            style={styles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder="New Username"
                            /> */}
                            <TextInput
                            style={styles.input}
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder="New Email"
                            />

                            <View style={styles.containerButton}>
                                <LinearGradient
                                        colors={['#ff0066', '#6600ff']}
                                        style={styles.linearGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                    <TouchableOpacity style={styles.confirm} onPress={handleSaveProfile}>
                                        <Text style={styles.buttonText}>Save
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                        ) : (

                            <View style={styles.containerButton}>
                                {/* <LinearGradient
                                    colors={['#1a75ff', '#6600ff' ]}
                                    style={styles.linearGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <TouchableOpacity style={styles.confirm} onPress={handleEditProfile}>
                                    <Text style={styles.buttonText}>Edit Profile
                                    </Text>
                                    </TouchableOpacity>
                                </LinearGradient> */}

                                <LinearGradient
                                        colors={['#ff0066', '#6600ff' ]}
                                        style={styles.linearGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                    <TouchableOpacity style={styles.confirm} onPress={logout}>
                                        <Text style={styles.buttonText}>Logout
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )}

                    
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
        padding: 10
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
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
        // margin: 12,
        borderWidth: 1,
        // padding: 15,
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
        color: 'navy',
        fontSize: 15,
        padding: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        padding: 10,
        fontWeight: 'bold',
    },
});
  
 

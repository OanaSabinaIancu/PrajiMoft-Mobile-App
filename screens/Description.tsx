import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ImageBackground, TextInput, SafeAreaView, Pressable, ScrollView } from 'react-native';

import { Button, Image,  TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation, useRoute } from '@react-navigation/native';

import { FlatList } from 'react-native';
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';
import { Video, ResizeMode } from 'expo-av';

import axios from 'axios';

export default function Description() {

    // const navigation = useNavigation();

    const [data, setData] = useState([]);

    const [activeTab, setActiveTab] = useState('Store');

    const navigation = useNavigation();

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

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

      try {
        const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', {
          headers: {
            'X-RapidAPI-Key': '367816627bmshc163dbd49276949p1fdcc1jsncdc3418eb0b6',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    return (
        <View style={styles.container}>
          <LinearGradient
          colors={['#8080ff', '#99bbff']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          >
              <View style={styles.bkcontainer}>
                  <SafeAreaView>
                    <Text style={styles.title}>Description</Text>
                    <ScrollView style={styles.loginContainer}>
                        <Text style={styles.warning}> Atentie! Consumul excesiv al dulciurilor poate provoca boli grave!</    Text>
                        <Text style={styles.normal}>  Buna tuturor! Numele meu este Sabina si am decis sa imi deschid aceasta coftarie, in urma cu 5 ani, impreuna cu Larisa. Eram amandoua pasionate de gatit asa ca am decis sa incercam sa aducem zambetul pe buzele oamenilor si sa le facem ziua mai buna cu ceva dulce. Amandoua aveam rude la tara asa ca puteam procura suficiente ingrediente 100% naturale sustindand totodata cativa producatori autohtoni pentru a oferi tot ce este mai bun clientilor nostrii. Am inceput de la vanzarea prajiturilor cunoscutilor, iar acum am ajuns sa detinem 10 magazine in Bucuresti si in tara, dar suntem in proces de extindere. Mica noastra"afacere"a devenit una foarte prospera datorita calitatii produselor noastre. Sincer, nu credeam ca o sa placa atat de mult oamenilor, insa pasiunea pentru ce faceam si dragostea pe care o puneam a fost recunoscuta si apreciata de clienti. Cunoscandu-ne dorinta de a ne face clientii fericiti am incercat sa aducem langa noi oameni cu aceleasi aspiratii ca noi si am incercat, pe cat posibil, sa le oferim un mediu cat mai primitor la locul de munca. </Text>
                    <View style={styles.container}>
                        {/* <Image
                        style={styles.tinyLogo}
                        source={require('../assets/logo-moft.jpg')}
                        /> */}

                        <View style={styles.container}>
                            <Video
                                ref={video}
                                style={styles.video}
                                source={{
                                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                                onPlaybackStatusUpdate={status => setStatus(() => status)}
                            />
                            <View style={styles.buttons}>

                                <View style={styles.containerButton}>
                                    <LinearGradient
                                        colors={['#ff0066', '#6600ff' ]}
                                        style={styles.linearGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <TouchableOpacity style={styles.register} 
                                        onPress={() =>
                                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                                        }>
                                            <Text style={styles.loginText} >{status.isPlaying ? 'Pause' : 'Play'}
                                            </Text>
                                        </TouchableOpacity>

                                        {/* <Button style={styles.confirm}
                                        title={status.isPlaying ? 'Pause' : 'Play'}
                                        onPress={() =>
                                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                                        }
                                        /> */}
                                    </LinearGradient>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.bold}>Ce planuri avem pentru viitor?</Text>
                    <Text style={styles.normal}>Avem de gand sa imbunatatim conditiile de lucru ale angajatilor, sa implementam o camera de odihna pentru restul filialelor unde nu am apucat sa facem acest lucru. Dorim dealtfel sa imbunatatim aparatura pentru afacilita productia. Cum cererea la magazinele fizice este din ce in ce mai mare cautam locatii pentru urmatoarele magazine si in alte orase din tara.Pentru inceputvom avea deschiderea oficiala a unei noi cofetarii in Timisoara. Ne propunem sa crestem numarul producatorilor locali de la care achizitionam ingredientele, astfel ca vom ajuta oamenii sa isi promoveze produsele, imbunatatind o parte din agricultura autohtona. Dorim sa organizam o campanie de recrutare a muncitorilor din zona rurala, dar cautam si retete traditionale de la bunicile crescute si nascute la tara. Cautam retete cat mai vechi si incercam sa le readucem in vietile cumparatorilor nostrii pentru a le trezi amintirile de care vor sa isi aduca aminte cu drag.Avem in plan sa organizam o strangere de fonduri anuala pentru reabilitarea caselor oamenilor saraci din mediile defavorizate si pentru a le oferi acestora o viata mai buna. </Text>
                    <View style={styles.container}>
                        <Image
                        style={styles.gallery}
                        source={require('../assets/gallery.png')}
                        />
                    </View>
                    <Text style={styles.bold}>Despre produsele noastre</Text>
                    <Text style={styles.normal}>Incercam sa acoperim o gama cat mai larga de clienti si sa le respectam gusturile pana si celor mai pretentiosi dintre ei. Scopul nostru este sa imbunatatim calitatea produselor noastre si sa oferim clientilor nostrii. Preturile noastre sunt adaptate in functie de bugetul fiecaruia. Indiferent daca comanzi online sau vii in cofetariile noastre vei primi produsul in cutii cat mai interesante, iar gustul va fi pe masura prezentarii. Daca alegi sa mananci intr-una din cofetariile noastre iti punem la dispozitie canapele comfortabile de piele colorata, mobila noua de cea mai buna calitate si decoratiuni florale care atrag atentia. Mirosurile subtile de cozonac proaspat copt, focul semineului si canapeaua comfortabila aduc adeasea senzatia placuta a sarbatorilor. </Text>
                    </ScrollView>
                  </SafeAreaView>
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
                          onPress={() => handleTabPress('Profile')}
                        >
                          <Text style={styles.tabText}>Profile</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                          style={[styles.tab, 'Login' ? { isAuthenticated } === true : 'Logout' && styles.activeTab]}
                          onPress={() => handleTabPress('Login')}
                        >
                          <Text style={styles.tabText}>{'Login' ? {isAuthenticated} === true : 'Logout'}</Text>
                        </TouchableOpacity> */}
                      </View>
                </LinearGradient>
              </View>
          </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        height: 300,
        width: 250,
        alignItems: 'center',
    },
    tinyLogo: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
         borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    gallery: {
        width: 280,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
            borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    warning: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff1a75',
        padding: 15,
    },
    normal: {
        fontSize: 20,
        color: '#202060',
        padding: 15,
    },
    bold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#202060',
        padding: 15,
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
        color: '#fffff'
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
  
 

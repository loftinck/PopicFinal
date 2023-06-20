import { View, Text, StyleSheet, Image, FlatList, Pressable, Clipboard} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import AddFriendsGridTile from "../components/AddFriendsGridTile.js";
// import { FlatList } from "react-native-gesture-handler";
import {AD, ADDFRIENDS} from "../data/dataFRIENDS";
import { StatusBar } from "expo-status-bar"; 
// import {React} from "react"; 
import * as React from "react"
import {useEffect, useState} from "react";
// import { SearchBar } from "react-native-elements";



import { Searchbar } from "react-native-paper";
import {AntDesign} from '@expo/vector-icons'
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../dbfolder/logdb";



const linkProfile = 'picyourpo.p.com' 
const copyIt = () => Clipboard.setString(linkProfile) 
const topList = () => {
    return ( 
        <View style={{marginLeft: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}> Personnes que vous connaissez peut-être...</Text>
        </View>

    ); 
} 

function SuggestionScreen() {
    const [restaurantsList, setRestaurantsList] = useState([]); //Initialise restaurant list with setter
    const [errorMessage, setErrorMessage] = useState("");
    function renderAddFriendsItem(itemData){
        return <AddFriendsGridTile pp={itemData.item.pp} username={itemData.item.username}/>};

    function HeaderButtonPressHandler() {
        console.log('lol')
    }

    const [searchQuery, setSearchQuery] = React.useState( '' ) ;
    const onChangeSearch = query => setSearchQuery( query ) ;
    console.log(searchQuery);
    const getRestaurants = async () => {
        try {
            const list = [];
            const docRef = doc(db, "users", auth.currentUser.uid );
            const docSnap = await getDoc(docRef);
            // const snapshot = await firestore.collection("users").get();
            list.push(docSnap.data().ppurl);
            // console.log(list);
            setRestaurantsList([...list]);
        } catch (e) {
            setErrorMessage(
                "There's nae bleeding restaurants, I told you to upload them!"
            );
        }
    };

    //Call when component is rendered
    useEffect(() => {
        getRestaurants();
    }, []);




    return (
        <>
        <StatusBar style="light"/>

        <Searchbar
        placeholder='Rechercher'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style= {{backgroundColor: "#C9DCBD", margin: 16,
        justifyContent: 'center'}}/>

        <View style={styles.container}>


            <View style={styles.topLContainer}>

                {/* <Text>You don't have any friends yet</Text> */}
                <Image style={[styles.profilePic, styles.leftContainer]}
                    source={{uri:restaurantsList[0]}}/>
            </View>

            <View style={styles.topRContainer}>
                <Text style={{fontWeight: 'bold'}}>Invite tes amis à rejoindre Po'Pic</Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{borderRadius: 15, backgroundColor: 'white', height: 25}}>
                        <Text style={styles.url}>{linkProfile}</Text>
                    </View>

                    <View style={{flexDirection: 'row', zIndex: 1, marginLeft: -35, marginTop: -25/2}}>
                            <Pressable style={styles.button} onPress={copyIt}>
                            <Text> <AntDesign name={'sharealt'} size={30} color={'white'}/> </Text>
                            </Pressable>
                        </View>
                </View>
            </View>
            {/* <View style={styles.bottomContainer}>
                
            </View> */}

        </View>

        <FlatList
        ListHeaderComponent={topList}
        data={ADDFRIENDS}
        keyExtractor={(item) => item.id}
        renderItem={renderAddFriendsItem}
        />
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        // flex : 1,
        margin: 16, 
        flexDirection: 'row', 
        // flexGrow: '20%', 
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#C9DCBD',
        backgroundColor: '#C9DCBD', 
        // height: 100, 
        // width: '100%', 
    }, 

    topLContainer: {
        flex : 1, 
        // textAlign: 'center', 
        // justifyContent: 'center', 
        // alignContent: 'center', 
        // alignItems: 'center', 
        // margin: 16,
        // borderWidth: 2,
        // borderRadius: 10,
        // borderColor: '#C9DCBD',
        // backgroundColor: '#C9DCBD', 
        // height: 200, 
        width: 90,  
    }, 

    topRContainer: {
        flex : 2, 
        flexDirection: 'column', 
        padding: 16, 
        // textAlign: 'center', 
        justifyContent: 'space-between'
        // alignContent: 'center', 
        // alignItems: 'center',
        // margin: 16,
        // borderWidth: 2,
        // borderRadius: 10,
        // borderColor: '#C9DCBD',
        // backgroundColor: '#C9DCBD', 
        // height: 200, 
        // width: '95%' 
    },

    leftContainer : {
        //   marginTop: 50,
        // flex: 1,
        flexDirection: 'row',
        padding: 10, 
        // textAlign: 'center', 
        alignItems: 'center'
    }, 

    bottomContainer: {
        flex : 2,
        margin: 16,
        // borderWidth: 2,
        // borderRadius: 10,
        // borderColor: '#C9DCBD',
        // backgroundColor: '#C9DCBD',
        // height: 200,
    }, 

        profilePic: {
            borderRadius: 100,
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: 'black',
            margin: 16,
          }, 

        url: {
            // backgroundColor: 'white', 
            color: '#4C7C4C', 
            padding: 2, 
            marginLeft: 2, 
            marginRight: 60, 
            // borderWidth: 2, 
            // borderRadius: 10, 
        }, 

        button: {
            borderRadius: 65, 
            backgroundColor: '#4C7C4C',
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
        }, 
        // suggestion { 

        // }

})

export default SuggestionScreen;
// import { View, Text } from "react-native";

// function RequestScreen() {
//     return (
//         <View>
//             <Text>You don't have any friends yet</Text>
//         </View>
//     );
// }

// export default RequestScreen; 

import {View, Text, StyleSheet, Image, FlatList, Pressable, Clipboard, RefreshControl} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import RequestFriendsGridTile from "../components/RequestFriendsGridTile.js";
// import { FlatList } from "react-native-gesture-handler";
import {AD, ADDFRIENDS} from "../data/dataFRIENDS";
import { StatusBar } from "expo-status-bar"; 
// import {React} from "react"; 
import * as React from "react"
import {useCallback, useEffect, useState} from "react";
// import { SearchBar } from "react-native-elements"; 

import { Searchbar } from "react-native-paper";
import {AntDesign} from '@expo/vector-icons'
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../dbfolder/logdb";
import AddFriends from "../models/addFriends";

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// const linkProfile = 'picyourpo.p.com' 
// const copyIt = () => Clipboard.setString(linkProfile) 
const topList = () => {
    return ( 
        <View style={{marginLeft: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20}}>  Demandes d'amis </Text>
        </View>

    ); 
}

function SuggestionScreen({}) {
    const [list, setlist] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [DataSource, setDataSource] = useState([]);
    const getRestaurants = async () => {
        try {
            const test = [];
            const docRef = await doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const listdemand = docSnap.data().demandsfriends;
            await asyncForEach(listdemand, async (element) => {
                const docRef1 = await doc(db, "users", String(element));
                const docSnap1 = await getDoc(docRef1);
                test.push(new AddFriends(docSnap1.data().id, docSnap1.data().ppurl, docSnap1.data().username))
                setlist([...test]);
            });
        } catch (e) {
            setErrorMessage(
                "There's nae bleeding restaurants, I told you to upload them!"
            );        }
    }
    // const [searchQuery, setSearchQuery] = React.useState( '' ) ;
    // const onChangeSearch = query => setSearchQuery( query ) ;


    useEffect(() => {
        onRefresh();
    }, []);

    const getData = async () => {
        getRestaurants();
        setDataSource(list);
        setRefreshing(false);
    }

    const onRefresh = async () => {
        setRefreshing(true);
        //Clear old data of the list
        setlist([])
        console.log("List",list)
        setDataSource([])
        console.log("DataSource",DataSource)
        //Call the Service to get the latest data
        await getData();
    };
    function renderAddFriendsItem(itemData){
        return <RequestFriendsGridTile pp={itemData.item.pp} username={itemData.item.username}/>}


    return (
        <>
        <StatusBar style="light"/>

        {/* <Searchbar
        placeholder='Search' 
        onChangeText={onChangeSearch} 
        value={searchQuery} 
        style= {{backgroundColor: "#C9DCBD", margin: 16, 
        justifyContent: 'center'}}/> */}


        <FlatList
        ListHeaderComponent={topList}
        data={DataSource}
        keyExtractor={(item) => item.id}
        renderItem={renderAddFriendsItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            padding: 2, 
            height: 50, 
            width: 50, 
            alignItems: 'center', 
            justifyContent: 'center', 
        }, 
        // suggestion { 

        // }

})

export default SuggestionScreen;
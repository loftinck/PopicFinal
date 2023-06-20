import { StatusBar } from "expo-status-bar";
import {View, Text, StyleSheet, RefreshControl, ScrollView} from "react-native";

import {Entypo} from "@expo/vector-icons"; 
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../dbfolder/logdb";
import Leader from "../models/LeaderData";
import * as React from "react";

const ranking = '#2'
const numFriends = '15'
const feuilles = '108'
const points2 = '108'
const points1 = '135'
const points3 = '95'

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
function LeaderboardScreen() {
    // let sortedProducts = products.sort(
    //     (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
    const [list, setlist] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [DataSource, setDataSource] = useState([]);
    const getRestaurants = async () => {
        try {
            const docRef = await doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const test = [];
            test.push(new Leader(docSnap.data().username, docSnap.data().points))
            const listdemand = docSnap.data().friends;
            await asyncForEach(listdemand, async (element) => {
                const docRef1 = await doc(db, "users", String(element));
                const docSnap1 = await getDoc(docRef1);
                test.push(new Leader(docSnap1.data().username, docSnap1.data().points))
                setlist([...test]);
            });
        } catch (e) {
            setErrorMessage(
                "There's nae bleeding restaurants, I told you to upload them!"
            );        }
    }

    useEffect(() => {
        getRestaurants();
    }, []);

    const getData = async () => {
        await getRestaurants();
        let sortedList = list.sort(
            (p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
        setDataSource(sortedList);
        setRefreshing(false);
    }

    // const onRefresh = async () => {
    //     setRefreshing(true);
    //     //Clear old data of the list
    //     setlist([])
    //     console.log("List",list)
    //     setDataSource([])
    //     console.log("DataSource",DataSource)
    //     await getData();
        //Call the Service to get the latest data

    return ( 
        <>
            <ScrollView>
        <StatusBar style='light'/>
        <View style={styles.topContainer}>
            <Text style={{fontSize: 20}}> Your ranking today : </Text> 
            <Text style={{fontSize: 24, fontWeight:'bold', color: 'lightgrey', marginLeft: 5, marginRight: 5}}>{ranking}</Text>
            <Text style={{fontSize: 20}}>/{numFriends}</Text>
        </View> 
        <View style={styles.gain}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}> Feuilles gagnées aujourd'hui : 15 <Entypo name="leaf" size={24} color="white"/></Text>
        </View> 

        {/* <View style={styles.podium}> 
            <View style={{height: 60, backgroundColor: '#C9DCBD'}}> </View> 
            
        </View> */}

        {/* <View style={ styles.podium}>
            <Text><Ionicons name={'podium-outline'} size={200}/></Text>
        </View> 
         */}

         <View style={styles.podium}>
            <View style={styles.second}>
                <View style={{height: 65, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <View style={{borderRadius: 100, borderWidth: 2, height: 50, width: 50}}></View>
                    <View style={{marginBottom: 5}}>
                        <Text> username2 </Text>
                    </View>
                </View>
                <View style={{height: 65, backgroundColor: '#C9DCBD', borderBottomLeftRadius: 10, borderTopWidth: 5, borderTopColor: '#C9C9C9', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.point2}>
                        <Text style={styles.numeros}> {points2} </Text>
                    </View>
                    
                </View>
            </View> 
            <View style={styles.first}>
                <View style={{height: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1, flexDirection: 'column'}}>
                    <View style={{borderRadius: 100, borderWidth: 2, height: 50, width: 50}}></View>
                    <View style={{marginBottom: 20}}>
                        <Text> username1 </Text>
                    </View>

                </View>
                <View style={{height: 80, backgroundColor: '#C9DCBD', borderTopWidth: 5, borderTopColor: '#F0C63E', justifyContent: 'center', alignItems: 'center'}}>

                    <View style={styles.point1}>
                        <Text style={styles.numeros}> {points1}</Text>
                    </View>

                </View>
            
            </View> 
            <View style={styles.third}>
                <View style={{height: 80, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <View style={{borderRadius: 100, borderWidth: 2, height: 50, width: 50}}>
                    </View>
                    <View style={{marginBottom: -10}}>
                        <Text> username3 </Text>
                    </View>

                </View>

                {/* </View>  */}
                <View style={{height: 50, backgroundColor: '#C9DCBD', borderBottomRightRadius: 10, borderTopWidth: 5, borderTopColor: '#CA8A2B', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.point3}>
                        <Text style={styles.numeros}> {points3} </Text>

                    </View>

                </View>

            </View>
         </View> 
         {/* <View>
            <Text> hello </Text>
         </View> */}
            </ScrollView>
        </>
    );
}

export default LeaderboardScreen; 

const styles = StyleSheet.create({
    topContainer: {
        padding: 10,
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gain: {
        backgroundColor: '#4C7C4C',
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    podium: {
        // flex: 3,
        flexDirection: 'row',
        // height: 100,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 50,
        // marginBottom: 500,
        // justifyContent: 'flex-end'
    },

    second:{
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-end'
    },
    first:{
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-end'
    },
    third:{
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-end'
    },

    point2: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        borderRadius: 50,
        backgroundColor: '#C9C9C9',
        borderWidth: 2,
        borderColor: '#C9C9C9',
    },
    numeros: {
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#FFFFFF',
        alignItems: 'center',
        fontSize: 20,
    },
    point1: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        borderRadius: 50,
        backgroundColor: '#F0C63E',
        borderWidth: 2,
        borderColor: '#F0C63E'
    },

    point3: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#CA8A2B',
        borderWidth: 2,
        borderColor: '#CA8A2B'
    }

    // podium: {
    //     height: 200, 
    //     justifyContent: 'center', 
    //     alignItems: 'center', 
    // },


})
import {View, Text, Image, StyleSheet, Pressable, Alert, RefreshControl, FlatList, ScrollView} from "react-native";

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/auth-context";
import {signOut} from "firebase/auth";
import {auth, db} from "../dbfolder/logdb";
import {collection, doc, getDoc, getDocs, onSnapshot, updateDoc} from "firebase/firestore";
import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {storage} from "../dbfolder/logdb";
import {AD, AD1} from "../data/dataFRIENDS";
import {Entypo} from "@expo/vector-icons";
import {launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import * as React from "react";

const points = 35;
const amis = 15;
async function LG(authCtx){
    await signOut(auth).then(() => {
        authCtx.logout();
        Alert.alert(
            'Déconnecté ! ',
            'A plus tard !'
        );
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

// async function name({id,test}){
//     const docRef = doc(db, "users", id);
//     const docSnap = await getDoc(docRef);
//
//     if (docSnap.exists()) {
//         const test = docSnap.data();
//         return test;
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
//     // await db.collection("users").doc(String({id})).get().then(doc => {
//     //     return doc.data()
//     // })
// }
function ProfileScreen() {
    const authCtx = useContext(AuthContext);
    // const docRef = doc(db, 'users', auth.currentUser.uid);
    const [restaurantsList, setRestaurantsList] = useState([]); //Initialise restaurant list with setter
    const [errorMessage, setErrorMessage] = useState("");
    const [refreshing, setRefreshing] = useState(true);
    const [DataSource, setDataSource] = useState([]);

    const pickImage = async (a) => {
        let result;
        if (a === 1) {
            result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.All,
                allowsEditing:true,
                quality:1,
            });
        } else {
            result = await launchCameraAsync({
                mediaTypes: MediaTypeOptions.All,
                allowsEditing:true,
                quality:1,
            });
        }
        const source = result.assets[0].uri;
        const response = await fetch(source);
        const blob = await response.blob();
        const storageRef = ref(storage, auth.currentUser.uid + '/profilePicture/' + 'PP.png');
        await uploadBytes(storageRef,blob);
        Alert.alert(
            'Photo enregistrée'
        );
        getDownloadURL(ref(storage, auth.currentUser.uid + '/profilePicture/' + 'PP.png'))
            .then((url) => {
                const washingtonRef = doc(db, "users", auth.currentUser.uid);
                updateDoc(washingtonRef, {
                    ppurl: url
                });})};


    const getRestaurants = async () => {
        try {
            const list = [];
            const docRef = doc(db, "users", auth.currentUser.uid );
            console.log("Here");
            const docSnap = await getDoc(docRef);
            // const snapshot = await firestore.collection("users").get();
            console.log("Here");
            list.push(docSnap.data().username);
            list.push(docSnap.data().nom);
            list.push(docSnap.data().prenom);
            list.push(docSnap.data().ppurl);
            list.push(docSnap.data().age);
            list.push(docSnap.data().email);
            list.push(docSnap.data().points);
            list.push(docSnap.data().friends.length);
            // console.log(list);
            setRestaurantsList([...list]);
        } catch (e) {
            setErrorMessage(
                "There's nae bleeding restaurants, I told you to upload them!"
            );
        }
    };


    useEffect(() => {
        onRefresh();
    }, []);

    const getData = async () => {
        getRestaurants();
        setDataSource(restaurantsList);
        setRefreshing(false);
    }

    const onRefresh = async () => {
        setRefreshing(true);
        //Clear old data of the list
        setRestaurantsList([])
        console.log("List",restaurantsList)
        setDataSource([])
        console.log("DataSource",DataSource)
        //Call the Service to get the latest data
        await getData();
    };
    // const pathReference = ref(storage, auth.currentUser.uid + 'profilepicture/PP.jpg');
    // const navigation = useNavigation();
    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
            <View style={{flex: 4}}>

                <View style={{backgroundColor: '#FFFFFF', height: 50, justifyContent: 'center', alignItems: 'flex-end', borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#4C7C4C', marginRight: 100}}> {restaurantsList[0]} </Text>
                </View>

                <View style={styles.ppContainer}>
                    <Pressable  onPress={()=> pickImage(1)}>
                        <Image style={styles.profilePic} source={{
                            uri:restaurantsList[3]
                        }}/>
                    </Pressable>
                    {/* <Text style={{margin: 10, fontSize: 18}}> {points} </Text>  */}
                    <View style={{flexDirection: 'column', margin: 30, zIndex: 1, marginTop: -50}}>
                        <Text style={{fontSize : 30, color : '#4C7C4C'}}> {restaurantsList[6]} <Entypo name="leaf" size={30} color="#4C7C4C"/> </Text>
                        <Text style={{fontSize : 30, color : '#4C7C4C'}}> {restaurantsList[7]} amis </Text>

                    </View>

                </View>
                <View style={{color: 'lightgrey', margin: 10, backgroundColor: '#C9DCBD', flexDirection: 'column', borderRadius: 15}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10}}> Nom - Prénom :  </Text>
                            <Text style={{fontSize: 18, padding: 10}}> {restaurantsList[1]} {restaurantsList[2]} </Text>
                        </View>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10}}> Âge  : </Text>
                    <Text style={{fontSize: 18, padding: 10}}> {restaurantsList[4]} </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10}}> Email  : </Text>
                        <Text style={{fontSize: 18, padding: 10}}> {restaurantsList[5]} </Text>
                    </View>

                    </View>
                {/* <View  style={{flex:1}}>
            <Text>Prénom </Text>
        </View>  */}
                <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 10, flexDirection: 'column-reverse', flex: 1, marginBottom: 25}}>
                    <Pressable style={styles.button} onPress={() => LG(authCtx)}>
                        <Text style={{color: 'red', fontWeight: 'bold'}}> Déconnexion </Text>


                    </Pressable>
                </View>
            </View>
            </ScrollView>
        </>
    );
} 

export default ProfileScreen;

const styles = StyleSheet.create ( { 
    profilePic: { 
        borderRadius: 100, 
        width: 200,
        height: 200,
        borderColor: 'green',
        borderWidth: 5,
        marginTop: -50,
        zIndex: 1
    }, 

    ppContainer: { 
        // flex: 1, 
        height: 150, 
        // justifyContent: 'center',
        alignContent: 'center', 
        alignItems: 'center',
        margin: 15,
        flexDirection: 'row',
    }, 
    button: { 
        // position: 'absolute', 
        height: 40, 
        width: '60%', 
        borderWidth: 2, 
        borderColor: '#4C7C4C', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 30, 
        backgroundColor: '#FFFFFF', 
        // alignContent: 'center', 
        // margin: 90, 
        // marginLeft: 50, 
        // marginRight: 50, 
        // padding: 10 

    }
})
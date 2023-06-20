import { Pressable, View, Text, StyleSheet, Platform, Button, Alert, Image } from "react-native";

import {Entypo} from "@expo/vector-icons";
import {doc, updateDoc, arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
import {db, auth} from "../dbfolder/logdb";


function AddFriendsGridTile ({pp, username}) {
        async function HeaderButtonPressHandler() {
       const washingtonRef = doc(db, "users", auth.currentUser.uid);
          const docRef = doc(db, "addfriends", username );
          const docSnap = await getDoc(docRef)
            const docRefriend = doc(db, "users", docSnap.data().id );
// Atomically add a new region to the "regions" array field.
        await updateDoc(docRefriend, {
            demandsfriends: arrayUnion(auth.currentUser.uid)
        });
            Alert.alert(
                'Demande envoyé',
            );
        }

      return(

    <View style={styles.gridItem}>
        <View style={styles.container}>
            <View style={styles.innerLContainer}>
                <Image source={{uri:pp}} style={styles.image}/> 
            {/* </View> */}
            {/* <View style={styles.innerContainer}> */}
                <Text style={styles.username}> {username} </Text>
            </View>
            <View style={styles.innerRContainer}>
                <Pressable style={styles.button} onPress={(HeaderButtonPressHandler)}>
                    <Text style={{fontSize: 18, color:'white', fontWeight: 'bold'}}> Ajouter
                     </Text>
                </Pressable>
            {/* </View> */}
            {/* <View style={styles.innerContainer}> */}
                <Pressable onPress={HeaderButtonPressHandler}>
                    <Text><Entypo name="cross" size={50} color={'#C9DCBD'}/></Text>
                </Pressable>
            </View>
        </View>
    </View>
      )
} 

export default AddFriendsGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        // marginBottom: 16, 
        // marginTop: 16,
        height: 80, 
        // borderRadius: 5,
        // backgroundColor:'white',
        // shadowColor: 'black',
        // ShadowOpacity: 0.25,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 5,
        // overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        // borderWidth : 1,
        // borderColor: 'black'
    }, 

    container: {
        flex: 2, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        margin: 16, 
    }, 

    innerLContainer: {
        flex: 1,
        textAlign: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'flex-start'
    }, 
    
    innerRContainer: {
        flex: 1,
        textAlign: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },

    image: {
        width: 50,
        height: 50, 
        borderRadius: 100, 
        borderWidth: 1, 
    }, 
    
    username: {
        fontWeight: 'bold', 
        fontSize: 18, 
        textAlign: 'center', 
        alignContent: 'center', 
    }, 

    button: {
        width: 90, 
        height: 40, 
        // alignContent: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#4C7C4C', 
        borderRadius: 100, 
    }

})
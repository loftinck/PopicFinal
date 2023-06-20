import {StyleSheet, Text, Image, View, TouchableOpacity, Alert} from 'react-native';
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
    launchImageLibraryAsync,
    MediaTypeOptions
} from 'expo-image-picker';
import { useState } from 'react';
import {auth, db} from "../dbfolder/logdb";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import logo from '.././573252.jpg';
import React, { useEffect } from 'react';
import {storage} from "../dbfolder/logdb";
import { doc, updateDoc } from "firebase/firestore";

import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';

const UploadScreen = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
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
        const storageRef = ref(storage, auth.currentUser.uid + '/dailypop/' + 'dp.png');
        await uploadBytes(storageRef,blob);
        Alert.alert(
            'Daily Pop envoyé ! '
        );
        getDownloadURL(ref(storage, auth.currentUser.uid + '/dailypop/' + 'dp.png'))
            .then((url) => {
                const washingtonRef = doc(db, "users", auth.currentUser.uid);
                updateDoc(washingtonRef, {
                    dpurl: url
                });});
    };


    return(
        <View>
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=> pickImage(2)}
          style={styles.touchableOpacityStyle}>
            <Image
            source={require('../assets/logoCameraV2.png')}
            style={styles.floatingButtonStyle}/>
             {/* <View style={styles.imagePreview}>{imagePreview}</View>  */}
            {/* <Pressable style={styles.button} onPress={takeImageHandler}> */}
                {/* <Text style={styles.texte}>Prenez en photo votre challenge !</Text> */}
            {/* </Pressable> */}
        </TouchableOpacity>
        </View>

    );
}
export default UploadScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4C7C4C',
        alignItems: 'center', 
        padding: 2,
        width: '60%',
        alignSelf:'center',
        borderRadius: 20  ,
        marginTop:3 ,
        marginBottom: 70,
    },
    texte:{
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 8
    },
    texte2:{
        color: 'white',
        fontSize: 15,
    },
    imagePreview:{
        width:'50%',
        height: 40,
        marginVertical:2,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'gray',
        alignSelf:'center',
        borderRadius:5,
    },
    image:{
        width:'100%',
        height: '100%',
    },
    touchableOpacityStyle: {
        // position: 'absolute',
        //width: 190,
        // height:'20%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // right: '44%',
        // bottom: 6,
    },
    floatingButtonStyle: {
        resizeMode: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius:40,


    }
})

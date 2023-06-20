import { Pressable, View, Text, StyleSheet, Platform, Button, Alert, Image, Modal } from "react-native";
// import { GIFTS } from "../data/dataGIFT";
import { AntDesign} from "@expo/vector-icons"
import { useState } from "react";

function GiftGridTile ({companysname, points, detail, image, onPress}) {
    const[modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.gridItem}>
            {/* <Pressable android_ripple= {{color : '#ccc'}}
        style={({pressed}) => [styles.button,
        pressed ? styles.buttonPressed: null,
        ]}
        onPress={onPress}
        > */}
            <View style={styles.innerContainer}>
                <View style={[styles.innerTopContainer, {height: '5%'}]}>
                    <Text style={styles.taskTitle}> {companysname} </Text>
                    <Text style={styles.taskTitle}> {points} </Text>
                </View>

                <View style={styles.innerMidContainer}>
                    {/* <View >  */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        // backgroundColor= 'grey'
                        // style={{position: 'relative'}}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        {/* <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Get it now</Text>  */}

                        <Pressable  style={styles.buttonPressed} onPress={() =>
                            setModalVisible(!modalVisible)}>
                            <Text> QR Code à présenter</Text>
                            <AntDesign name='qrcode' size= {100} />

                        </Pressable>
                    </Modal>


                    <Pressable
                        style={styles.button} onPress={() =>
                        setModalVisible(true)} >
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Profitez-en !</Text>
                    </Pressable>
                    {/* </View> */}

                    <Image source ={{uri:image}} style={styles.image}/>

                </View>

                <View style={styles.innerBottomContainer}>
                    <Text style={styles.taskDet}> {detail}</Text>
                </View>
            </View>
            {/* </Pressable> */}
        </View>
    );
}

export default GiftGridTile;

const styles = StyleSheet.create({
        gridItem: {
            flex: 1,
            // marginBottom: 16,
            // marginTop: 16,
            height: 300,
            // borderRadius: 5,
            backgroundColor:'white',
            shadowColor: 'black',
            ShadowOpacity: 0.25,
            shadowOffset: {width: 0, height: 2},
            // shadowRadius: 5,
            overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
            borderWidth : 1,
            borderColor: 'black'
        },

        button:{
            // flex: 1,
            marginLeft: 100,
            marginRight: 100,
            borderRadius: 100,
            borderWidth: 6,
            // width: 150,
            // paddingLeft: 50,
            // paddingRight: 50,
            // height: 40,
            zIndex: 1,
            borderColor: '#44AFAB',
            backgroundColor: '#44AFAB',
            justifyContent: 'center',
            // alignItems: 'center',
            // alignContent: 'center',
            // textAlign: 'center',
            // alignSelf: 'center'
        },

        buttonPressed: {
            // opacity: 0.50,
            height: 200,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // alignContent: 'center',
            verticalAlign: 'middle',
            borderWidth: 2,
            borderRadius: 20,
            backgroundColor: '#C9C9C9',
            // margin: 100,
            // margin: 'middle',
            borderColor: 'green',
            marginTop: 250,
            // position: 'absolute'


        },

        innerContainer:{
            flex: 3,
            flexDirection: 'column',
            // marginBottom: 10,
            // marginTop: 16,
            color: '#85C17E',
            // padding: 16,
            // justifyContent: 'center',
            // alignItems: 'center',
            textAlign: 'center',
            alignContent: 'center',
        },

        taskTitle: {
            // flex: 1,
            // flexDirection: 'row',
            fontWeight:'bold',
            fontSize: 20,
        },

        taskDet: {
            // flex: 1,
            // flexDirection: 'row',
            // fontWeight:'bold',
            fontSize: 15,
        },

        innerTopContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            flexGrow: 0.2
        },

        innerMidContainer: {
            flex: 1,
            marginTop: 50,
            flexDirection: 'column',
            // height: '80%',
            // justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            // backgroundColor: 'black',
            flexGrow: 0.7,
        },
        innerBottomContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'flex-end',
            alignContent: 'center',
            textAlign: 'center',
            // height: 40,
            flexGrow: 0.1,

        },
        image: {
            width: '95%',
            // height: 100,
            height: '100%',
            marginTop: -100,
            borderRadius: 30,
            // marginLeft: 10,
            // marginRight: 10,
        },
        modalCentre: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 100,
            // alignSelf: 'center',
            // verticalAlign: 'middle',
        }
    }

);
import {
    FlatList,
    StyleSheet,
    StatusBar,
    View,
    Text,
    Button,
    Image,
    Pressable,
    Alert,
    RefreshControl
} from "react-native";
import { GIFTS } from "../data/dataGIFT";
import GiftGridTile from "../components/GiftsGridTile";
import {useEffect, useLayoutEffect, useState} from "react";
import { ProgressBar, MD3Colors } from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import {FontAwesome5} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../dbfolder/logdb";
import * as React from "react";

// import IconButton from '../components/IconButton';

// import { Directions } from "react-native-gesture-handler";

// import LeaderboardScreen from "./LeaderboardScreen";
// import { GDETAILS } from "../data/dataGIFT";

// function renderGiftItem(itemData) {
// // function PressHandler() {}
//     return (
//     <>
//     <GiftGridTile companysname={itemData.item.companysname} points={itemData.item.points} detail={itemData.item.detail} image={itemData.item.image} onPress={PressHandler}/>;
//     </>
//     );
// }

const endList = () => { 
  return ( 
    <View style={styles.endList}>

    </View>
  ); 
};

const topList = () => {
    return (
        <View style={{marginTop: 10}}>

        </View>
    );
};

function GiftScreen({ }) {
    const [restaurantsList, setRestaurantsList] = useState([]); //Initialise restaurant list with setter
    const [errorMessage, setErrorMessage] = useState("");
    const [refreshing, setRefreshing] = useState(true);
    const [DataSource, setDataSource] = useState([]);
    const getRestaurants = async () => {
        try {
            const list = [];
            const docRef = doc(db, "users", auth.currentUser.uid );
            const docSnap = await getDoc(docRef);
            list.push(docSnap.data().points);
            list.push(docSnap.data().points/100);
            // console.log(list);
            setRestaurantsList([...list]);
        } catch (e) {
            setErrorMessage(
                "There's nae bleeding restaurants, I told you to upload them!"
            );        }
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
    function renderGiftItem(itemData) {
        // function PressHandler() {
        //     navigation.navigate("Gift Details", {
        //         giftId: itemData.item.id, 
        //     });
        // }
        
        return <GiftGridTile companysname={itemData.item.companysname} points={itemData.item.points} detail={itemData.item.detail} image={itemData.item.image}/>;}
        
    return (
        <>
        <StatusBar style="light"/>
        {/* <View style={styles.container}> */}
            {/* <View style={styles.topContainer}>
                <Image style={[styles.profilePic, styles.leftContainer]}
                source={require('../assets/pp.jpg')}/>
            <View> 
                <View style={styles.rightContainer}>
                    <View style={styles.trightContainer}>
                        <Text style= {styles.topText}> Discounts </Text> 
                    </View>
                </View> 
                
                <View style={styles.brightContainer} >
                    <Text style={styles.topText}> Your points : </Text>
                    <Text style={styles.numPoints}> 35 <FontAwesome5 name="crown" size={35} color="black"/> </Text> 
                </View>
              </View>
            </View> */}

            <View style={styles.topContainer}>
                <Text style={styles.ProgressBarText}> Ta progression {"\n"} </Text>
                <ProgressBar progress={restaurantsList[1]}  color='#4C7C4C' style={styles.ProgressBar} />
                <View  style={styles.ProgressBarPoints}>
                  <Text style={{fontSize : 20, color : '#C9DCBD'}}>0 <Entypo name="leaf" size={24} color="#C9DCBD"/></Text>
                    <View>
                  <Text style={{fontSize : 35, color : '#4C7C4C', marginLeft:35}}>{restaurantsList[0]} <Entypo name="leaf" size={24} color="#4C7C4C"/></Text>
                    </View>
                  <Text style={{fontSize : 20, color : '#C9DCBD'}}>100 <Entypo name="leaf" size={24} color="#C9DCBD"/></Text>
                </View>
                

            </View>

            {/* <View style= {{padding: 16, shadowColor: 'black', backgroundColor: 'transparent'}}>
              <Text></Text>
            </View> */}
        {/* </View> */}
      
        <FlatList 
        ListHeaderComponent={topList}
        ListFooterComponent={endList}
        data={GIFTS}
        keyExtractor={(item) => item.id }
        renderItem={renderGiftItem
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        /> 

        {/* <View style={styles.bottomContainer}>
          <Text> Hello </Text>
        </View> */}
        </>
    );
}

export default GiftScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // borderWidth: 3,
    },

    // topContainer: {
    //   flex: 1,
    //   marginTop: 20,
    //   marginBottom: 20,
    //   padding: 10,
    //   flexDirection: 'row',
    //   textAlign: 'center',
    //   alignItems: 'center',
    // //   borderWidth: 3,
    // },

    topContainer: {
        // flex:1, 
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        padding: 10,
        // borderBottomWidth: 1,
        backgroundColor: '#fff',
        // shadowRadius: 3,
        // shadowColor: 'grey', 
        // flexDirection: 'row',
        // marginLeft: 10,
        // marginRight: 10,
        // borderBottomWidth: 2,
        // borderLeftWidth: 2,
        // borderRightWidth: 2,
        // borderColor: 'black'
    }, 

    bottomContainer:{
        // flex: 1,
        // margin: 50,
        backgroundColor: 'white',
        textAlign: 'center',
        alignItems: 'center', 
        padding: 60, 
    },

    leftContainer : {
    //   marginTop: 50,
        flexDirection: 'row',
        padding: 10,
        textAlign: 'center',
        alignItems: 'center'
    },

    rightContainer : {
        //   marginTop: 50,
          flexDirection: 'column',
          padding: 10,
          textAlign: 'center',
          alignItems: 'center'
        },

    trightContainer : {
        //   marginTop: 50,
          flexDirection: 'row',
        //   padding: 10,
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#44AFAB',
          borderWidth: 3,
          borderRadius: 50,
          borderColor: '#44AFAB',
        },
 
    brightContainer : {
    //   marginTop: 50,
      flexDirection: 'row',
    //   padding: 10,
      textAlign: 'center',
      alignItems: 'center'
    },

    numPoints: {
        padding: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 35, 
        fontWeight: 'bold',
        color: "black",
      },
      
      topText: {
        padding: 5,
        // marginLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 20, 
        color: "black",
      },

      ProgressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#4C7C4C',
        borderWidth: 2,
        borderRadius: 100
      }, 

      ProgressBarText: {
        // flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 15, 
        color: "black",
      }, 

      ProgressBarPoints: {
        // flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems : 'center',
        fontSize: 15, 
        color: "black", 
        marginBottom: 16,
      },

      profilePic: {
        borderRadius: 100,
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
      },

      midText: {
        padding: 10,
        // marginLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 35,
        fontWeight: 'bold', 
        color: "black",
      }, 

      endList: { 
        height: 70,
      }
});


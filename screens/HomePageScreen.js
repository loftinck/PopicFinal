import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Pressable,
    Modal,
    Text,
    Image,
    View,
    Button,
    ImageBackground,
    RefreshControl
} from 'react-native';
import IdentifientsGrid from '../components/IdentifientsGrid';
import {Ionicons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';
import {LinearGradient} from "expo-linear-gradient";
import UploadScreen from "./UploadScreen";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../dbfolder/logdb";
import AddFriends from "../models/addFriends";
import identifiants from "../models/identifiants";
import {IDENTIFIANTS} from "../data/id";

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }}

const endList = () => {
    return (
        <View style={styles.endList}>
        </View>
    );
};

const topList = () => {
    return (
        <View style={styles.boite}>
            <Text style={styles.textStyle3}>Repond aux quiz, récolte des feuilles et gagne des réductions!</Text>
            <View style={styles.boite2}>
                <AntDesign name="questioncircle" size={24} color="gray" />
                <Ionicons name="ios-arrow-forward" size={32} color="gray" />
                <Entypo name="leaf" size={24} color="gray" />
            </View>
        </View>
    );
};


// import Bouttons from '../Components/Bouttons';

// function PageAcceuil({navigation}) {
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight:()=> {
//         return<IconButton/>;
//           // <FlatList
//           //   data ={IDENTIFIANTS}
//           //   keyExtractor={(item) => item.id}
//           //   renderItem={renderIdentifientsItems}/>
//       },
//     });
//   }, [navigation, PageAcceuil]);
function renderCategoryItem(itemData){
    return(
        <IdentifientsGrid profil={itemData.item.profil} title={itemData.item.title} imageUrl={itemData.item.imageUrl} caption={itemData.item.caption} quiz={itemData.item.quiz}/>

    );
}



function HomePageScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setlist] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [DataSource, setDataSource] = useState([]);
    const IDENTIFIANTS =[
        new identifiants('https://www.shutterstock.com/image-vector/faceless-woman-face-icon-female-260nw-2263344341.jpg','c1','Loick','https://i.notretemps.com/1400x787/smart/2022/02/17/arbre.jpeg','Hate de voir grandir le nouveau citronier','Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'),
        new identifiants('https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin-1.jpg','c2', 'Tim', 'https://us.123rf.com/450wm/pryzmat/pryzmat1503/pryzmat150300026/38586665-three-plastic-trash-bins-with-segregated-household-garbage-pet-bottles-paper-and-metal-cans-shot.jpg?ver=6',"Je viens d'organiser mes déchets, c'est super satisfaisant",'Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'),
        new identifiants('https://www.shutterstock.com/image-vector/faceless-woman-face-icon-female-260nw-2263344341.jpg','c3', 'Alix','https://media.istockphoto.com/id/1273454530/fr/photo/trois-gosses-nettoyant-la-plage.jpg?s=612x612&w=0&k=20&c=sa5FFp7vLro5_uzXPSWr-2j1OUHUQsRLLwJDzuDjUnw=',"Aujourd'hui j'ai fait une collecte de déchets sur la plage!",'Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'),
        new identifiants('https://www.shutterstock.com/image-vector/faceless-woman-face-icon-female-260nw-2263344341.jpg','c4', 'Margaux_Barbarin','https://www.denormandie.fr/wp-content/uploads/2020/11/plantesvertes.jpg','Nouvelles plantes achetées à Truffaut','Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'),
        new identifiants('https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin-1.jpg','c5', 'Clara','https://leshopzerodechet.fr/wp-content/uploads/2022/06/Shamoing-solide-pour-cheveux-secs-Secret-de-Provence-Le-Shop-Zero-Dechet.png','Ca y est! Je suis passé au shampoing solide!','Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'),
    ];
    const getRestaurants = async () => {
        try {
            const test = [];
            const docRef = await doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const listdemand = docSnap.data().friends;
            await asyncForEach(listdemand, async (element) => {
                const docRef1 = await doc(db, "users", String(element));
                const docSnap1 = await getDoc(docRef1);
                test.push(new identifiants(docSnap1.data().ppurl, docSnap1.data().id, docSnap1.data().username,docSnap1.data().dpurl, 'Ceci est un test','Que represente cette image? \n \n Arrose des plante  \n Tri ses déchets'))

            });
            await asyncForEach(IDENTIFIANTS, async (element) => {
                test.push(element);
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


    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            {/* <ImageBackground source={{uri: 'https://i.pinimg.com/170x/29/74/80/29748024385efc09c25c5d6c9b4cfbbc.jpg'}} style={styles.image}> */}
                            {/* </ImageBackground> */}
                            <Text style={styles.textStyle5}>- - 20 juin 2023 - - </Text>
                            <Text style={styles.textStyle2}> Challenge du jour:
                                Arroser vos plantes!{"\n"}</Text>
                            <UploadScreen/>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Pic your daily Pop !</Text>
                </Pressable>
            </View>




            <FlatList
                ListHeaderComponent={topList}
                data={DataSource}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                ListFooterComponent={endList}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />








            {/*
      <FlatList
        data={IDENTIFIANTS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      /> */}





        </>
    );
};

export default HomePageScreen;


const styles = StyleSheet.create({
    centeredView: {
        // marginTop: 65,
        padding: 10,
        borderRadius:50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        width: '105%',
    },
    button: {
        elevation: 2,
        borderRadius:50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        flexDirection:'column'
    },
    boite:{
        backgroundColor: '#C9DCBD',
        width: '75%',
        borderRadius:25,
        alignSelf:'center',
        marginTop: 10

    },
    boite2:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    boite3:{
        width: '75%',
    },
    buttonOpen: {
        backgroundColor: '#4C7C4C',
        width: '60%',
        padding: 10,
    },
    buttonClose: {
        backgroundColor:'#4C7C4C',
        //backgroundColor: '#C9DCBD',
        width: '90%',
        marginTop:'60%',
        height:200,

    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    textStyle2: {
        color: 'white',
        // color: '#4C7C4C',
        textAlign: 'center',
        fontSize: 21,
    },
    textStyle3: {
        color: '#4C7C4C',
        textAlign: 'center',
        fontSize: 15
    },
    textStyle4:{
        fontSize: 50,
        color: '#4C7C4C',
    },
    textStyle5:{
        fontSize: 30,
        color: 'white',
    },
    modalText: {
        marginBottom: 13,
        textAlign: 'center',
    },
    container: {
        // flex: 1,
        flexDirection: 'column',// main axis en colonne VS Cross axis en ligne
        backgroundColor: '#fff',//permet d'avoir des bords autour des objects
        paddingTop:17,// dessend les icones
        paddingBottom:20,
        // padding: 4,
        borderColor: '#91CAA2',


        // alignItems: 'center',
    },
    BoiteTitre: {
        borderRadius:20,
        borderColor: '#91CAA2',
        borderWidth: 2,
        backgroundColor: '#C6E2CF',
        padding: 9, //permet d'avoir des bords dans la boite
        alignItems: 'center', //texte centrer dans la boite
        width: '80%',//longeur de ma boite
        elevation:9,
        justifyContent: 'center',
        alignSelf:'center',
    },
    BoiteFeed: {
        borderRadius:20,
        borderColor: '#91CAA2',
        borderWidth: 2,
        backgroundColor: '#C6E2CF',
        width: '100%',//longeur de ma boite
        elevation:9,

    },
    Titre1:{
        fontSize: 30,
    },
    Titre2:{
        fontSize: 17,
        alignItems:'baseline'
    },
    Image1:{
        width:370,
        height:370,
        alignSelf: 'center'

    },
    Image2:{
        width:50,
        height:50,
    },
    endList: {
        height: 20,
    }

})
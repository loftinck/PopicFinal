import {View, Text, ImageBackground, StyleSheet, Image, ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
const image = {uri: 'https://e0.pxfuel.com/wallpapers/392/354/desktop-wallpaper-light-yellow-aesthetic-soft-yellow-aesthetic.jpg'}
const image2 = {uri: 'https://i.pinimg.com/236x/aa/4f/b6/aa4fb6ec391286356a949f0823c00ea2.jpg'}
const image3 = {uri: 'https://www.itl.cat/pngfile/big/51-516691_sweet-as-apple-geometry-iphone-wallpaper-0351-minimalist.png'}
const image4 = {uri: 'https://i.pinimg.com/170x/29/74/80/29748024385efc09c25c5d6c9b4cfbbc.jpg'}
const image5 = {uri: 'https://i.pinimg.com/236x/a8/7b/8a/a87b8ac409736fa34eb84bd90f35ff50.jpg'}
function TipsScreen() {
    return (
        <>
        {/*// <LinearGradient colors={['#C9DCBD', '#F5F5F5']}style={styles.container}>*/}
        {/*// <ImageBackground source={require('../assets/soleil.png')} style={styles.image}>*/}
            <ScrollView>
            <View style={{flexDirection:"column", justifyContent:"center",alignItems:"center", marginTop:10}}>
            <Text style={styles.texteTitre}>Faites attention à votre consommation d'eau !</Text>
            <Image source={require('../assets/soleil.png')} style={styles.image}/>
            </View>
            <View style={{zIndex:1, marginTop:-125}}>
            <Text style={styles.texteTitre3}>   Un français consomme en moyenne 143 litres d’eau par jour. Certains gestes simples permettent de freiner cette utilisation excessive des ressources : {"\n"}Ne pas laisser couler le robinet : éteindre l’eau pendant le nettoyage des mains ou le brossage de dents, mais aussi penser à colmater les fuites.{"\n"}{"\n"}Petites astuces pour faire la vaisselle sans gaspiller d’eau: Quand vous nettoyez votre vaisselle à la main, utilisez les deux bacs de votre évier ou – le cas échéant –  une bassine : un bac avec du produit vaisselle pour récurer, un autre pour rincer.</Text>
            </View>

            {/* </ImageBackground> */}

        {/*</ImageBackground>*/}
            </ScrollView>
        </>
    )
}

export default TipsScreen;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        
    },
    image: {
        justifyContent: 'center',
        marginTop:-80,
        width:"100%"
        // height:500,
        
    },
    texteTitre:{
        justifyContent:"flex-start",
        textAlign:"center",
        width: 250,
        fontSize: 23,
        fontWeight: 'bold',
        color: '#4C7C4C',
        zIndex:1
    },
    texteTitre2:{
        fontSize: 15,
        fontWeight: '100',
        color: 'black',
        alignSelf:'center',
        width: '90%',
        marginTop: 6,
        textAlign: 'justify'
    },
    texteTitre3:{
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        alignSelf:'center',
        width: '90%',
        marginTop:120,
        textAlign:"justify",
    }

})
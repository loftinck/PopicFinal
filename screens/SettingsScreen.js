import { View, Text,FlatList, StyleSheet} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



export const ModeSombre = (<Ionicons name="moon" size={24} color="pink" />);
export const NomUtilisateur = (<AntDesign name="user" size={24} color="purple" />);
export const Deconnection = (<FontAwesome name="power-off" size={24} color="blue" />);
export const Confidentialité = (<MaterialIcons name="security" size={24} color="green" />);
export const Avatar = (<AntDesign name="smile-circle" size={24} color="yellow" />);
export const Son = (<FontAwesome name="bell" size={24} color="orange" />);
export const Photos = (<AntDesign name="picture" size={24} color="red" />)



function Parametre(){
    return (
        <View style={styles.bottomBox}>
            <FlatList
                contentContainerStyle={styles.listItem}
                data={[
                    {key: 'Mode Sombre', page:'Book', icon: ModeSombre},
                    {key: "Nom d'utilisateur", page:'Availability', icon:NomUtilisateur},
                    {key: "Deconnection", page:'Deconnection', icon:Deconnection},
                    {key: 'Confidentialité et sécurité', page:'Faq', icon: Confidentialité},
                    {key: 'Avatar', page: 'Links', icon: Avatar},
                    {key: 'Sons et notifications', page:'Faq', icon: Son},
                    {key: 'Photos et médias', page: 'Links', icon: Photos},
                ]}
                onPress={() => this.props.navigation.navigate('Book')}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(`${item.page}`)}>
                            <View style={styles.boite}>
                                <Text style={styles.texte}>{item.icon}{item.key}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}
export default Parametre;

const styles = StyleSheet.create({
    bottomBox: {
        // flex:10,
        padding: 10

    },
    listItem: {
        // flex:10,
        justifyContent: 'center' ,
    },
    texte:{
        fontSize:20,
        color: 'black',
    },
    boite:{
        paddingTop:42
    }
});
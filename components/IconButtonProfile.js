import { Pressable, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
// import { Navigation } from "react-native-navigation";

function IconButtonProfile({icon, color, onPress}) {
    return (
    <Pressable onPress={onPress} style={[({pressed}) => pressed && styles.pressed, styles.position]}>
        <FontAwesome name='user' size={24} color='black'/>
    </Pressable>
    );
}

export default IconButtonProfile; 

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    position:{
    //    paddingLeft: 10,
       paddingRight: 10,
    }
}); 
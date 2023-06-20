import { Ionicons } from "@expo/vector-icons";
import { Pressable,Text } from "react-native/types";

function OutlinedButton ({onPress, icon, children}){
    return(
    <Pressable style={({pressed}) =>[styles.button, pressed && styles.pressed]}
     onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18}color='gray'/>
        <Text> style={styles.text}{children}</Text>
        </Pressable>
    );
}

export default OutlinedButton;

const styles= StyleSheet.create({
    button:{
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin:4,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "gray"
    },
    pressed:{
        opacity: 0.7
    },
    icon: {
        marginRight:6
    },
    text:{
        color: "green"
    }
});
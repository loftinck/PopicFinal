import { View, Text, StyleSheet} from 'react-native'; 

function GDetailsItem ({companysname, detail}) {
    return (
        <View>
            <View>
            <Text style={styles.titleDetail}>{companysname}</Text>
            </View>
            <View>
                <Text style={styles.containerDetail}>{detail}</Text>
            </View>
        </View>
    );
}

export default GDetailsItem; 

const styles = StyleSheet.create({

    titleDetail: {
        flex: 1,
        padding: 16, 
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#85C17E',
    },
    
    containerDetail: {
        flex: 1,
        padding: 16, 
        justifyContent: 'flex-start',
        fontSize: 16,
    }

});
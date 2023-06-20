import { View, StyleSheet, FlatList } from "react-native";
import { GDETAILS, GIFTS } from "../data/dataGIFT";
import GDetailsItem from "../components/GDetailsItem";


function GiftDetailsScreen({ route }) {
    const gId = route.params.giftId; 

    const displayedGifts = GDETAILS.filter((detailsItem) => {
        return detailsItem.giftIds.indexOf(gId) >=0; 
    });

    function renderGDetailsItem(itemData) {
        return <GDetailsItem companysname={itemData.item.companysname} detail={itemData.item.detail} />
    }

    return <View style={styles.container}>
    
    <FlatList data = {displayedGifts} keyExtractor={(item) => item.id} renderItem={renderGDetailsItem} />

    </View>
};

export default GiftDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16, 
    }
});

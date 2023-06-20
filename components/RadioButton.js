import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"


export default function RadioButton({ isChecked, text, onRadioButtonPress }) {

    const _renderCheckedView = () => {
        return isChecked ? (
            <View style={[styles.radioButtonIconInnerIcon]} />
        ) : null;
    };

    return (
        <TouchableOpacity style={styles.mainContainer} onPress={onRadioButtonPress}>
            <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
            <View style={[styles.radioButtonTextContainer]}>
                <Text style={styles.radioButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        height: 28,
        marginTop: 2,
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        //   borderWidth: 0.5,
        //   borderColor: "gray",
        flexDirection: "row",
        alignItems: "center",
        width:370
    },
    radioButtonIcon: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#4C7C4C",
        height: 20,
        width: 20,
        borderRadius: 30 / 2,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonIconInnerIcon: {
        height: 15,
        width: 15,
        backgroundColor: "#4C7C4C",
        borderRadius: 25 / 2,
        borderWidth: 1,
        borderColor: "white",
    },
    radioButtonTextContainer: {
        flex: 5,
        height: 40,
        justifyContent: "center",
    },
    radioButtonText: {
        fontSize: 14,
        color:'gray'
    },
});
import {StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import ExoText from "../buildingblocks/ExoText";
import React from "react";

export default function DamageHitBox({onPress, text}) {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor="white"
            style={[styles.dmgBtn]}>
            <ExoText style={[styles.dmgText]}>{text}</ExoText>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    dmgBtn: {
        zIndex: -1,
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    dmgText: {
        fontSize: 60
    }
});
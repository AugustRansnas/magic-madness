import {StyleSheet, View} from "react-native";
import React from "react";
import DamageHitBox from "../DamageHitBox";
import {useStore} from "../../../store/store";
import * as core from "../../../store/core";
import ExoText from "../../buildingblocks/ExoText";

const widthAndHeightMap = {
    2: {width: "100%", height: "50%"},
    3: {width: "50%", height: "50%"},
    4: {width: "50%", height: "50%"}
};

export default function CommanderDamage({player}) {
    const {state, dispatch} = useStore();
    const numberOfPlayers = core.getNumberOfPlayers(state);
    const cmdBoxWidth = widthAndHeightMap[numberOfPlayers].width;
    const cmdBoxHeight = widthAndHeightMap[numberOfPlayers].height;
    return (
        <View style={[styles.container ]}>
            {state.players.map((player) => {
                return (
                    <View key={player.id} style={[styles.commander, {width: cmdBoxWidth, height: cmdBoxHeight, backgroundColor: player.theme}]}>
                        <DamageHitBox onPress={() => console.log("hej")} text="-"/>
                        <DamageHitBox onPress={() => console.log("hej")} text="+"/>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        width: "100%",
    },
    commander: {
        borderWidth: 1
    }
});





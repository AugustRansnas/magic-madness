import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {useStore} from "../../store/store";
import actions from "../../store/actions";
import ExoText from "../buildingblocks/ExoText";

function calculatePadding(isRotated) {
    return isRotated ? {
        paddingHorizontal: "7.5%",
        paddingVertical: "2.5%",
    } : {
        paddingHorizontal: "2.5%",
        paddingVertical: "7.5%",
    };
}

export default function CommanderDamage({player, isRotated}) {
    const {state, dispatch} = useStore();
    const opponents = state.players.filter(p => p.id !== player.id);
    const fontSize = opponents.length > 3 ? 30 : 50;

    return (
        <View style={[styles.container, {...calculatePadding(isRotated)}]}>
            {opponents.map((p) => (
                <View key={`${player.id}-${p.id}`} style={[styles.commanderBox, {backgroundColor: p.theme}]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                        type: actions.ADD_COMMANDER_DAMAGE,
                        data: {player, commanderId: p.id}
                    })}>
                        <ExoText style={[styles.text, {fontSize}]}>+</ExoText>
                    </TouchableOpacity>
                    <View style={[styles.counter]}>
                        <ExoText style={[styles.text, {fontSize}]}>{player.commanderDamage[p.id] || 0}</ExoText>
                    </View>
                    <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                        type: actions.SUBTRACT_COMMANDER_DAMAGE,
                        data: {player, commanderId: p.id}
                    })}>
                        <ExoText style={[styles.text, {fontSize}]}>-</ExoText>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    commanderBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    counter: {
        position: "absolute",
        zIndex: -1
    },
    button: {
        flex: 1,
        width: "100%",
        justifyContent: "center"
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold"
    }
});
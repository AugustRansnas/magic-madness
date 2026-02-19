import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useStore} from "../../../store/store";
import * as core from "../../../store/core";
import actions from "../../../store/actions";
import ExoText from "../../buildingblocks/ExoText";

function PlayerSlot({player, currentPlayer, dispatch, isCurrentPlayer}) {
    const damage = currentPlayer.commanderDamage[player.id] || 0;

    if (isCurrentPlayer) {
        return (
            <View style={[styles.slot, {backgroundColor: player.theme}]}>
                <View style={styles.dimOverlay}/>
                <ExoText style={styles.youText}>YOU</ExoText>
            </View>
        );
    }

    return (
        <View style={[styles.slot, {backgroundColor: player.theme}]}>
            <TouchableOpacity
                style={styles.hitArea}
                onPress={() => dispatch({
                    type: actions.ADD_COMMANDER_DAMAGE,
                    data: {player: currentPlayer, commanderId: player.id}
                })}
            >
                <ExoText style={styles.buttonText}>+</ExoText>
            </TouchableOpacity>
            <View style={styles.counter}>
                <ExoText style={styles.counterText}>{damage}</ExoText>
            </View>
            <TouchableOpacity
                style={styles.hitArea}
                onPress={() => dispatch({
                    type: actions.SUBTRACT_COMMANDER_DAMAGE,
                    data: {player: currentPlayer, commanderId: player.id}
                })}
            >
                <ExoText style={styles.buttonText}>-</ExoText>
            </TouchableOpacity>
        </View>
    );
}

function getRowHeight(numPlayers, rowType) {
    switch (numPlayers) {
        case 2: case 3: case 4:
            return "50%";
        case 5:
            return rowType === 'bottom' ? "30%" : "35%";
        case 6:
            return (rowType === 'top' || rowType === 'bottom') ? "20%" : "30%";
        default:
            return "50%";
    }
}

export default function CommanderDamage({player}) {
    const {state, dispatch} = useStore();
    const currentPlayer = state.players.find(p => p.id === player.id);
    const rows = core.getPlayerRows(state);
    const numPlayers = core.getNumberOfPlayers(state);

    return (
        <View style={styles.container}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={[styles.row, {height: getRowHeight(numPlayers, row.type)}]}>
                    {row.players.map((p) => (
                        <PlayerSlot
                            key={p.id}
                            player={p}
                            currentPlayer={currentPlayer}
                            dispatch={dispatch}
                            isCurrentPlayer={p.id === currentPlayer.id}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    row: {
        flexDirection: "row",
    },
    slot: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.15)",
    },
    dimOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    youText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "rgba(255,255,255,0.6)",
    },
    hitArea: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 32,
        alignSelf: "center",
        fontWeight: "bold",
        color: "white",
    },
    counter: {
        position: "absolute",
        zIndex: -1,
    },
    counterText: {
        fontSize: 44,
        fontWeight: "bold",
        color: "white",
    },
});

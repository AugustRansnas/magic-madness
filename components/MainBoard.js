import React from "react";
import {StyleSheet, View} from "react-native";
import Menu from "./menu/Menu";
import Player from "./player/Player";
import {useStore} from "../store/store";
import * as core from "../store/core";

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

function getMenuAfterIndex(numPlayers) {
    if (numPlayers <= 4) return 0;
    if (numPlayers === 5) return 1; // between second pair and bottom player
    return 1; // 6 players: between the two sideways pairs
}

function PlayerRow({row, numPlayers}) {
    const height = getRowHeight(numPlayers, row.type);
    return (
        <View style={[styles.playerRow, {height}]}>
            {row.players.map((player) =>
                <Player key={player.id} player={player}/>
            )}
        </View>
    );
}

export default function MainBoard() {
    const {state} = useStore();
    const rows = core.getPlayerRows(state);
    const numPlayers = core.getNumberOfPlayers(state);
    const menuAfterIndex = getMenuAfterIndex(numPlayers);

    return (
        <>
            {rows.map((row, index) => (
                <React.Fragment key={index}>
                    <PlayerRow row={row} numPlayers={numPlayers}/>
                    {index === menuAfterIndex && <Menu/>}
                </React.Fragment>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    playerRow: {
        flexDirection: "row",
        flexShrink: 1
    }
});

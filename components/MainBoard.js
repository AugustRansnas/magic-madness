import React from "react";
import {StyleSheet, View} from "react-native";
import Menu from "./menu/Menu";
import Player from "./player/Player";
import {useStore} from "../store/store";
import * as core from "../store/core";

function PlayerHalf({halfOfPlayers}) {
    return (
        <View style={styles.playerHalf}>
            {halfOfPlayers.map((player) =>
                <Player key={player.id}
                        player={player}/>
            )}
        </View>
    );
}

export default function MainBoard() {
    const {state} = useStore();

    const firstHalf = core.getFirstPlayerHalf(state);
    const secondHalf = core.getSecondPlayerHalf(state);

    return (
        <>
            <PlayerHalf halfOfPlayers={firstHalf}/>
            <Menu/>
            <PlayerHalf halfOfPlayers={secondHalf}/>
        </>
    );
}

const styles = StyleSheet.create({
    playerHalf: {
        height: "50%",
        flexDirection: "row",
        flexShrink: 1
    }
});

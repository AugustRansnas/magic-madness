import React from 'react';
import {StyleSheet, View} from "react-native"
import Menu from './Menu';
import Player from './Player';
import {useStore} from "../store/store";
import * as core from '../store/core';

function PlayerHalf({halfOfPlayers}) {
    const width = halfOfPlayers.length === 1 ? '100%' : '50%'
    return (
        <View style={styles.playerHalf}>
            {halfOfPlayers.map((player) =>
                <Player key={player.id}
                        width={width}
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
        <View style={styles.container}>
            <PlayerHalf halfOfPlayers={firstHalf}/>
            <Menu/>
            <PlayerHalf halfOfPlayers={secondHalf}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    playerHalf: {
        height: '50%',
        flexDirection: 'row',
        flexShrink: 1
    }
});

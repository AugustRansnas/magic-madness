import React from 'react';
import {StyleSheet, View} from "react-native"
import Menu from './Menu';
import MenuItem from './MenuItem';
import Player from './Player';
import {useStore} from "../store/store";
import MainMenuButton from "./MainMenuButton";

function calculatePlayerWidth(halfOfPlayers) {
    return halfOfPlayers.length === 1 ? '100%' : '50%'
}

function getFirstHalf(players) {
    const length = players.length;
    if (length === 4 || length === 3) {
        return players.slice(0, 2)
    }
    return players.slice(0, 1)
}

function getSecondHalf(players) {
    const length = players.length;
    if (length === 4) {
        return players.slice(-2)
    }
    return players.slice(-1)
}

function PlayerHalf({halfOfPlayers}) {
    return (
        <View style={styles.playerHalf}>
            {halfOfPlayers.map((player) =>
                <Player key={player.id}
                        width={calculatePlayerWidth(halfOfPlayers)}
                        player={player}/>
            )}
        </View>
    );
}


export default function MainBoard() {
    const {state: {players}} = useStore();

    const firstHalf = getFirstHalf(players);
    const secondHalf = getSecondHalf(players);

    return (
        <View style={styles.container}>
            <PlayerHalf halfOfPlayers={firstHalf}/>
            <MenuItem />
            <MainMenuButton />
            <Menu/>
            <PlayerHalf halfOfPlayers={secondHalf}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    playerHalf: {
        height: '50%',
        flexDirection: 'row',
        flexShrink: 1
    }
});

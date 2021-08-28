import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStore} from '../store/store';

export default function Player({width, player}) {
    const {state, dispatch} = useStore();

    return (
        <View style={[styles.player,
            {
                transform: [{rotate: "90deg"}],
                width
            }
        ]}>
            <Text>Id: {player.id}</Text>
            <Text>Life: {player.life}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    player: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

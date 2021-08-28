import React, {useRef} from 'react';
import {Animated, Easing, StyleSheet, Text} from 'react-native';
import {useStore} from '../store/store';
import * as core from '../store/core';

const rotations = {
    2: {
        1: 0,
        2: 0
    },
    3: {
        1: 90,
        2: -90,
        3: 0,
    },
    4: {
        1: 90,
        2: -90,
        3: 90,
        4: -90
    }
};

function calculateRotation(numberOfPlayers, id) {
    return rotations[numberOfPlayers][id];
}

export default function Player({width, player}) {
    const {state} = useStore();
    const numberOfPlayers = core.getNumberOfPlayers(state)

    const rotation = useRef(new Animated.Value(0)).current;

    Animated.timing(
        rotation,
        {
            toValue: calculateRotation(numberOfPlayers, player.id),
            duration: 750,
            easing: Easing.bounce,
            useNativeDriver: true
        }
    ).start()

    const spin = rotation.interpolate({
        inputRange: [-90, 90],
        outputRange: ['-90deg', '90deg']
    })

    return (
        <Animated.View style={[styles.player,
            {
                transform: [{
                    rotate: spin,
                }],
                width
            }
        ]}>
            <Text>Id: {player.id}</Text>
            <Text>Life: {player.life}</Text>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    player: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

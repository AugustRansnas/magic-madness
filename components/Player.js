import React, {useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../store/store';
import * as core from '../store/core';

const colors = {
    FOREST: '#00733d',
    ISLAND: '#0e68ab',
    SWAMP: '#150b00',
    PLAINS: '#f8e7b9',
    MOUNTAIN: '#d32029'
}

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
    const {state, dispatch} = useStore();
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
        <View style={[styles.playerContainer, {width}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                }
            ]}>
                <View style={styles.player}>
                    <TouchableOpacity onPress={() => dispatch({type: 'SUBTRACT_DMG', data: player})}>
                        <Text style={styles.mainDmgButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.playerText}>{player.life}</Text>
                    <TouchableOpacity onPress={() => dispatch({type: 'ADD_DMG', data: player})}>
                        <Text style={styles.mainDmgButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

        </View>
    )
}


const styles = StyleSheet.create({
    playerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
/*
        borderColor: 'gold',
        backgroundColor: 'grey',
*/
        borderRadius: 8
    },
    player: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
/*
        borderWidth: 2,
        borderColor: 'green'
*/
    },
    playerText: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    mainDmgButton: {
        fontSize: 60,
        fontWeight: 'bold',
        paddingHorizontal: 20,
/*
        borderWidth: 2,
        borderColor: 'red'
*/
    }
});

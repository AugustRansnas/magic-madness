import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useStore} from '../store/store';
import actions from "../store/actions";
import * as core from '../store/core';
import Damage from "./Damage";

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

function isPlayerRotated(numberOfPlayers, id) {
    return calculateRotation(numberOfPlayers, id) !== 0;
}

export default function Temp({width, player}) {
    const {state, dispatch} = useStore();
    const rotation = useRef(new Animated.Value(0)).current;
    const numberOfPlayers = core.getNumberOfPlayers(state);
    const isRotated = isPlayerRotated(numberOfPlayers, player.id);
    const {windowWidth, windowHeight} = core.getWindow();

    useEffect(() => {
        Animated.timing(
            rotation,
            {
                toValue: calculateRotation(numberOfPlayers, player.id),
                duration: 750,
                easing: Easing.bounce,
                useNativeDriver: true
            }
        ).start()
    }, [numberOfPlayers])

    const spin = rotation.interpolate({
        inputRange: [-90, 90],
        outputRange: ['-90deg', '90deg']
    })

    const height = isRotated ? windowWidth / 2 : windowHeight / 2

    return (
        <View style={[styles.playerContainer, {width}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                }
            ]}>
                <Carousel
                    data={[
                        {
                            addDmg: () => dispatch({type: actions.ADD_DMG, data: player}),
                            subtractDmg: () => dispatch({type: actions.SUBTRACT_DMG, data: player}),
                            showRecentDmg: true
                        },
                        {
                            addDmg: () => console.log('todo! +'),
                            subtractDmg: () => console.log('todo! -'),
                        }
                    ]}
                    renderItem={({item: {addDmg, subtractDmg, showRecentDmg}}) => {
                        return (
                            <Damage
                                player={player}
                                isRotated={isRotated}
                                addDmg={addDmg}
                                subtractDmg={subtractDmg}
                                showRecentDmg={showRecentDmg}
                            />
                        )
                    }}
                    vertical
                    sliderHeight={height}
                    itemHeight={height}
                />
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    playerContainer: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8
    }
});

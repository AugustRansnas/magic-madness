import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../store/store';
import actions from "../store/actions";
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

function isPlayerRotated(numberOfPlayers, id) {
    return rotations[numberOfPlayers][id] !== 0;
}


function calculateRotation(numberOfPlayers, id) {
    return rotations[numberOfPlayers][id];
}

export default function Player({width, player}) {
    const {state, dispatch} = useStore();
    const numberOfPlayers = core.getNumberOfPlayers(state)
    const [recentDmg, setRecentDmg] = useState(null);

    const addDmg = () => {
        setRecentDmg(recentDmg + 1);
    }

    const subtractDmg = () => {
        setRecentDmg(recentDmg - 1);
    }

    const resetRecentDmg = () => {
        setRecentDmg(null);
    }

    const timer = useRef(null);

    function doDmg(fn, resetFn) {
        clearTimeout(timer.current);
        fn()

        timer.current = setTimeout(function () {
            resetFn(0)
        }, 2000)
    }

    const rotation = useRef(new Animated.Value(0)).current;

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

    const isRotated = isPlayerRotated(numberOfPlayers, player.id);
    const mainDmgButtonPadding = isRotated ? 0 : 50;
    const lifeWidth = 100;

    const lifePositionLeft = useMemo(() => {
        const windowWidth = Dimensions.get('window').width;
        const lifeWidthOffset = (lifeWidth / 2);
        return isRotated ? (windowWidth / 4) - lifeWidthOffset : (windowWidth / 2) - lifeWidthOffset
    }, [numberOfPlayers])

    return (
        <View style={[styles.playerContainer, {width}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                }
            ]}>
                <View style={styles.dmgContainer}>
                    <View style={styles.recentDmg}>
                        <Text style={styles.recentDmgText}>{recentDmg}</Text>
                    </View>
                    <View style={styles.dmgInputContainer}>
                        <TouchableOpacity style={[styles.mainDmgButton, {paddingLeft: mainDmgButtonPadding}]}
                                          onPress={() => {
                                              dispatch({type: actions.SUBTRACT_DMG, data: player})
                                              doDmg(subtractDmg, resetRecentDmg)
                                          }}>
                            <Text style={[styles.mainDmgButtonText, {textAlign: 'left'}]}>-</Text>
                        </TouchableOpacity>
                        <View style={[styles.lifeBox, {width: lifeWidth, left: lifePositionLeft}]}>
                            <Text style={[styles.lifeText, {fontSize: isRotated ? 50 : 60}]}>{player.life}</Text>
                        </View>
                        <TouchableOpacity style={[styles.mainDmgButton, {paddingRight: mainDmgButtonPadding}]}
                                          onPress={() => {
                                              dispatch({type: actions.ADD_DMG, data: player})
                                              doDmg(addDmg, resetRecentDmg)
                                          }}>
                            <Text style={[styles.mainDmgButtonText, {textAlign: 'right'}]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    playerContainer: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8
    },
    dmgContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    dmgInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentDmg: {
        position: 'absolute',
        bottom: 75
    },
    recentDmgText: {
        fontSize: 30
    },
    lifeBox: {
        position: 'absolute',
        zIndex: -1,
    },
    mainDmgButton: {
        flex: 1,
    },
    lifeText: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold'
    },
    mainDmgButtonText: {
        fontSize: 60,
        fontWeight: 'bold'
    }
});

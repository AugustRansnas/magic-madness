import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useStore} from '../store/store';
import actions from "../store/actions";
import * as core from '../store/core';
import Damage from "./Damage";
import Stats from "./Stats";

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
        <View style={[styles.playerContainer, {width, backgroundColor: player.theme}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                    width: isRotated ? windowHeight / 2 : '100%',
                }
            ]}>

                <Carousel
                    data={[
                        {
                            addDmg: () => dispatch({type: actions.ADD_DAMAGE, data: player}),
                            subtractDmg: () => dispatch({type: actions.SUBTRACT_DAMAGE, data: player}),
                            hitPoints: player.life,
                            showRecentDmg: true,
                        },
                        ...state.players.map(p => {
                            if (p.id !== player.id) {
                                return {
                                    addDmg: () => dispatch({type: actions.ADD_COMMANDER_DAMAGE, data: {player, commanderId: p.id}}),
                                    subtractDmg: () => dispatch({type: actions.SUBTRACT_COMMANDER_DAMAGE, data: {player, commanderId: p.id}}),
                                    hitPoints: player.commanderDamage[p.id],
                                }
                            }
                        }).filter(v => v)
                    ]}
                    renderItem={({item: {addDmg, subtractDmg, showRecentDmg, hitPoints, style}}) => {
                        return (
                            <>
                                <Stats isRotated={isRotated} playerId={player.id}/>
                                <Damage
                                    style={style}
                                    player={player}
                                    isRotated={isRotated}
                                    addDmg={addDmg}
                                    subtractDmg={subtractDmg}
                                    hitPoints={hitPoints}
                                    showRecentDmg={showRecentDmg}
                                />
                            </>
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
        alignItems: 'center',
        borderRadius: 8
    }
});

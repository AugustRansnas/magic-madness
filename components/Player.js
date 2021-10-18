import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useStore} from '../store/store';
import actions from "../store/actions";
import * as core from '../store/core';
import Damage from "./Damage";
import Stats from "./Stats";
import CommanderDamage from "./CommanderDamage";

const rotations = {
    2: {
        1: 180,
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
    return numberOfPlayers > 2 && calculateRotation(numberOfPlayers, id) !== 0;
}

function getCarouselWidth(state, isRotated) {
    const {windowWidth, windowHeight} = core.getWindow();
    const isMenuOpen = core.isMenuOpen(state);
    if (isRotated) {
        if (isMenuOpen) {
            return (windowHeight / 2) * 0.9;
        }
        return (windowHeight / 2);
    }
    return windowWidth;
}


function getCarouselHeight(state, isRotated) {
    const {windowWidth, windowHeight} = core.getWindow();
    const isMenuOpen = core.isMenuOpen(state);
    if (isRotated) {
        return (windowWidth / 2);
    }
    if (isMenuOpen) {
        return (windowHeight / 2) * 0.9;
    }
    return (windowHeight / 2);
}

export default function Player({width, player}) {
    const {state, dispatch} = useStore();
    const rotation = useRef(new Animated.Value(0)).current;
    const numberOfPlayers = core.getNumberOfPlayers(state);
    const isRotated = isPlayerRotated(numberOfPlayers, player.id);

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


    const carouselWidth = getCarouselWidth(state, isRotated);
    const carouselHeight = getCarouselHeight(state, isRotated);

    return (
        <View style={[styles.playerContainer, {width, backgroundColor: player.theme}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                    height: carouselHeight,
                    width: carouselWidth
                }
            ]}>
                <Stats isRotated={isRotated} playerId={player.id}/>
                <Carousel
                    data={[
                        {
                            addDmg: () => dispatch({type: actions.ADD_DAMAGE, data: player}),
                            subtractDmg: () => dispatch({type: actions.SUBTRACT_DAMAGE, data: player}),
                            hitPoints: player.life,
                            showRecentDmg: true,
                        },
                        {
                          index: 1
                        }
                    ]}
                    renderItem={({item: {index, addDmg, subtractDmg, showRecentDmg, hitPoints}}) => {
                        return !index ? (
                            <Damage
                                player={player}
                                isRotated={isRotated}
                                addDmg={addDmg}
                                subtractDmg={subtractDmg}
                                hitPoints={hitPoints}
                                showRecentDmg={showRecentDmg}
                            />
                        ) : (<CommanderDamage player={player}/>)
                    }}
                    sliderWidth={carouselWidth}
                    itemWidth={carouselWidth}
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

import React, {useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet, View} from "react-native";
import {useStore} from "../store/store";
import * as core from "../store/core";
import Stats from "./Stats";
import Damage from "./Damage";
import actions from "../store/actions";

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
    if (isRotated) {
        if (state.menuOpen) {
            return (windowHeight / 2) * 0.90;
        }
        return (windowHeight / 2);
    }
    return windowWidth;
}

function getCarouselHeight(state, isRotated) {
    const {windowWidth, windowHeight} = core.getWindow();
    if (isRotated) {
        return (windowWidth / 2);
    }

    if (state.menuOpen) {
        return (windowHeight / 2) * 0.9;
    }
    return (windowHeight / 2);
}

export default function Player({ player}) {
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
        ).start();
    }, [numberOfPlayers]);

    const spin = rotation.interpolate({
        inputRange: [-90, 90],
        outputRange: ["-90deg", "90deg"]
    });


    const carouselWidth = getCarouselWidth(state, isRotated);
    const carouselHeight = getCarouselHeight(state, isRotated);

    return (
        <View style={[styles.playerContainer, {backgroundColor: player.theme}]}>
            <Animated.View style={[
                {
                    transform: [{
                        rotate: spin,
                    }],
                    height: carouselHeight,
                    width: carouselWidth
                }
            ]}>
                <>
                    <Stats isRotated={isRotated} playerId={player.id}/>
                    <Damage
                        player={player}
                        isRotated={isRotated}
                        addDmg={() => dispatch({type: actions.ADD_DAMAGE, data: player})}
                        subtractDmg={() => dispatch({type: actions.SUBTRACT_DAMAGE, data: player})}
                        hitPoints={player.life}
                        showRecentDmg={true}
                    />
                </>
                {/*   <Carousel
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
                            <>
                                <Stats isRotated={isRotated} playerId={player.id}/>
                                <Damage
                                    player={player}
                                    isRotated={isRotated}
                                    addDmg={addDmg}
                                    subtractDmg={subtractDmg}
                                    hitPoints={hitPoints}
                                    showRecentDmg={showRecentDmg}
                                />
                            </>
                        ) : (
                            <CommanderDamage player={player} isRotated={isRotated}/>
                        )
                    }}
                    sliderWidth={carouselWidth}
                    itemWidth={carouselWidth}
                />*/}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

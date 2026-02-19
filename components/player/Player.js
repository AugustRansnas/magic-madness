import React, {useEffect, useRef} from "react";
import {Animated, Easing, ImageBackground, StyleSheet, View} from "react-native";
import {useStore} from "../../store/store";
import * as core from "../../store/core";
import Stats from "./Stats";
import Damage from "./Damage";
import actions from "../../store/actions";
import PlayerModal from "./modal/PlayerModal";
import bg from "../../assets/splash-test.png";

const rotations = {
    2: {1: 180, 2: 0},
    3: {1: 90, 2: -90, 3: 0},
    4: {1: 90, 2: -90, 3: 90, 4: -90},
    5: {1: 90, 2: -90, 3: 90, 4: -90, 5: 0},
    6: {1: 180, 2: 90, 3: -90, 4: 90, 5: -90, 6: 0}
};


function calculateRotation(numberOfPlayers, id) {
    return rotations[numberOfPlayers][id];
}

function isPlayerRotated(numberOfPlayers, id) {
    const rotation = calculateRotation(numberOfPlayers, id);
    return rotation === 90 || rotation === -90;
}

function getRowHeightFraction(numberOfPlayers) {
    switch (numberOfPlayers) {
        case 2: case 3: case 4: return 1 / 2;
        case 5: return 1 / 3;
        case 6: return 1 / 4;
        default: return 1 / 2;
    }
}

function getPlayerWidth(state, isRotated, numberOfPlayers) {
    const {windowWidth, windowHeight} = core.getWindow();
    if (isRotated) {
        const fraction = getRowHeightFraction(numberOfPlayers);
        const rowHeight = windowHeight * fraction;
        if (state.menuOpen) {
            return rowHeight * 0.90;
        }
        return rowHeight;
    }
    return windowWidth;
}

function getPlayerHeight(state, isRotated, numberOfPlayers) {
    const {windowWidth, windowHeight} = core.getWindow();
    if (isRotated) {
        return (windowWidth / 2);
    }
    const fraction = getRowHeightFraction(numberOfPlayers);
    const rowHeight = windowHeight * fraction;
    if (state.menuOpen) {
        return rowHeight * 0.9;
    }
    return rowHeight;
}

export default function Player({player}) {
    const {state, dispatch} = useStore();
    const rotation = useRef(new Animated.Value(0)).current;
    const numberOfPlayers = core.getNumberOfPlayers(state);
    const isRotated = isPlayerRotated(numberOfPlayers, player.id);
    const calculatedRotation = calculateRotation(numberOfPlayers, player.id);

    useEffect(() => {
        Animated.timing(rotation, {
            toValue: calculatedRotation, duration: 750, easing: Easing.bounce, useNativeDriver: true
        }).start();
    }, [numberOfPlayers, calculatedRotation]);

    const spin = rotation.interpolate({
        inputRange: [-180, -90, 0, 90, 180],
        outputRange: ["-180deg", "-90deg", "0deg", "90deg", "180deg"]
    });


    const playerWidth = getPlayerWidth(state, isRotated, numberOfPlayers);
    const playerHeight = getPlayerHeight(state, isRotated, numberOfPlayers);

    return (<View style={[styles.playerContainer, /*{backgroundColor: player.theme}*/]}>
        <Animated.View style={[{
            transform: [{
                rotate: spin,
            }], height: playerHeight, width: playerWidth
        }]}>
            <>
                <Stats isRotated={isRotated} playerId={player.id}/>
                <Damage
                    player={player}
                    isRotated={isRotated}
                    addDmg={(dmgValue) => dispatch({type: actions.ADD_DAMAGE, data: {player, dmgValue}})}
                    subtractDmg={(dmgValue) => dispatch({type: actions.SUBTRACT_DAMAGE, data: {player, dmgValue }})}
                    hitPoints={player.life}
                    showRecentDmg={true}
                />
                <PlayerModal
                    player={player}
                    playerHeight={playerHeight}
                    playerWidth={playerWidth}
                    rotation={calculatedRotation}/>
            </>
        </Animated.View>
    </View>);
}


const styles = StyleSheet.create({
    playerContainer: {
        flex: 1, justifyContent: "center", alignItems: "center"
    }
});

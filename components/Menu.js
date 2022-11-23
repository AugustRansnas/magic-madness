import React, {useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet, TouchableOpacity} from "react-native";
import {useStore} from "../store/store";
import actions from "../store/actions";
import SelectNumberOfPlayersSvg from "../assets/number-of-players.svg";
import ResetSvg from "../assets/reset.svg";
import DiceSvg from "../assets/dice.svg";
import PipeSvg from "../assets/pipe.svg";
import PipeNoSmokeSvg from "../assets/pipe-no-smoke.svg";
import SelectNumberOfPlayers from "./SelectNumberOfPlayers";
import MainMenuButton from "./MainMenuButton";
import * as core from "../store/core";

const menuItems = {
    NUMBER_OF_PLAYERS: "NUMBER_OF_PLAYERS"
};

export default function Menu() {
    const {state, dispatch} = useStore();
    const pipeSmokeEnabled = core.isBackgroundAnimationEnabled(state);
    const isMenuOpen = state.menuOpen;
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            height,
            {
                toValue: isMenuOpen ? 10 : 0,
                duration: 350,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start();
    }, [isMenuOpen]);


    const animateHeight = height.interpolate({
        inputRange: [0, 10],
        outputRange: ["0%", "10%"]
    });

    const svgWidth = 50;
    const svgHeight = isMenuOpen ? 35 : 0;

    function getMenuItems() {
        const selectedMenuItem = state.selectedMenuItem;
        switch (selectedMenuItem) {
            case menuItems.NUMBER_OF_PLAYERS:
                return <SelectNumberOfPlayers/>;
            default:
                return (
                    <>
                        <TouchableOpacity
                            title=""
                            style={[styles.menuItem]}
                            onPress={() => dispatch({type: actions.SET_MENU_ITEM, data: menuItems.NUMBER_OF_PLAYERS})}
                        >
                            <SelectNumberOfPlayersSvg width={svgWidth} height={svgHeight}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            title=""
                            style={[styles.menuItem]}
                            onPress={() => {
                                dispatch({type: actions.RESET_LIFE});
                                dispatch({type: actions.SET_MENU_OPEN, data: false})
                            }}
                        >
                            <ResetSvg width={svgWidth} height={svgHeight}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            title=""
                            style={[styles.menuItem]}
                            onPress={() => console.log("roll the dice!")}
                        >
                            <DiceSvg width={svgWidth} height={svgHeight}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            title=""
                            style={[styles.menuItem]}
                            onPress={() => dispatch({type: actions.TOGGLE_BACKGROUND_ANIMATION})}
                        >
                            {pipeSmokeEnabled ?
                                <PipeSvg width={svgWidth} height={svgHeight ? svgHeight + 15 : 0}/> :
                                <PipeNoSmokeSvg width={svgWidth} height={svgHeight ? svgHeight + 15 : 0}/>}
                        </TouchableOpacity>
                    </>
                );
        }
    }

    return (
        <>
            <MainMenuButton/>
            <Animated.View style={[styles.menu, {height: animateHeight}]}>
                {getMenuItems()}
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white"
    },
    menuItem: {
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});
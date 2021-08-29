import {Animated, Dimensions, Easing, TouchableOpacity, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import React, {useEffect, useMemo, useRef} from "react";
import {useStore} from "../store/store";

export default function MainMenuButton() {
    const {state, dispatch} = useStore();
    const isMenuOpen = state.isMenuOpen;
    const menuButtonHeight = 40;
    const menuButtonWidth = 40;

    const calculatedPositions = useMemo(() => {
        const windowHeight = Dimensions.get('window').height;
        const windowWidth = Dimensions.get('window').width;
        const center = (windowHeight / 2) - (menuButtonHeight / 2);
        const offset = (windowHeight / 20)
        return {
            left: (windowWidth / 2) - (menuButtonWidth / 2),
            top: isMenuOpen ? center - offset : center
        }
    }, [isMenuOpen])

    const topPositionAnimation = useRef(new Animated.Value(calculatedPositions.top)).current;

    useEffect(() => {
        Animated.timing(
            topPositionAnimation,
            {
                toValue: calculatedPositions.top,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
    }, [calculatedPositions])

    return (
        <Animated.View style={{
            position: 'absolute',
            transform: [{
                translateX: calculatedPositions.left
            }, {
                translateY: topPositionAnimation
            }],
            zIndex: '1000'
        }}>
            <TouchableOpacity
                onPress={() => dispatch({type: 'TOGGLE_MENU'})}>
                <Svg height={menuButtonHeight} width={menuButtonWidth} viewBox="0 0 100 100">
                    <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="green"/>
                </Svg>
            </TouchableOpacity>

        </Animated.View>
    )
}
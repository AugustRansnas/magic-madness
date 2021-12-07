import { Animated, Easing, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import actions from '../store/actions';
import { useStore } from "../store/store";
import * as core from "../store/core";
import MenuButtonOpenSvg from "./svg-react/MenuButtonOpenSvg";
import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Stop, SvgCss, SvgXml } from "react-native-svg";

export default function MainMenuButton({ setIsMenuOpen, isMenuOpen }) {
    const { windowWidth, windowHeight } = core.getWindow();
    const { dispatch } = useStore();
    const [showMagicBalls, setShowMagicBalls] = useState(false);

    const menuButtonHeight = 60;
    const menuButtonWidth = 60;

    const calculatedPositions = useMemo(() => {
        const center = (windowHeight / 2) - (menuButtonHeight / 2);
        const offset = (windowHeight / 20)
        return {
            left: (windowWidth / 2) - (menuButtonWidth / 2),
            top: isMenuOpen ? center - offset : center
        }
    }, [isMenuOpen])

    const topPositionAnimation = useRef(new Animated.Value(calculatedPositions.top)).current;
    const rotation = useRef(new Animated.Value(-180)).current;

    useEffect(() => {
        setShowMagicBalls(true);
        rotation.setValue(-180);
        Animated.parallel([
            Animated.timing(
                topPositionAnimation,
                {
                    toValue: calculatedPositions.top,
                    duration: 350,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                rotation,
                {
                    toValue: -360,
                    duration: 350,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start(() => !isMenuOpen && setShowMagicBalls(false));

    }, [calculatedPositions])

    const spin = rotation.interpolate({
        inputRange: [-360, 360],
        outputRange: ['0deg', '360deg']
    });


    return (
        <Animated.View style={{
            position: 'absolute',
            transform: [{
                translateX: calculatedPositions.left
            }, {
                translateY: topPositionAnimation
            }, {
                rotate: spin
            }],
            zIndex: 1000
        }}>
            <TouchableOpacity
                onPress={() => {
                    setIsMenuOpen(!isMenuOpen);
                    dispatch({ type: actions.SET_MENU_ITEM, data: null });
                }}>
                {showMagicBalls ?
                    <MenuButtonOpenSvg height={menuButtonHeight} width={menuButtonWidth} />
                    : <Svg height={menuButtonHeight} width={menuButtonWidth} viewBox="0 0 100 100">
                        <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="green" />
                    </Svg>}

            </TouchableOpacity>
        </Animated.View>
    )
}
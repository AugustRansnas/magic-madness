import {Animated, Easing, Image, TouchableOpacity} from "react-native";
import React, {useEffect, useMemo, useRef, useState} from "react";
import actions from "../../store/actions";
import {useStore} from "../../store/store";
import * as core from "../../store/core";
import MenuButtonOpenSvg from "../svg-react/MenuButtonOpenSvg";
import MenuButtonClosedSvg from "../svg-react/MenuButtonClosedSvg";

export default function MainMenuButton() {
    const {windowWidth, windowHeight} = core.getWindow();
    const {state, dispatch} = useStore();
    const isMenuOpen = state.menuOpen;
    const [showMagicBalls, setShowMagicBalls] = useState(false);

    const menuButtonHeight = 90;
    const menuButtonWidth = 90;

    const calculatedPositions = useMemo(() => {
        const center = (windowHeight / 2) - (menuButtonHeight / 2);
        const offset = (windowHeight / 15);
        return {
            left: (windowWidth / 2) - (menuButtonWidth / 2),
            top: isMenuOpen ? center - offset : center
        };
    }, [isMenuOpen]);

    const topPositionAnimation = useRef(new Animated.Value(calculatedPositions.top)).current;
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setShowMagicBalls(true);
        rotation.setValue(isMenuOpen ? 0 : 360);
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
                    toValue: isMenuOpen ? 360 : 0,
                    duration: 650,
                    easing: Easing.elastic(0.5),
                    useNativeDriver: true
                }
            )
        ]).start(() => !isMenuOpen && setShowMagicBalls(false));

    }, [calculatedPositions]);

    const spin = rotation.interpolate({
        inputRange: [-360, 360],
        outputRange: ["0deg", "360deg"]
    });


    return (
        <Animated.View style={{
            position: "absolute",
            transform: [{
                translateX: calculatedPositions.left
            }, {
                translateY: topPositionAnimation
            }, {
                rotate: spin
            }],
            zIndex: 1000
        }}>
            <TouchableOpacity  onPress={() => {
                dispatch({type: actions.SET_MENU_OPEN, data: !state.menuOpen})
                dispatch({type: actions.SET_MENU_ITEM, data: null});
            }}>
                <Image source={require('../../assets/test-menu-button-3.png')} style={{ width: menuButtonWidth, height: menuButtonHeight }} />
            </TouchableOpacity>
{/*
            <TouchableOpacity
                onPress={() => {
                    dispatch({type: actions.SET_MENU_OPEN, data: !state.menuOpen})
                    dispatch({type: actions.SET_MENU_ITEM, data: null});
                }}>
                {showMagicBalls ?
                    <MenuButtonOpenSvg height={menuButtonHeight} width={menuButtonWidth}/>
                    : <MenuButtonClosedSvg height={menuButtonHeight} width={menuButtonWidth}/>}
            </TouchableOpacity>
*/}
        </Animated.View>
    );
}
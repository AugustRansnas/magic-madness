import {Dimensions, TouchableOpacity} from "react-native";
import Svg, {Circle} from "react-native-svg";
import React, {useMemo} from "react";
import {useStore} from "../store/store";

export default function MainMenuButton({isOpen, setIsOpen}) {
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

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                left: calculatedPositions.left,
                top: calculatedPositions.top,
                zIndex: '1000'
            }}
            onPress={() => dispatch({type: 'TOGGLE_MENU'})}>
            <Svg height={menuButtonHeight} width={menuButtonWidth} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="green"/>
            </Svg>
        </TouchableOpacity>
    )
}
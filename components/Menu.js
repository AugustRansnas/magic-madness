import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, TouchableOpacity, View} from 'react-native';
import SelectNumberOfPlayersSvg from "../assets/number-of-players-button.svg";
import {useStore} from "../store/store";
import SelectNumberOfPlayers from "./SelectNumberOfPlayers";

export default function Menu() {
    const {state, dispatch} = useStore();
    const isMenuOpen = state.isMenuOpen;
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
    }, [isMenuOpen])


    const animateHeight = height.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '10%']
    })

    const svgHeight = isMenuOpen ? 30 : 0;

    function getMenuItems() {
        const selectedMenuItem = state.selectedMenuItem;
        switch (selectedMenuItem) {
            case 'selectNumberOfPlayers':
                return <SelectNumberOfPlayers/>;
            default:
                return (
                    <>
                        <TouchableOpacity
                            title=""
                            style={[styles.menuItem, {height: svgHeight}]}
                            onPress={() => dispatch({type: 'SET_MENU_ITEM', data: 'selectNumberOfPlayers'})}
                        >
                            <SelectNumberOfPlayersSvg width={50} height={svgHeight}/>
                        </TouchableOpacity>
                        <View width={50}/>
                        <View width={50}/>
                        <View width={50}/>
                    </>
                );
        }
    }

    return (
        <Animated.View style={[styles.menu, {height: animateHeight}]}>
            {getMenuItems()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        //backgroundColor: 'rebeccapurple',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    menuItem: {
        paddingHorizontal: 40
    }
})
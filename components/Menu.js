import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, TouchableOpacity, View} from 'react-native';
import SelectNumberOfPlayersSvg from "../assets/number-of-players-button.svg";
import {useStore} from "../store/store";

export default function Menu() {
    const {state, dispatch} = useStore();
    const isMenuOpen = state.isMenuOpen;
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            height,
            {
                toValue: isMenuOpen ? 10 : 0,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start();
    }, [isMenuOpen])


    const animateHeight = height.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '10%']
    })

    const menuItemStyle = [styles.menuItem];

    return (
        <Animated.View style={[styles.menu, {height: animateHeight}]}>
            {isMenuOpen ?
                <View style={styles.menu}>
                    <TouchableOpacity
                        title=""
                        style={menuItemStyle}
                        onPress={() => dispatch({type: 'SET_MENU_ITEM', data: 'selectNumberOfPlayers'})}
                    >
                        <SelectNumberOfPlayersSvg width={50} height={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        title=""
                        style={menuItemStyle}
                        onPress={() => dispatch({type: 'SET_MENU_ITEM', data: 'selectNumberOfPlayers'})}
                    >
                        <SelectNumberOfPlayersSvg width={50} height={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        title=""
                        style={menuItemStyle}
                        onPress={() => dispatch({type: 'SET_MENU_ITEM', data: 'selectNumberOfPlayers'})}
                    >
                        <SelectNumberOfPlayersSvg width={50} height={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        title=""
                        style={menuItemStyle}
                        onPress={() => dispatch({type: 'SET_MENU_ITEM', data: 'selectNumberOfPlayers'})}
                    >
                        <SelectNumberOfPlayersSvg width={50} height={30}/>
                    </TouchableOpacity>
                </View>
            : null}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        //height: '100%',
        backgroundColor: 'rebeccapurple',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    menuItem: {
        overflow: 'hidden',
        paddingVertical: 20,
        paddingHorizontal: 40
    }
})
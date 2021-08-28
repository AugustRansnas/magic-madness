import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../store/store';
import SelectNumberOfPlayersSvg from "../assets/number-of-players-button.svg";


export default function Menu({setMenuItem}) {
    const {state, dispatch} = useStore();

    return (
        <View style={styles.menu}>
            <TouchableOpacity
                title=""
                style={styles.menuItem}
                onPress={() => setMenuItem('numberOfPlayers')}
            >
                <SelectNumberOfPlayersSvg width={50} height={30}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        height: '10%',
        backgroundColor: 'rebeccapurple',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    menuItem: {
        paddingVertical: 20,
        paddingHorizontal: 40
    }
})